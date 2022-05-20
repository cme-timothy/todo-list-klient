import React from "react";
import { nanoid } from "nanoid";
import Items from "./Items";

function ItemsList(props) {
  return (
    <div>
      {props.addItem.map((title) => {
        return (
          <Items key={nanoid()} data={title} removeItem={props.removeItem} />
        );
      })}
    </div>
  );
}

export default ItemsList;
