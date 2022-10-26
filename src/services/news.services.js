import { db } from '../firebase-config';
import 'firebase/database';
//import db from "./firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc,doc} from 'firebase/firestore';

const newsCollectionRef = collection(db,"news");
class NewsDataService{
    addNewss = (newNews)=>{
        return addDoc(newsCollectionRef, newNews);
    };
    /* getDocOnValue =(value) =>{
       // return newsCollectionRef('title','==',value);
       
       return newsCollectionRef.where('title','==',value).get();
    } */
    updateNews = (id, updatedNews) => {
         const newsDoc = doc(db, "news", id);
         return updateDoc(newsDoc, updatedNews);
    };

    deleteNews = (id)=>{
        const newsDoc = doc(db, "news", id);
        return deleteDoc(newsDoc);
    };

    getAllNewss = () =>{
        return getDocs(newsCollectionRef);
    };

    getNews = (id) => {
        const newsDoc = doc(db, "news", id);
        return getDoc(newsDoc);
    }
}

export default new NewsDataService();