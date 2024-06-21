import React, { useState, useEffect } from 'react';
import '../styles/FrontPage.css'
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
    getDoc
} from "firebase/firestore";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function FrontPage() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [displayName, setDisplayName] = useState('Unknown User');
  const [myStudyLists, setMyStudyLists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyGuides = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user, userId, termCount } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      userid: userId,
                      user: user,
                      title: title,
                      termCount: termCount
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        if (name) {
          setDisplayName(name);
        }
      } else {
        setDisplayName('Unknown User');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading && isAuth) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      {!isAuth && (
        <div className='container'>
          <div className='top-container'>
            <h1 className='top-text'>Tired of long late nights studying for tests?</h1>
            <p>LernIt is an open source learning platform that is committed to making education more accessible than ever before! Our mission is to empower learners of all ages and backgrounds by offering a wide range of customizable solutions and cutting-edge features tailored to enhance the learning experience. </p>
            <a href="/signin"><button className='btn-signup'>Sign Up Now</button></a>
          </div>
        </div>
      )}
      {isAuth && (
        <>
        <h1 className='welcomebacktext'>Welcome back, {displayName}</h1>
        <div>

          {/* <div className='list-container'>
            <h2 className='list-container-title'>Recent Study Lists</h2>
            <div className='list-item-container'></div>
          </div> */}

          <div className='list-container'>
            <h2 className='list-container-title'>Trending Study Lists</h2>
            <div className='list-item-container'></div>
          </div>

          <div className='list-container'>
            <h2 className='list-container-title'>Your Study Lists</h2>
            <div className='list-item-container'>

              { myStudyLists ? (
              myStudyLists.map((guide) => (

                <a className='box-a' href={`/list/${guide.id}`}>
                <div className='exampleBox' key={guide.id}>
                  <p className='exampleBoxText'>{guide.title}</p>
                  <p className='exampleBoxText'>{guide.termCount}</p>
                </div> 
                </a>

              ))
              ) : ( <div className='exampleBox'>study list loading... 😔</div> )}

            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}

export default FrontPage;
