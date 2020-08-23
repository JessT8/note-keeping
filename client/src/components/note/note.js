import React, {useState} from 'react';
import NoteModal from "./noteModal";
import EditFrom from "../../editForm";

function Note(props){
    const [toggle , setToggle ] = useState(false);

    return (
            <div className="card border-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-4 ">
                <div className="card-block note-label">
                    <h5 className="note-text--title">
                        {props.note.title}
                    </h5>
                    <div className="note-text--description d-flex ">
                        <div className="text-truncate my-auto">{props.note.description}
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-end note-text--footer bg-white">
                                <button type="button" className="position-relative text-dark view-button pt-2" onClick={()=>{
                                        setToggle({toggle:true})
                                    }}>
                                <i className="fab fa-readme">  View</i>
                                </button>
                        </div>
                    </div>
                </div>
                {toggle && <NoteModal back={()=>{
                                        setToggle(false)}}
                                    values={props.note}
                                    displayMessage={(msg)=>{
                                        props.displayMessage(msg);
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