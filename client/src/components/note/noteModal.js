import React, { useState } from 'react';
import NoteDetails from './noteDetails';
import EditNote from './editNote';
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
                        : <EditNote showEdit={()=>{
                                                 setToggle(false);
                                                }}
                                    values={props.values}/>
            }
        </div>)
}
export default NoteModal;