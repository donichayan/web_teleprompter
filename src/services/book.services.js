import { db } from '../firebase-config';
import 'firebase/database';
//import db from "./firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc,doc} from 'firebase/firestore';

const bookCollectionRef = collection(db,"news");
class BookDataService{
    addBooks = (newBook)=>{
        return addDoc(bookCollectionRef, newBook);
    };
    /* getDocOnValue =(value) =>{
       // return bookCollectionRef('title','==',value);
       
       return bookCollectionRef.where('title','==',value).get();
    } */
    updateBook = (id, updatedBook) => {
         const bookDoc = doc(db, "news", id);
         return updateDoc(bookDoc, updatedBook);
    };

    deleteBook = (id)=>{
        const bookDoc = doc(db, "news", id);
        return deleteDoc(bookDoc);
    };

    getAllBooks = () =>{
        return getDocs(bookCollectionRef);
    };

    getBook = (id) => {
        const bookDoc = doc(db, "news", id);
        return getDoc(bookDoc);
    }
}

export default new BookDataService();