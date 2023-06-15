import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import oceanImage from "../images/ocean-bg.jpg";

const AddContact = ({ addContactHandler }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate("/");
  };

  return (
    <div className="containerStyle">
      <div className="segmentStyle">
        <h1 className="headingStyle">Add Contact</h1>
        <form className="contactForm" onSubmit={add}>
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
          <button type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};




export default AddContact;
