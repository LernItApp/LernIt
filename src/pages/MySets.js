import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import styles from '../styles/MySets.module.css'; // Import CSS module

function MySets() {
  const [studyLists, setStudyLists] = useState(null);

  useEffect(() => {
    const fetchStudyGuides = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user, userId } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      userid: userId,
                      user: user,
                      title: title
                  };

                  // for testing purposes.
                  console.log("guide id: " + studyGuide["userid"]);
                  console.log("user id: " + auth.currentUser.uid);
                  console.log("user id: " + auth.currentUser.uid + "\n");
                  
                  // only adds studylist if user made it.
                  if(studyGuide["userid"] == auth.currentUser.uid)
                    studyGuidesArray.push(studyGuide);

                  setStudyLists(studyGuidesArray);
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


  return (
    <div className={styles.container1}>
      <h1 className={styles.studyliststitle}>Study Lists</h1>
      <div className={styles.container}>
        { studyLists ? (
          studyLists.map((guide) => (
          <a className={styles.atagsinmysets} href={`/list/${guide.id}`}>
            <div className={styles.boxthingies} key={guide.id}> {guide.title} </div> 
          </a>
          
          ))
        ) : ( <p>Loading...</p> )}
      </div>
    </div>
  )
}

export default MySets;
