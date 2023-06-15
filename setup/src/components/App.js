import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  // const contactsPerPage = 5;

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedContacts || [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedContacts = async () => {
      const response = await fetchContacts();
      return response.data;
    };

    const getAllContacts = async () => {
      const allContacts = await storedContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await addContact(request);
    const data = JSON.parse(response.config.data);
    const updatedContacts = [...contacts, data];
    setContacts(updatedContacts);
  };

  const updateContactHandler = async (id, updatedContact) => {
    try {
      const response = await updateContact(id, updatedContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? response.data : contact
      );
      setContacts(updatedContacts);
    } catch (error) {
      console.log(error);
    }
  };

  const removeContactHandler = async (id) => {
    await deleteContact(id);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  return (
    <Router>
      <div>
        <Header />
        <div className="ui container">
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  searchResults={searchTerm.length < 1 ? contacts : searchResults}
                  getContactId={removeContactHandler}
                  term={searchTerm}
                  searchKeyWord={searchHandler}
                  currentPage={currentPage}
                  setPage={setCurrentPage} 
                />
              }
            />
            <Route
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />}
            />
            <Route
              path="/contact/:id"
              element={<ContactDetail contacts={contacts} />}
            />
            <Route
              path="/edit/:id"
              element={
                <EditContact
                  updateContactHandler={updateContactHandler}
                  contacts={contacts}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
