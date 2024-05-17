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
    });

    return () => unsubscribe();
  }, []);
  
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
        <h1>efw</h1>
      )}
    </div>
  );
}

export default FrontPage;
