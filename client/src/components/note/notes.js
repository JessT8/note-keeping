import React, { useState } from "react";
import Note from "./note";

function Notes(props) {
    const notes = props.notes.map((note)=>{
        return  (<React.Fragment key={note.id}>
                    <Note note={note}
                           updateNote={props.updateNote}
                           deleteNote={()=>{
                            console.log(note.id);
                            props.deleteNote(note.id)}}
                    />
                </React.Fragment>);
        });
    return <div className="container">
            <div className="row">
                    {notes}
                </div>
            </div>}
export default Notes;