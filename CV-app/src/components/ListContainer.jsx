import { useState } from "react";
import ListItem from "./ListItem";
import defaultTexts from "../assets/defaultTexts";

export default function ListContainer(props) {
  return (
    <ListContainerInternal
      {...props}
      isHover={props.hoverContId === props.id}
    />
  );
}

function ListContainerInternal(props) {
  const [items, setItems] = useState([crypto.randomUUID()]);
  const basicProps = { onHover: props.onHover, onEdit: props.onEdit };
  const listItems = items.map((key) => {
    return (
      <ListItem
        {...props}
        key={key}
        id={key}
        defaultText={defaultTexts[props.id].text}
      />
    );
  });

  function addItem() {
    setItems([...items, crypto.randomUUID()]);
  }

  return (
    <div
      onMouseOver={props.onHoverCont}
      id={props.id}
      className={props.isHover ? "container hovered" : "container"}
    >
      <div className="heading">{defaultTexts[props.id].title}</div>
      <ul>{listItems}</ul>
      {props.isHover && <button onClick={addItem}>Add</button>}
    </div>
  );
}
