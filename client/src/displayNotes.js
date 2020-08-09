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
                    <input type="checkbox"
                           name={note.title}
                           id={note.title}
                           onChange={(e)=>{
                                props.favorite(note.id);}}
                           className="checkbox-input"/>
                    <label htmlFor={note.title}
                           className="checkbox-label">
                        <div className="checkbox-text">
                            <div className="animated-box">
                                <p className="checkbox-text--title">{note.title}</p>
                                <p className="checkbox-text--description">{note.description}</p>
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
                </React.Fragment>);
        });
    return <div>
                {notes}
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