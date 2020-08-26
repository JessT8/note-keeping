import React, { useState } from 'react';
import NoteDetails from './noteDetails';
import EditForm from '../../editForm';

function NoteModal(props) {
    const [toggle , setToggle ] = useState(false);
    return  <div className="note--details">
            {!toggle ?
                <NoteDetails back={()=>{
                             props.back(false)}}
                             values={props.values}
                             displayMessage={props.displayMessage}
                             showEdit={()=>{setToggle(true)}}
                             deleteNote={props.deleteNote}
                             /> :
                <EditForm showEdit={()=>{
                             setToggle(false)}}
                             values={props.values}
                             displayMessage={props.displayMessage}
                             updateNote={props.updateNote}
                             />
            }
            </div>
}

export default NoteModal;