import { useState } from "react";
import "../styles/App.css";
import EditField from "./EditField";
import FieldContainer from "./FieldContainer";
import ListContainer from "./ListContainer";

function App() {
  const [editId, setEditId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const [hoverContId, setHoverContId] = useState(null);

  const basicProps = { onHover, onEdit };
  const containerProps = { editId, hoverId, onHoverCont };

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

  function reset() {
    setEditId(null);
    setHoverContId(null);
    setHoverId(null);
  }

  return (
    <div id="main" onClick={reset}>
      <EditField
        id="name"
        isHover={hoverId === "name"}
        isEdit={editId === "name"}
        {...basicProps}
      />
      <EditField
        id="contact"
        isHover={hoverId === "contact"}
        isEdit={editId === "contact"}
        {...basicProps}
      />
      <EditField
        id="intro"
        isHover={hoverId === "intro"}
        isEdit={editId === "intro"}
        {...basicProps}
      />
      <FieldContainer
        {...basicProps}
        {...containerProps}
        isHover={hoverContId === "employment"}
        id="employment"
      />
      <ListContainer
        {...basicProps}
        {...containerProps}
        isHover={hoverContId === "skills"}
        id="skills"
      />
      <FieldContainer
        {...basicProps}
        {...containerProps}
        isHover={hoverContId === "education"}
        id="education"
      />
      <ListContainer
        {...basicProps}
        {...containerProps}
        isHover={hoverContId === "licenses"}
        id="licenses"
      />
      <ListContainer
        {...basicProps}
        {...containerProps}
        isHover={hoverContId === "extras"}
        id="extras"
      />
    </div>
  );
}

export default App;
