import "../styles/EditField.css";
import defaults from "../assets/defaultTexts";
import { useState } from "react";

export default function EditField(props) {
  const defaultText = props.defaultText || defaults[props.id].default;
  const isInput =
    props.isInput ||
    (props.isInput === undefined && defaults[props.id].isInput);
  const className = props.className || "text";
  const [text, setText] = useState(defaultText);

  function handleChange(event) {
    setText(event.target.value);
  }

  if (props.isEdit) {
    return (
      <>
        {isInput ? (
          <input value={text} onChange={handleChange} />
        ) : (
          <textarea value={text} onChange={handleChange} />
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
      className={props.isHover ? `${className} hovered` : className}
    >
      {text}
    </div>
  );
}
