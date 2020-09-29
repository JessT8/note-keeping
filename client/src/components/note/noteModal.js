import React, { useState } from 'react';
import NoteDetails from './noteDetails';
import EditForm from '../../editForm';
import { useDispatch } from 'react-redux'
import { toggleNote } from '../../store/actions/toggleAction';

function NoteModal(props) {
    const [toggle , setToggle ] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className="note--details">
            {!toggle ? <NoteDetails back={()=>{ dispatch(toggleNote(''))}}
                             values={props.values}
                             showEdit={()=>{setToggle(true)}}
                             />
                        : <EditForm showEdit={()=>{
                                                 setToggle(false);
                                                }}
                                    values={props.values}/>
            }
        </div>)
}
export default NoteModal;