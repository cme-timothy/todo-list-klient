import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import axios from "axios";
import InputBox from "./InputBox";
import ItemsList from "./ItemsList";
import "./Main.css";

function Main() {
  const [items, setItems] = useState([]);
  const [randomItem, setRandomItem] = useState(false);
  const [randomItemTitle, setRandomItemTitle] = useState();

  async function getItems() {
    const response = await axios
      .get("http://localhost:5000/api/todos")
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    setItems(response.data);
  }

  async function addItem(title) {
    await axios
      .post("http://localhost:5000/api/todos", {
        id: nanoid(),
        title: title,
        checkmarked: false,
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    getItems();
    if (items.length > 0) {
      async function getRandomItem(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        const number = Math.floor(Math.random() * (max - min) + min);
        const randomId = items[number].id;
        const response = await axios
          .get(`http://localhost:5000/api/todos/${randomId}`)
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
        if (items.length > 3 && randomItem === false) {
          setRandomItem(true);
          setRandomItemTitle(response.data);
        }
      }
      getRandomItem(0, items.length);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  async function removeItem(id) {
    await axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    getItems();
    const foundItem = items.find((items) => items.id === id);
    if (foundItem.id === randomItemTitle?.id) {
      setRandomItem(false);
    }
  }

  return (
    <div className="Main">
      <h2 className="title">To-Do List</h2>
      <InputBox addTitle={addItem} />
      {randomItem === true && (
        <h3>List is getting long! Start with this one.</h3>
      )}
      {randomItem === true && <h3>{randomItemTitle?.title}</h3>}
      <ItemsList addItem={items} removeItem={removeItem} />
    </div>
  );
}

export default Main;
