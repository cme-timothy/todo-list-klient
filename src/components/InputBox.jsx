import React, { useState } from "react";
import "./InputBox.css";
import add from "../assets/add.svg";

function InputBox(props) {
  const [name, setName] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && name !== "") {
      setName("");
      props.addTitle(name);
    }
  }

  function handleClick() {
    if (name !== "") {
      setName("");
      props.addTitle(name);
    }
  }

  return (
    <div className="inputContainer">
      <input
        className="inputBox"
        placeholder="..."
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={name}
      />
      <button className="addButton" onClick={handleClick}>
        <img className="addPic" src={add} alt="" />
      </button>
    </div>
  );
}

export default InputBox;
