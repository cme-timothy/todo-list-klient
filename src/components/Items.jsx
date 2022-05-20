import React, { useState } from "react";
import axios from "axios";
import "./Items.css";
import bin from "../assets/bin.svg";
import checkmark from "../assets/checkmark.svg";
import empty from "../assets/empty.svg";

function Items(props) {
  const [active, setActive] = useState(props.data.checkmarked);

  async function toggleCheckmark() {
    setActive(!active);
    if (active === true) {
      await axios.patch(`http://localhost:5000/api/todos/${props.data.id}`, {
        checkmarked: false,
      });
    } else if (active === false) {
      await axios.put(`http://localhost:5000/api/todos/${props.data.id}`, {
        id: props.data.id,
        title: props.data.title,
        checkmarked: true,
      });
    }
  }

  function handleRemoveItem() {
    const id = props.data.id;
    props.removeItem(id);
    setActive(!active);
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
