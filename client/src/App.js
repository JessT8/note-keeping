import React, { useState } from 'react';
import './App.css';
import AddForm from "./addForm";
import DisplayNotes from "./displayNotes"
import './styles.scss';

function App() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const favorite=(id)=>{
    const i = parseInt(id);
    const n = [...notes];
    n[i].favorite = !n[i].favorite;
    setNotes(n);
  }

  const updateNote = (values, i)=>{
    const n = [...notes];
    n[i] = values;
    setNotes(n);
  }
  const deleteNote = (i)=>{
    const n = [...notes];
    n.splice(i,1);
    setNotes(n);
  }
  return (
    <div className="App">
        <header>
            <h1>Note keeper</h1>
            <button className="toggleAdd" onClick={()=>{setToggle(true)}}>+</button>
        </header>
      {toggle && <AddForm close={()=>{setToggle(false)}} setNotes={(value)=>{setNotes([...notes, value]);}}/>}
      <DisplayNotes notes={notes} favorite={(e)=>{favorite(e)}} updateNote={(values, i)=>{updateNote(values, i)}} deleteNote={(i)=>{deleteNote(i)}}/>
    </div>
  );
}

export default App;