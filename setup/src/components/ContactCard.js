import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;
  return (
    <React.Fragment>
      <td>
        <Link to={{pathname:`/contact/${id}`}}> 
        <img className="avatar" src={user} alt="user" />
        </Link>
      </td>
      <td><Link to={{pathname:`/contact/${id}`}}> {name}</Link></td>
      <td><Link to={{pathname:`/contact/${id}`}}> {id}</Link></td>
      <td><Link to={{pathname:`/contact/${id}`}}> {email}</Link></td>
     
      <td className="corner-icon">
        <Link to={{ pathname: `/edit/${id}`, state: { contact: props.contact } }}>
          <i className="edit alternate outline icon" style={{ color: "blue" }}></i>
        </Link>
        <i
          className="trash alternate outline icon"
          style={{ color: "red" }}
          onClick={() => props.clickHandler(id)}
        ></i>
      </td>
    </React.Fragment>
  );
};

export default ContactCard;
