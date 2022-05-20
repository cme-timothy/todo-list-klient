import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import InputBox from "./InputBox";
import ItemsList from "./ItemsList";
import "./Main.css";

function Main() {
  const [items, setItems] = useState([]);

  async function getTodos() {
    const response = await axios.get("http://localhost:5000/api/todos");
    setItems(response.data);
  }

  async function addItem(title) {
    await axios.post("http://localhost:5000/api/todos", {
      id: nanoid(),
      title: title,
      checkmarked: false,
    });
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function removeItem(id) {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    getTodos();
  }

  return (
    <div className="Main">
      <h2 className="title">To-Do List</h2>
      <InputBox addTitle={addItem} />
      <ItemsList addItem={items} removeItem={removeItem} />
    </div>
  );
}

export default Main;
