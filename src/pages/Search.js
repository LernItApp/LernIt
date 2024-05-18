import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { query, orderBy, limit, where } from "firebase/firestore";  
import { collection, doc, setDoc } from "firebase/firestore"; 
import { db, auth } from "../firebase-config";
import { getDocs } from "firebase/firestore";

function Search() {
  const { id } = useParams();
  const [studyLists, setStudyLists] = useState(null);


  useEffect(() => {
    const searchBar = document.querySelector('.searchBar');
    if (searchBar) {
      searchBar.value = id;
    }

    const fetchData = async () => {
      try {
        const studylists = collection(db, "studylists");

        const studyGuidesArray = [];

        const q = query(studylists, where("title", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          const { title, user, userId } = doc.data();
          const studyGuide = {
            id: doc.id,
            userid: userId,
            user: user,
            title: title
        };
        studyGuidesArray.push(studyGuide);
        });
        setStudyLists(studyGuidesArray);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    
    fetchData();
    
  }, [id]);

  return (
    <div>
    {/* <h1>Search</h1>
      <h2>You searched for: {id}</h2> */}
      {/* search for study sets and then put them here as a list */}
      <h1>Study Lists</h1>
      <ul>
        { studyLists ? (
          studyLists.map((guide) => (
          
          <li key={guide.id}> <a href={`/list/${guide.id}`}> {guide.title} : {guide.user} </a> </li> 
          
          ))
        ) : ( <p>Loading...</p> )}
      </ul>
    </div>
  )
}

export default Search