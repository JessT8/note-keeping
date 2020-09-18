import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from "./addForm";
import Notes from "./components/note/notes"
import './styles.scss';
import { useQuery, gql, useMutation} from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { NOTES, ADD_TAG, DELETE_NOTE, REMOVE_TAG } from './query/query';
import FilterOptionIcon from './components/icon/filterOptionIcon.svg'
function Home() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [displayMessage, setDisplayMessage] = useState("");
  const { loading, error, data } = useQuery(NOTES);
  const [ deleteNote ]= useMutation(DELETE_NOTE, {
    onCompleted: (data) => {
        if(data.deleteNote)
            console.log('Successfully deleted')
    },
    onError:(err)=>{
        console.log(err)
    }
    })
  const [ addTagToNote ] = useMutation(ADD_TAG, {
    onCompleted: (data) => {
            console.log('Successfully added')
    },
    onError:(err)=>{
        console.log(err)
    }
    })
    const [ removeTagFromNote ] = useMutation(REMOVE_TAG, {
    onCompleted: (data) => {
            console.log('Successfully remove')
    },
    onError:(err)=>{
        console.log(err)
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
  const addTag = (i, tag) => {
    const noteId = parseInt(i,10);
    addTagToNote({variables:{noteId, tagInput:{name:tag}}})
    const n = notes.map(note=> {
        if (note.id === i) {
            const copiedNote = {...note, tags:[...note.tags, {name:tag}]};
            return copiedNote;
        }
        return note;
    });
    setNotes(n);
  }
  const removeTag = ( id, tag) => {
    const noteId = parseInt(id,10);
    removeTagFromNote({variables:{noteId, tagInput:{name:tag.name}}})
    const n = notes.map(note => {
        if( note.id === id ){
            const updatedTag = note.tags.filter(currentTag => currentTag.name !== tag.name );
            const updatedNote = {...note, tags:updatedTag};
            return updatedNote;
        }
        return note;
    })
    setNotes(n);
  }
  if(error){
    return <Redirect to='/error'/>
  }
  return (
    <>
        <div className="gear">
        <button className="gear-btn ml-5 mt-4" onClick={()=>console.log('hello')}><img src={FilterOptionIcon} alt="gear"/></button>
        </div>
    <div className="App-main">

        <header className="pt-5 pb-2">
            <h1 className="nunito-font">My notes</h1>
            <button className="toggleAdd" onClick={()=>{setToggle(true)}}>+</button>
        </header>
      {toggle && <AddForm close={()=>{setToggle(false)}}
                          setNotes={(values)=>{
                          setNotes([ values, ...notes ]); }}
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
                    addTag={(i, tag)=>addTag(i, tag)}
                    removeTag={(id, tag)=>removeTag(id,tag)}
                    />
    </div>
    </>
  );
}

export default Home;