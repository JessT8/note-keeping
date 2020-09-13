import React, {useState} from 'react';
import NoteModal from "./noteModal";
import TextConverter from '../TextEditor/TextConverter';
import './note.scss'
function Note(props){
    const [toggle , setToggle ] = useState(false);

    return (
            <div className="card border-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-4 ">
                <div className="card-body note-label">
                    <div>
                        <a href="/" className="note-label-btn" onClick={(e)=>{
                            e.preventDefault();
                            setToggle(true)}}
                        >
                        <h4 className="card-title text-center">{props.note.title}</h4>
                        <hr/>
                        <TextConverter description={props.note.description}/>
                        </a>
                    </div>
                    <hr/>
                    <div>
                        <a href="/" onClick={(e)=>{
                            e.preventDefault();
                        }}>
                            ...
                        </a>
                    </div>
                </div>
                {toggle && <NoteModal back={()=>{
                                    setToggle(false)}}
                                    values={props.note}
                                    displayMessage={(msg)=>{
                                        console.log(msg);
                                    }}
                                    updateNote={(values)=>{
                                        props.updateNote(values);}
                                    }
                                    deleteNote={props.deleteNote}
                                    />
                }
            </div>
            )
}

export default Note;