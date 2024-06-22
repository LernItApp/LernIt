import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from "../firebase-config";
import {
    doc,
    getDoc,
    updateDoc,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    getDocs,
    deleteDoc
} from "firebase/firestore";
import '../styles/SetViewer.css';

function SetViewer() {
    const { id } = useParams();
    const [studyList, setStudyList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'studylists', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data && data.items) {
                        console.log("TimesStudied before update:", data.timesStudied);

                        // Increment the timesStudied field by 1
                        await updateDoc(docRef, {
                            timesStudied: data.timesStudied + 1
                        });

                        const updatedDocSnap = await getDoc(docRef);
                        const updatedData = updatedDocSnap.data();
                        console.log("TimesStudied after update:", updatedData.timesStudied);

                        setStudyList(updatedData);

                        // Handle recently studied collection
                        if (auth.currentUser) {
                            await addRecentStudy(auth.currentUser.uid, {
                                studySetId: id,
                                name: data.title,
                                timestamp: new Date()
                            });
                        }
                    } else {
                        console.log("Document data is invalid.");
                    }

                    console.log("Document data:", docSnap.data().items[0].text1);
                } else {
                    console.log("No such document!");
                    // Handle the case where the document doesn't exist
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                // Handle error fetching document
            }
        };

        fetchData();
    }, [id]); // Run effect whenever id changes

    const addRecentStudy = async (uid, recentStudy) => {
        const recentStudyRef = collection(db, 'users', uid, 'recentstudy');

        try {
            // Add new document to the recentstudy collection
            await addDoc(recentStudyRef, recentStudy);

            // Check the total number of documents
            const recentStudyQuery = query(recentStudyRef, orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(recentStudyQuery);
            const documents = querySnapshot.docs;

            // If there are more than 20 documents, delete the oldest ones
            if (documents.length > 20) {
                const oldestDoc = documents[documents.length - 1];
                await deleteDoc(oldestDoc.ref);
            }
        } catch (error) {
            console.error("Error adding recent study document:", error);
        }
    };

    return (
        <>
            {studyList ? (
                <div className='studylist-container'>
                    <div className='container-halves'>
                        <h1>{studyList.title}</h1>
                        <h2>By: {studyList.user}</h2>
                    </div>
                    <div className='container-halves' id='half2'>
                        {studyList.items.map((item, index) => (
                            <div className='list-item-pair' key={index}>
                                <div className='list-item'>{item.text1}</div>
                                <div className='list-item list-item2'>{item.text2}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default SetViewer;
