import { useState } from "react";
import defaults from "../assets/defaultTexts";
import EditField from "./EditField";
import "../styles/FieldContainer.css";

export default function FieldContainer(props) {
  const [items, setItems] = useState([crypto.randomUUID()]);

  const settings = defaults[props.id];
  const basicProps = { onHover: props.onHover, onEdit: props.onEdit };
  const itemElements = items.map((key) => {
    const headingId = "h" + key;
    const descId = "d" + key;
    return (
      <div key={key}>
        <EditField
          {...basicProps}
          defaultText={settings.heading}
          isInput={true}
          id={headingId}
          isHover={props.hoverId === headingId}
          isEdit={props.editId === headingId}
          className="heading"
        ></EditField>
        <EditField
          {...basicProps}
          defaultText={settings.desc}
          isInput={false}
          id={descId}
          isHover={props.hoverId === descId}
          isEdit={props.editId === descId}
        ></EditField>
      </div>
    );
  });

  function addItem() {
    setItems([...items, crypto.randomUUID()]);
  }

  return (
    <div
      id={props.id}
      className={props.isHover ? "container hovered" : "container"}
      onMouseOver={props.onHoverCont}
    >
      <div className="title">{settings.title}</div>
      {itemElements}
      {props.isHover && <button onClick={addItem}>Add</button>}
    </div>
  );
}
