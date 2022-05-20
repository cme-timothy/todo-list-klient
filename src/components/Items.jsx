import React, { useState } from "react";
import "./Items.css";
import bin from "../assets/bin.svg";
import checkmark from "../assets/checkmark.svg";
import empty from "../assets/empty.svg";

function Items(props) {
  const [active, setActive] = useState(props.data.checkmarked);

  function toggleCheckmark() {
    setActive(!active);
    if (active === true) {
      props.data.checkmarked = false;
    } else if (active === false) {
      props.data.checkmarked = true;
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
