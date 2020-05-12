import React from "react";

function DisplayNotes(props) {
    const notes = props.notes.map((note, i)=>{
        return (
            <React.Fragment key={i}>
                <input type="checkbox"
                   name={note.title}
                   id={note.title}
                   onChange={(e)=>{
                   props.favorite(i);}}
                   className="checkbox-input"/>
                <label htmlFor={note.title} className="checkbox-label">
                  <div className="checkbox-text">
                    <div className="animated-box">
                        <p className="checkbox-text--title">{note.title}</p>
                        <p className="checkbox-text--description">{note.note}</p>
                    </div>
                    <button className="edit"><i className="fa edit">&#xf040;</i></button>
                    <button className="remove" href="#popup1"><i className="fa">&#xf00d;</i></button>
                  </div>
                </label>
            </React.Fragment>);
        });
    return <div>{notes}</div>
}


export default DisplayNotes;