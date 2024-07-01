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
    getDocs,
    deleteDoc
} from "firebase/firestore";
import styles from '../styles/SetViewer.module.css';
import closeButton from './x-button.png';
import backButton from './back-button.png';
import forwardButton from './forward-button.png';

function SetViewer() {
    const { id } = useParams();
    const [studyList, setStudyList] = useState(null);
    const [isMySet, setIsMySet] = useState(false);
    const [flashcardsOpen, setFlashcardsOpen] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

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
                        
                        // Check if the current user is the owner of the set
                        setIsMySet(auth.currentUser && data.userId === auth.currentUser.uid);
                        
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
    }, [id]);

    const addRecentStudy = async (uid, recentStudy) => {
        const recentStudyRef = collection(db, 'users', uid, 'recentstudy');

        try {
            await addDoc(recentStudyRef, recentStudy);

            const recentStudyQuery = query(recentStudyRef, orderBy('timestamp', 'desc'));
            const querySnapshot = await getDocs(recentStudyQuery);
            const documents = querySnapshot.docs;

            if (documents.length > 20) {
                const oldestDoc = documents[documents.length - 1];
                await deleteDoc(oldestDoc.ref);
            }
        } catch (error) {
            console.error("Error adding recent study document:", error);
        }
    };

    const handleFlashCardsClick = () => {
        setFlashcardsOpen(true);
        setCurrentCardIndex(0);
        setFlipped(false);
    };

    const handleCloseButton = () => {
        setFlashcardsOpen(false);
    };

    const handleFlashCardBackButton = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : studyList.items.length - 1));
        setFlipped(false);
    };

    const handleFlashCardForwardButton = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex < studyList.items.length - 1 ? prevIndex + 1 : 0));
        setFlipped(false);
    };
    
    const handleFlashCardClick = () => {
        setFlipped(!flipped);
    };

    return (
        <>
            {studyList ? (
                <div className={styles.containercontainer}>
                    <div className={styles.studylistcontainer}>
                        <div className={styles.sidebuttons}>

                            <div className={styles.otherbuttons}>
                                <button onClick={handleFlashCardsClick} className={`${styles.otherbutton} ${styles.buttonstyle}`}>Flashcards</button>
                                <button className={`${styles.otherbutton} ${styles.buttonstyle}`}>Multiple Choice</button>
                            </div>

                            {isMySet ? (
                            <div className={styles.editdeletebuttons}>
                                <button className={`${styles.editdeletebutton} ${styles.buttonstyle}`}>Edit</button>
                            </div>
                        ) : null}
                        </div>
                    </div>
                    <div className={styles.studylistcontainer}>
                        <div className={styles.containerhalves}>
                            <h1>{studyList.title}</h1>
                            <h2>By: {studyList.user}</h2>
                        </div>
                        <div className={styles.containerhalves} id='half2'>
                            {studyList.items.map((item, index) => (
                                <div className={styles.listitempair} key={index}>
                                    <div className={styles.listitem}>{item.text1}</div>
                                    <div className={`${styles.listitem} ${styles.listitem2}`}>{item.text2}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {flashcardsOpen && (
                        <div className={styles.flashcardscontainer}>
                            <button onClick={handleCloseButton} className={styles.closeButton}>
                                <img className={styles.closeButtonImg} src={closeButton} alt="Close button" />
                            </button>
                            <div className={`${styles.flashcard} ${flipped ? styles.flip : ''}`} onClick={handleFlashCardClick}>
                                <div className={`${styles.flashcardtext} ${flipped ? styles.back : styles.front}`}>
                                    {flipped ? studyList.items[currentCardIndex].text2 : studyList.items[currentCardIndex].text1}
                                </div>
                            </div>
                            <p className={styles.flashcardcounter}>{currentCardIndex + 1}/{studyList.items.length}</p>
                            <div>
                                <button onClick={handleFlashCardBackButton} className={styles.backButton}>
                                    <img className={styles.closeButtonImg} src={backButton} alt="Back Flashcard button" />
                                </button>
                                <button onClick={handleFlashCardForwardButton} className={styles.backButton}>
                                    <img className={styles.closeButtonImg} src={forwardButton} alt="Forward Flashcard button" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default SetViewer;
