import React, { useState, useEffect } from 'react';
import '../styles/me.css';
import { UserStudySets } from "../components/UserStudySets.js";
import { db, auth } from "../firebase-config";
import {
    collection,
    addDoc,
    getDocs,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc,
    limit
  } from "firebase/firestore";

function Me() {
  const [displayName, setDisplayName] = useState('Unknown User');
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        const photoURL = user.photoURL; // Get the user's profile picture URL
        if (name) {
          setDisplayName(name);
        }
        if (photoURL) {
          setPhotoURL(photoURL);
          console.log("Photo URL:", photoURL);
        }
      } else {
        setDisplayName('Unknown User');
        setPhotoURL(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [myStudyLists, setMyStudyLists] = useState(null);
  const [myTrendingStudyLists, setMyTrendingStudyLists] = useState(null);

  useEffect(() => {
    const fetchStudyGuides = async () => {
      try {
          const q = query(
            collection(db, 'studylists'),
            limit(10)
          );

          const querySnapshot = await getDocs(q);

          // const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user, userId, termCount, timesStudied } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      userid: userId,
                      user: user,
                      title: title,
                      termCount: termCount,
                      timesStudied: timesStudied
                  };

                  // for testing purposes.
                  console.log("guide id: " + studyGuide["userid"]);
                  // console.log("user id: " + auth.currentUser.uid);
                  console.log("user id: " + auth.currentUser.uid + "\n");
                  console.log("term count: " + studyGuide["termCount"] + "\n");
                  
                  // only adds studylist if user made it.
                  if(studyGuide["userid"] == auth.currentUser.uid)
                    studyGuidesArray.push(studyGuide);

                  setMyStudyLists(studyGuidesArray);
              } else {
                  console.log("Document does not exist:", doc.id);
              }
          });

          console.log("Study Guides Array:", studyGuidesArray);
          return studyGuidesArray;
      } catch (error) {
          console.error("Error fetching study guides:", error);
          // Handle error fetching study guides
          return [];
      }
    };

    fetchStudyGuides();

  }, []);

  useEffect(() => {
    const fetchTrendingStudyGuides = async () => {
      try {
          const q = query(
            collection(db, 'studylists'),
            orderBy('timesStudied', 'desc'),
            limit(10)
          );

          const querySnapshot = await getDocs(q);

          // const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user, userId, termCount, timesStudied } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      userid: userId,
                      user: user,
                      title: title,
                      termCount: termCount,
                      timesStudied: timesStudied
                  };

                  // for testing purposes.
                  console.log("guide id: " + studyGuide["userid"]);
                  // console.log("user id: " + auth.currentUser.uid);
                  console.log("user id: " + auth.currentUser.uid + "\n");
                  console.log("term count: " + studyGuide["termCount"] + "\n");
                  
                  // only adds studylist if user made it.
                  if(studyGuide["userid"] == auth.currentUser.uid)
                    studyGuidesArray.push(studyGuide);

                  setMyTrendingStudyLists(studyGuidesArray);
              } else {
                  console.log("Document does not exist:", doc.id);
              }
          });

          console.log("Study Guides Array:", studyGuidesArray);
          return studyGuidesArray;
      } catch (error) {
          console.error("Error fetching study guides:", error);
          // Handle error fetching study guides
          return [];
      }
    };

    fetchTrendingStudyGuides();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='pageContainer'>
        <div className='user-container'>
          {photoURL && <img className='profileImage' src={photoURL} alt="Profile" />}
          <h1 className='username'>{displayName}</h1>
        </div>

        <div className='list-container'>
          <h2 className='list-container-title'>Your Study Lists</h2>
          <div className='list-item-container'>
            {myStudyLists ? (
              myStudyLists.map((guide) => (
                <a className='box-a' href={`/list/${guide.id}`} key={guide.id}>
                  <div className='exampleBox'>
                    <p className='exampleBoxText'>{guide.title}</p>
                    <p className='exampleBoxText'>{guide.termCount} terms</p>
                    <p className='exampleBoxText'>Times Studied: {guide.timesStudied}</p>
                  </div> 
                </a>
              ))
            ) : (
              <div className='exampleBox'>Study list loading... 😔</div>
            )}
          </div>
      </div>

      <div className='list-container' id="watewfwef">
          <h2 className='list-container-title'>Your Trending Study Lists</h2>
          <div className='list-item-container'>
            {myTrendingStudyLists ? (
              myTrendingStudyLists.map((guide) => (
                <a className='box-a' href={`/list/${guide.id}`} key={guide.id}>
                  <div className='exampleBox'>
                    <p className='exampleBoxText'>{guide.title}</p>
                    <p className='exampleBoxText'>{guide.termCount} terms</p>
                    <p className='exampleBoxText'>Times Studied: {guide.timesStudied}</p>
                  </div> 
                </a>
              ))
            ) : (
              <div className='exampleBox'>
                <p className='exampleBoxText'>Study list loading... 😔</p>
              </div>
            )}
          </div>
      </div>


    </div>
  );
}

export default Me;
