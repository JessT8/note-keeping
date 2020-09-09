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
                            <div className="note-text--footer pt-2">
                                {props.note.tags.map(tag=>(
                                <span className="badge badge-pill badge-secondary mx-1 px-2 py-1">{tag.name}</span>
                                ))}
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