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
                    <div className="card border-0 pt-2">
                            <input type="checkbox"
                                   name={note.title}
                                   id={note.title}
                                   onChange={(e)=>{
                                        props.favorite(note.id);}}
                                   className="card-body checkbox-input"/>
                            <label htmlFor={note.title}
                                   className="checkbox-label">
                                <div className="checkbox-text">
                                    <div className="animated-box">
                                        <h5 className="checkbox-text--title">{note.title}</h5>
                                        <p className="card-text checkbox-text--description mt-2 pt-2">{note.description}</p>

                                         <p className="checkbox-text--description  text-muted"><span className="ml-auto">Username</span></p>
                                    </div>
                             <button className="edit"
                                     onClick={(e)=>{
                                        setToggle(true);
                                        setCurrentEdit(note);
                                        }}>
                                        <i className="fa edit">&#xf040;</i>
                            </button>
                            <button className="remove"
                                    onClick={(e)=>{props.deleteNote(note.id)}}>
                                    <i className="fa">&#xf00d;</i>
                            </button>
                         </div>
                    </label>

                    </div>
                </React.Fragment>);
        });
    return <div>
                <div className="card-columns">
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
            </div>
}
export default DisplayNotes;