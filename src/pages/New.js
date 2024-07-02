import React, { useState } from 'react';
import { db, auth } from "../firebase-config";
import '../styles/New.css';
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function New() {

  let navigate = useNavigate(); 

  const [items, setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  
  const [title, setTitle] = useState('');

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const addItemToList = () => {
    if (input1 && input2) {
      setItems([...items, { text1: input1, text2: input2 }]);
      setInput1('');
      setInput2('');
    }
  };

  const handleSave = async () => {
    if (!title) {
      alert("Please enter a title for your study list.");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one flashcard pair.");
      return;
    }

    console.log("List saved:", items);

    const dataToSave = items.map(item => ({
      text1: item.text1,
      text2: item.text2,
    }));

    try {
      const docRef = await addDoc(collection(db, "studylists"), {
        items: dataToSave,
        user: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        isPublic: true,
        title: title,
        termCount: items.length,
        rating: 0.0,
        timesStudied: 0,
        createdAt: serverTimestamp()
      });
  
      console.log("List successfully saved to Firestore.");
      
      let path = `/list/${docRef.id}`; 
      navigate(path);

    } catch (error) {
      console.error("Error saving list to Firestore:", error);
    }
  };

  React.useEffect(() => {
    console.log("Updated List:", JSON.stringify(items));
  }, [items]);

  return (
    <div className='container1'>
      <h2 className='newstudylisttitle'>Create a New Study List</h2>
      <button className='button' onClick={handleSave}>Save</button>
      <input
        type="text"
        value={title}
        className='new-input'
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter studyset title"
      />
      <div className='list'>
        {items.map((item, index) => (
          <div className='test' key={index}>
            <div className='items'>
              <div className='listItem listItem1'>{item.text1}</div>
              <div className='listItem listItem2'>{item.text2}</div>
            </div>
            <button className='deleteButton' onClick={() => deleteItem(index)}>Delete</button>
          </div>
        ))}
      </div>
      <div className='inputsDiv'>
        <div>
          <input
            type="text"
            value={input1}
            className='new-input'
            onChange={(e) => setInput1(e.target.value)}
            placeholder="Enter Text 1"
          />
          <input
            type="text"
            value={input2}
            className='new-input'
            onChange={(e) => setInput2(e.target.value)}
            placeholder="Enter Text 2"
          />
        </div>
        <button className='button' onClick={addItemToList}>Add to List</button>
      </div>
    </div>
  );
}

export default New;
