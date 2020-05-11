import React from "react";

function DisplayNotes(props) {
    const notes = props.notes.map((note)=>{
        return <h1>{note.title}</h1>;
    });
    return <div>{notes}</div>
}


export default DisplayNotes;