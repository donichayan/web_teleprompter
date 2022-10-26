import { useState} from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import AddNews from "./components/AddNews";
//import AddBook from "./components/AddBook";
//import { db } from './firebase-config';
//import BooksList from "./components/BookList";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import BookDataService from "./services/book.services";
function App() {
  const [newsId, setNewsId] = useState("");
  //const [books, setBooks] = useState([]);
  //const doc = db.collection('books');

/* const observer = doc.onSnapshot(docSnapshot => {
  console.log(`Received doc snapshot: ${docSnapshot}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
}); */

  
  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setNewsId(id);
  };
 /*  useEffect(() => {
    
  },[]); */
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home" >Teleprompter</Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <AddNews id={newsId} setNewsId={setNewsId} getNewsId={getBookIdHandler}/>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
//<AddBook id={bookId} setBookId={setBookId} getBookId={getBookIdHandler}/>