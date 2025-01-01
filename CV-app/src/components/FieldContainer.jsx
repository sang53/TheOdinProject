import { useState } from "react";
import defaults from "../assets/defaultTexts";
import EditField from "./EditField";
import "../styles/FieldContainer.css";

export default function FieldContainer(props) {
  return (
    <FieldContainerInternal
      {...props}
      isHover={props.hoverContId === props.id}
    />
  );
}

function FieldContainerInternal(props) {
  const [items, setItems] = useState([crypto.randomUUID()]);

  const settings = defaults[props.id];
  const itemElements = items.map((key) => {
    const headingId = "h" + key;
    const descId = "d" + key;
    return (
      <div key={key}>
        <EditField
          {...props}
          defaultText={settings.heading}
          isInput={true}
          id={headingId}
          className="heading"
        ></EditField>
        <EditField
          {...props}
          defaultText={settings.desc}
          isInput={false}
          id={descId}
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
