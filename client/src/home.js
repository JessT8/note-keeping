import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from "./addForm";
import Notes from "./components/note/notes"
import './styles.scss';
import { useQuery, gql, useMutation} from '@apollo/client';
import { Redirect } from 'react-router-dom';

const NOTES = gql`
      query{
        notes{
          id,
          title,
          description,
          pin,
          user{
            id,
            username
          }
          tags{
            id,
            name
          }
      }
  }`;

const DELETE_NOTE = gql`
   mutation deleteNote($id: Float!){
      deleteNote(
        id:$id
        )}`;

function Home() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [displayMessage, setDisplayMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const { loading, error, data } = useQuery(NOTES);
  const [ deleteNote ]= useMutation(DELETE_NOTE, {
    onCompleted: (data) => {
        if(data.deleteNote)
            console.log('Successfully deleted')
    },
    onError:(err)=>{
        console.log(err)
        setHasError(true);
    }
    })
  useEffect(()=>{
    if (loading)
        setDisplayMessage('loading');
    else if(error)
       setDisplayMessage('Error :(');
    else if(data){
       setDisplayMessage('');
       setNotes(data.notes);
    }
},[loading, data,error])

  const favorite=(id)=>{
    const n = notes.map(note=> {
        if (note.id === id) {
            const pin = (note.pin ==='true')? 'false': 'true'
            note = {...note, pin};
        }
        return note;
    });
    setNotes(n);
  }

  const updateNote = (values)=>{
     const n = notes.map(note=> {
        if (note.id === values.id) {
            return values;
        }
        return note;
    });
    setNotes(n);
  }
  const removeNote= (i)=>{
    const id = parseInt(i,10);
    deleteNote({variables:{id}})
    const n = notes.filter(note => note.id !== i)
    setNotes(n);
  }
  if(error){
    return <Redirect to='/error'/>
  }
  return (
    <div className="App-main">
        <header className="pt-5 pb-2">
            <h1 className="nunito-font">My notes</h1>
            <button className="toggleAdd" onClick={()=>{setToggle(true)}}>+</button>
        </header>
      {toggle && <AddForm close={()=>{setToggle(false)}}
                          setNotes={(values)=>{
                          setNotes([...notes,values]); }}
                          displayMessage={(msg)=>{
                                setDisplayMessage(msg);
                          }}
                          />
      }
      {displayMessage}
      <Notes notes={notes}
                    favorite={(e)=>{favorite(e)}}
                    updateNote={(values)=>{ updateNote(values)}}
                    deleteNote={(i)=>{removeNote(i)}}
                    displayMessage={(msg)=>{
                                setDisplayMessage(msg);
                          }}
                    />
    </div>
  );
}

export default Home;