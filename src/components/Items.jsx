import React, { useState } from "react";
import axios from "axios";
import "./Items.css";
import bin from "../assets/bin.svg";
import checkmark from "../assets/checkmark.svg";
import empty from "../assets/empty.svg";

function Items(props) {
  const [active, setActive] = useState(props.data.checkmarked);

  async function toggleCheckmark() {
    if (active === true) {
      await axios
        .patch(`http://localhost:5000/api/todos/${props.data.id}`, {
          checkmarked: false,
        })
        .then(function (response) {
          console.log(response);
          setActive(false);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    } else if (active === false) {
      await axios
        .put(`http://localhost:5000/api/todos/${props.data.id}`, {
          id: props.data.id,
          title: props.data.title,
          checkmarked: true,
        })
        .then(function (response) {
          console.log(response);
          setActive(true);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }

  function handleRemoveItem() {
    const id = props.data.id;
    props.removeItem(id);
  }

  return (
    <div className="ItemsList">
      <button className="checkbox">
        <img
          onClick={toggleCheckmark}
          className={"checkmarkPic"}
          src={active ? `${checkmark}` : `${empty}`}
          alt=""
        />
      </button>
      <li className="item">{props.data.title}</li>
      <button className="deleteButton" onClick={handleRemoveItem}>
        <img className="binPic" src={bin} alt="" />
      </button>
    </div>
  );
}

export default Items;
