import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContacts } from "../api/contacts";

const EditContact = ({ updateContactHandler }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // const contact = await updateContact(id);
        const response = await fetchContacts();
        const contact = response.data.find((obj) => obj.id === id);

        console.log("Contact data: ", contact); // console log here
        const { name, email } = contact;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }

    try {
      await updateContactHandler(id, { name, email });
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };

  return (
    <div className="containerStyle">
      <div className="segmentStyle">
        <h2 className="headingStyle">Edit Contact</h2>
        <form className="contactForm" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
