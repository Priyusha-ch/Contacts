import React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import '@progress/kendo-theme-default/dist/all.css';

const KendoReactGridView = (props) => {
  const { currentContacts } = props;

  const renderImageCell = (props) => {
    return (
      <td>
        <img className="avatar" src={user} alt="user" />
      </td>
    );
  };

  const renderNameCell = (props) => {
    const { name } = props.dataItem;
    return (
      <td>
        <Link className="name" to={{ pathname: `/contact/${props.dataItem.id}` }}>{name}</Link>
      </td>
    );
  };

  const renderIdCell = (props) => {
    const { id } = props.dataItem;
    return (
      <td>
        <Link className= "ID" to={{ pathname: `/contact/${id}` }}>{id}</Link>
      </td>
    );
  };

  const renderEmailCell = (props) => {
    const { email } = props.dataItem;
    return (
      <td>
        <Link to={{ pathname: `/contact/${props.dataItem.id}` }}>{email}</Link>
      </td>
    );
  };

  const renderActionCell = (props) => {
    const { id } = props.dataItem;
    return (
      <td className="actions-cell">
        <Link to={{ pathname: `/edit/${id}`, state: { contact: props.dataItem } }}>
          <button className="action-button edit-button" style={{ color: "blue" }}>
            Edit
          </button>
        </Link>
        <button className="action-button delete-button" style={{ color: "red" }} onClick={() => props.clickHandler(id)}>
          Delete
        </button>
      </td>
    );
  };
  

  return (
    <div className="kendo-grid">
      <Grid data={currentContacts}>
        <Column
          field="Image"
          title=""
          cell={renderImageCell}
          width={70}
        />
        <Column
          field="name"
          title="Name"
          cell={renderNameCell}
          width={100}
        />
        <Column
          field="id"
          title="ID"
          cell={renderIdCell}
          width={300}
        />
        <Column
          field="email"
          title="Email"
          cell={renderEmailCell}
          width={150}
        />
        <Column
          field="actions"
          title=""
          cell={renderActionCell}
          width={150}
        />
      </Grid>
    </div>
  );
};

export default KendoReactGridView;
