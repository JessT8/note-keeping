import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from "./addForm";
import DisplayNotes from "./displayNotes"
import './styles.scss';
import { useQuery, gql } from '@apollo/client';

const NOTES = gql`
      query{
        notes{
          id,
          title,
          description,
          pin
      }
  }`;


function App() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error, data } = useQuery(NOTES);
  useEffect(()=>{
    if(error)
       setErrorMessage('Error :(')
    else if(data)
       setNotes(data.notes);
    },[data,error])

  const favorite=(id)=>{
    const n = notes.map(note=> {
        if (note.id === id) {
            const pin = (note.pin=='true')? 'false': 'true'
            note = {...note, pin};
        }
        return note;
    });
    setNotes(n);
  }
  const addNotes =()=>{

  }
  const updateNote = (values)=>{
     const n = notes.map(note=> {
        if (note.id === values.id) {
            return values;
        }
        return note;
    });
     console.log(values);
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
      {toggle && <AddForm close={()=>{setToggle(false)}} setNotes={(values)=>{addNotes(values);}}/>}
      {errorMessage}
      <DisplayNotes notes={notes} favorite={(e)=>{favorite(e)}} updateNote={(values)=>{ updateNote(values)}} deleteNote={(i)=>{deleteNote(i)}}/>
    </div>
  );
}

export default App;