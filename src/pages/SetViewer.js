import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from "../firebase-config";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc
  } from "firebase/firestore";

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
                    setStudyList(data);
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
                            <div className='list-item'>{item.text2}</div>
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

export default SetViewer