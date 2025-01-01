import "../styles/EditField.css";
import defaults from "../assets/defaultTexts";
import { useState } from "react";

export default function EditField(props) {
  return (
    <EditFieldInternal
      {...props}
      isHover={props.hoverId === props.id}
      isEdit={props.editId === props.id}
      defaultText={props.defaultText || defaults[props.id].default}
      isInput={
        props.isInput ||
        (props.isInput === undefined && defaults[props.id].isInput)
      }
      className={props.className || "text"}
    />
  );
}

function EditFieldInternal(props) {
  const [text, setText] = useState(props.defaultText);

  function handleChange(event) {
    setText(event.target.value);
  }

  if (props.isEdit) {
    return (
      <>
        {props.isInput ? (
          <input value={text} id={props.id} onChange={handleChange} />
        ) : (
          <textarea value={text} id={props.id} onChange={handleChange} />
        )}
      </>
    );
  }
  return (
    <div
      {...(props.isHover
        ? { onClick: props.onEdit }
        : { onMouseOver: props.onHover })}
      id={props.id}
      className={props.isHover ? `${props.className} hovered` : props.className}
    >
      {text}
    </div>
  );
}
