import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from "./addForm";
import Notes from "./components/note/notes"
import './styles.scss';
import { useQuery, useMutation} from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { NOTES, ADD_TAG, DELETE_NOTE, REMOVE_TAG } from './query/query';
import FilterOptionIcon from './components/icon/filterOptionIcon.svg'
import SlideDrawer from './components/slideDrawer/slideDrawer'

function Home() {
  const [toggle, setToggle] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [toggleDrawer, setToggleDrawer] = useState(false);
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
      console.log(error)
    else if(data){
       setDisplayMessage('');
       setNotes(data.notes);
    }
},[loading, data, error])
  useEffect(()=>{
    if(filterTag!==''){
        const filteredNotes = notes.filter((note)=>
            note.tags.some(t => t.name === filterTag));
        setFilterNotes(filteredNotes);
    }else{
        setFilterNotes(notes);
    }
  }, [filterTag, notes])

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
    console.log(values);
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
  let noteColClass = "col"
  if(toggleDrawer) {
           noteColClass = 'col-9'
    }
  return (
    <div className="mt-5">
    <div className="container-fluid">
    <div className="App-main">
        <header className="pt-5">
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
     <div className="gear">
        <button className="gear-btn ml-5" onClick={()=>{setToggleDrawer(!toggleDrawer)}}><img src={FilterOptionIcon} alt="gear"/><span className="mx-1">Filter</span></button>
        </div>
      <div className="container-fluid">
      <div className="row">
         <SlideDrawer show={toggleDrawer} notes={notes} filterNotes={(tag)=>{setFilterTag(tag)}} close={()=>setToggleDrawer(false)}/>
     <div className={noteColClass}>
      <Notes notes={filterNotes}
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
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default Home;