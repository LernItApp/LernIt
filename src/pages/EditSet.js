import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import styles from '../styles/EditSet.module.css';

function EditSet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [studyList, setStudyList] = useState(null);
    const [isMySet, setIsMySet] = useState(false);
    const [items, setItems] = useState([{ text1: '', text2: '' }]);
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'studylists', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setStudyList(data);

                    if (auth.currentUser && data.userId === auth.currentUser.uid) {
                        setIsMySet(true);
                        setItems(data.items.length ? data.items : [{ text1: '', text2: '' }]);
                        setTitle(data.title);
                    } else {
                        navigate(`/list/${id}`);
                    }
                } else {
                    console.log("No such document!");
                    navigate(`/list/${id}`);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                navigate(`/list/${id}`);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleAddItem = () => {
        setItems([...items, { text1: '', text2: '' }]);
    };

    const handleRemoveItem = (index) => {
        if (items.length > 1) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        } else {
            setError("You must have at least one term pair.");
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setError("Title cannot be empty.");
            return;
        }

        for (let item of items) {
            if (!item.text1.trim() || !item.text2.trim()) {
                setError("All terms and definitions must be filled out.");
                return;
            }
        }

        try {
            const docRef = doc(db, 'studylists', id);
            await updateDoc(docRef, { title, items, termCount: items.length });
            navigate(`/list/${id}`);
        } catch (error) {
            console.error("Error updating document:", error);
            setError("Error updating document. Please try again.");
        }
    };

    if (!isMySet) {
        return <p>Loading...</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Edit Study Set</h1>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.form}>
                <div className={styles.titlediv}>
                    <label className={styles.title}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Set Title"
                        className={styles.titleInput}
                    />
                </div>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <input
                            type="text"
                            value={item.text1}
                            onChange={(e) => handleItemChange(index, 'text1', e.target.value)}
                            placeholder="Term"
                            className={styles.termInput}
                        />
                        <input
                            type="text"
                            value={item.text2}
                            onChange={(e) => handleItemChange(index, 'text2', e.target.value)}
                            placeholder="Definition"
                            className={styles.definitionInput}
                        />
                        <button onClick={() => handleRemoveItem(index)} className={styles.removeButton}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddItem} className={styles.addButton}>Add Term</button>
                <button onClick={handleSave} className={styles.saveButton}>Save</button>
            </div>
        </div>
    );
}

export default EditSet;
