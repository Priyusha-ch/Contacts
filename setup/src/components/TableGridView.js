import React from "react";
import ContactCard from "./ContactCard";

const TableGridView = ({ currentContacts, deleteContactHandler }) => {
  const renderContactList = currentContacts.map((contact) => (
    <tr key={contact.id}>
      <ContactCard contact={contact} clickHandler={deleteContactHandler} />
    </tr>
  ));

  return (
    <div>
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
    </div>
  );
};

export default TableGridView;
