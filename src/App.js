import React, { useState } from 'react';
import './App.css';
import AddForm from "./addForm"
import DisplayNotes from "./displayNotes"
import './styles.scss';

function App() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);

  return (
    <div className="App">
        <header>
            <h1>Note keeper</h1>
            <button className="toggleAdd" onClick={()=>{setToggle(true)}}>+</button>
        </header>
      {toggle && <AddForm close={()=>{setToggle(false)}} setNotes={(value)=>{setNotes([...notes, value]);}}/>}
      <DisplayNotes notes={notes} />
    </div>
  );
}

export default App;