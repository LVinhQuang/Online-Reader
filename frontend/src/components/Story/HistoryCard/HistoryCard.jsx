import React from 'react'
import { Link } from 'react-router-dom';
import {getFirestore, doc, deleteDoc, Firestore} from "firebase/firestore"
import { getAuth } from 'firebase/auth';

import './HistoryCard.css'

const HistoryCard = ({ story, index }) => {
    story.chapter = parseInt(story.chapter.split('-')[1])
    const db = getFirestore();
    const auth = getAuth();
    
    const handleDelete = (name) => {
        try {
            let docRef = doc(db,"users", auth.currentUser.uid, "history", name)
            deleteDoc(docRef);
        }
        catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="HistoryCard__container" key={index}>
            <Link to={`/stories/${story.domain}/${story.name}`}>
                <div className="HistoryCard__item">
                    <img className="HistoryCard__itemImg" src={story.image} alt="featured story image" />
                    <div className="HistoryCard__itemTitle">{story.title}</div>
                </div>
            </Link>
            <span className='HistoryCard__domain'>{story.domain}</span>
            <div className='HistoryCard__chapter'>
                Chương {story.chapter}
            </div>
            <button className='HistoryCard__deleteBtn' onClick={() => handleDelete(story.name)}>
                Xóa
            </button>
        </div>
    )
}

export default HistoryCard;