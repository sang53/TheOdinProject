import { useState } from "react";
import "../styles/App.css";
import EditField from "./EditField";
import FieldContainer from "./FieldContainer";
import ListContainer from "./ListContainer";

function App() {
  const [editId, setEditId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [hoverContId, setHoverContId] = useState(null);

  const basicProps = { onHover, onEdit, hoverId, editId };
  const containerProps = { onHoverCont, hoverContId };

  function onHover(event) {
    event.stopPropagation();
    setHoverId(event.target.id);
  }

  function onEdit(event) {
    event.stopPropagation();
    setEditId(event.target.id);
  }

  function onHoverCont(event) {
    event.stopPropagation();
    setHoverContId(event.currentTarget.id);
  }

  function reset(event) {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA")
      return;
    setEditId(null);
    setHoverContId(null);
    setHoverId(null);
  }

  return (
    <div id="main" onClick={reset}>
      <EditField id="name" {...basicProps} />
      <EditField id="contact" {...basicProps} />
      <EditField id="intro" {...basicProps} />
      <FieldContainer {...basicProps} {...containerProps} id="employment" />
      <ListContainer {...basicProps} {...containerProps} id="skills" />
      <FieldContainer {...basicProps} {...containerProps} id="education" />
      <ListContainer {...basicProps} {...containerProps} id="licenses" />
      <ListContainer {...basicProps} {...containerProps} id="extras" />
    </div>
  );
}

export default App;
