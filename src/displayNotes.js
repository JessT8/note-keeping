import React, { useState , useCallback } from "react";
import EditForm from "./editForm";

function DisplayNotes(props) {
    const [toggle , setToggle ] = useState(false);
    const [currentEdit , setCurrentEdit ] = useState({});
    const [index, setIndex] = useState(-1);

    const resetValues = useCallback(() => {
        setCurrentEdit({});
        setIndex(-1);
    }, [currentEdit, index])

    const notes = props.notes.map((note, i)=>{
        return  (<React.Fragment key={i}>
                    <input type="checkbox"
                           name={note.title}
                           id={note.title}
                           onChange={(e)=>{
                                props.favorite(i);}}
                           className="checkbox-input"/>
                    <label htmlFor={note.title}
                           className="checkbox-label">
                        <div className="checkbox-text">
                            <div className="animated-box">
                                <p className="checkbox-text--title">{note.title}</p>
                                <p className="checkbox-text--description">{note.note}</p>
                            </div>
                             <button className="edit"
                                     onClick={(e)=>{
                                        setToggle(true);
                                        setCurrentEdit(note);
                                        setIndex(i);}}>
                                        <i className="fa edit">&#xf040;</i>
                            </button>
                            <button className="remove"
                                    onClick={(e)=>{props.deleteNote(i)}}>
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
                                    index={index}
                                    updateNote={(values, i)=>{
                                        resetValues();
                                        props.updateNote(values, i);}}/>}
            </div>
}
export default DisplayNotes;