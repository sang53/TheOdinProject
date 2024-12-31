import { useState } from "react";

export default function ListItem(props) {
  const [text, setText] = useState(props.defaultText);

  function updateText(event) {
    setText(event.target.value);
  }

  if (props.isEdit) {
    return <input value={text} onChange={updateText} />;
  }

  return (
    <li
      className={props.isHover ? "list-item hovered" : "list item"}
      id={props.id}
      {...(props.isHover
        ? { onClick: props.onEdit }
        : { onMouseOver: props.onHover })}
    >
      {text}
    </li>
  );
}
