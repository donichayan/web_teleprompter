import React from "react";
import { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button, Table } from "react-bootstrap";
//import BooksList from "./components/BookList";
import BookDataService from "../services/book.services";
//import { , Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";




const AddBook = ({ id, setBookId, getBookId }) => {
  const [order, setOrder] = useState("");
  //const [title2, setTitle2] = useState("");
  //const [id2, setId2] = useState("");
  const [news, setNews] = useState("");
  //const [status, setStatus] = useState("Available");
  //const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log("fetch call!....");
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (order === "" || news === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newBook = {
      order,
      news,
      
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== "") {
        await BookDataService.updateBook(id, newBook);
        setBookId("");
        await getBooks();
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        //<BooksList getBookId={newBook.id}.Refresh />
        await getBooks();
        
        setMessage({ error: false, msg: "New Book added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setOrder("");
    setNews("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setOrder(docSnap.data().order);
      setNews(docSnap.data().news);
      //setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };
  /* const moveUp = async (id) => {
    setMessage("");
    try {
     
      const docSnap = await BookDataService.getBook(id);
      const docSnap2 = await BookDataService.getDocOnValue((docSnap.data().title)++);
      
      console.log("the record move up is :", docSnap.data());
      console.log("the record is :", docSnap2.data());
      setTitle((docSnap.data().title));
      
     
      setStatus(docSnap.data().status); 
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }; */
  useEffect(() => {
    getBooks();
    console.log("Data Base Fetched initial");
  }, []);
  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <>  
      <div class="mw-100">
        <div className="p-4 box">
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBookTitle">
              <div style={{ width: "400px" }}>
                <InputGroup>
                  <InputGroup.Text id="formBookTitle">1</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Order Number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                  />
                </InputGroup>
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBookAuthor">
              <div >
                <InputGroup class="input-group input-group-lg">
                  <InputGroup.Text id="formBookAuthor">2</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="News"
                    value={news}
                    onChange={(e) => setNews(e.target.value)}
                  />
                </InputGroup>
              </div>
            </Form.Group>
            {/* <ButtonGroup aria-label="Basic example" className="mb-3">
              <Button
                disabled={flag}
                variant="success"
                onClick={(e) => {
                  setStatus("Available");
                  setFlag(true);
                }}
              >
                Available
              </Button>
              <Button
                variant="danger"
                disabled={!flag}
                onClick={(e) => {
                  setStatus("Not Available");
                  setFlag(false);
                }}
              >
                Not Available
              </Button>
            </ButtonGroup> */}
            <div >
              <Button variant="primary" type="Submit">
                Add/ Update
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Container>
        <Row>
          <Col>
          <>
            <div className="mb-2">
              {/* <Button variant="dark edit" onClick={getBooks}>
                Refresh List
              </Button> */}
            </div>

            {/* <pre>{JSON.stringify(books, undefined, 2)}</pre>} */}
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order</th>
                  <th>News</th>
                  
                </tr>
              </thead>
              <tbody>
                {books.sort((a,b)=> a.order > b.order ? 1:-1).map((doc, index) => {
                  return (
                    <tr key={doc.id}>
                      <td>{index + 1}</td>
                      <td>{doc.order}</td>
                      <td>{doc.news}</td>
                      
                      <td>
                        <Button
                          variant="secondary"
                          className="edit"
                          onClick={(e) => getBookId(doc.id)}
                        >
                            Edit  
                        </Button>
                        <Button
                          variant="danger"
                          className="delete"
                          onClick={(e) => deleteHandler(doc.id)}
                        >
                          Delete
                        </Button>
                        
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddBook;
