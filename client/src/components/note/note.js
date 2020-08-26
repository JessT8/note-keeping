import React, {useState} from 'react';
import NoteModal from "./noteModal";
import EditFrom from "../../editForm";
import TextConverter from '../TextEditor/TextConverter';

function Note(props){
    const [toggle , setToggle ] = useState(false);

    return (
                <div className="card border-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-4 ">
                        <button className="card-block note-label view-button"
                                   onClick={()=>{
                                        setToggle({toggle:true})
                            }}
                        >
                        <h5 className="note-text--title">
                                {props.note.title}
                            </h5>
                            <div className="note-text--description d-flex ">
                                <div className="text-truncate my-auto">
                                    <TextConverter description={props.note.description}/>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-end note-text--footer bg-white">
                                    <div className="position-relative text-dark pt-2">
                                        <i className="fab fa-readme">  View</i>
                                    </div>
                                </div>
                            </div>
                        </button>
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