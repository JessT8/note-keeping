import React, { useState } from "react";
import EditForm from "./editForm";

function DisplayNotes(props) {
    const [toggle , setToggle ] = useState(false);
    const [currentEdit , setCurrentEdit ] = useState({});

//for currentEdit values
    const resetValues = ()=>{
        setCurrentEdit({});
    };

    const notes = props.notes.map((note)=>{
        return  (<React.Fragment key={note.id}>
                    <div className="card border-0 pt-2 col-4">
                            <div className="card-block note-label">
                                <div className="note-text">
                                        <h5 className="note-text--title">{note.title}
                                        </h5>
                                        <p className="card-text note-text--description text-truncate mt-2 pt-2">{note.description}
                                        </p>
                                    </div>
                                <div>
                                <div className="d-flex justify-content-end note-text--footer bg-white">
                                    <button type="button" className="position-relative text-dark view-button">
                                    <i className="fab fa-readme">  View</i>
                                    </button>
                                </div>
                            </div>
                          </div>
                    </div>
                </React.Fragment>);
        });
    return <div className="container">
            <div className="row">
                    {notes}
                </div>
                {toggle && <EditForm close={()=>{
                                        setToggle(false)}}
                                    values={currentEdit}
                                    displayMessage={(msg)=>{
                                        props.displayMessage(msg);
                                    }}
                                    updateNote={(values)=>{

                                        resetValues();
                                        props.updateNote(values);}}/>}
            </div>}
export default DisplayNotes;