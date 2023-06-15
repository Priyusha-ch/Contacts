import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef("");
  const contactsPerPage = 10;

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const indexOfLastContact = props.currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = props.searchResults.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => {
    props.setPage(pageNumber);
  };

  const renderContactList = currentContacts.map((contact) => (
    <tr key={contact.id}>
      <ContactCard contact={contact} clickHandler={deleteContactHandler} />
    </tr>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.searchResults.length / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
  };

  return (
    <div className="main">
      <h2 className="contact-heading">
        Contact List
        <Link to="/add" className="add-contact-link">
          <button className="ui button blue">Add Contact</button>
        </Link>
      </h2>
      <div className="search-container">
        <div className="ui search">
          <div className="ui icon search">
            <input
              style={{ width: "85vw" }}
              ref={inputEl}
              type="text"
              placeholder="Search Contacts"
              className="prompt"
              value={props.term}
              onChange={getSearchTerm}
            />
            <i className="search icon" style={{ margin: "-30px" }}></i>
          </div>
        </div>
      </div>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderContactList.length > 0 ? (
            renderContactList
          ) : (
            <tr>
              <td colSpan="5">No Contacts Available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination" style={{marginTop:"20px"}}>
        {pageNumbers.map((number) => (
          <button  key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
