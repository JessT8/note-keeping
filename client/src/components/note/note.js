import React from 'react';
import NoteModal from "./noteModal";
import TagModal from "../tag/tagModal";
import './note.scss'
import { useDispatch, useSelector } from 'react-redux';
import { toggleNote, toggleAddTag } from '../../store/actions/toggleAction';

function Note(props){
    const dispatch = useDispatch();
    const noteToggle = useSelector( state => state.toggle.toggleNote);
    const addTagToggle = useSelector( state => state.toggle.toggleAddTag);

    return (
        <div className="card border-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-4 ">
            <div className="card-body note-label">
                <div>
                    <a href="/"
                       className="note-label-btn"
                       onClick={(e)=>{
                            e.preventDefault();
                            dispatch(toggleNote(props.note.id));
                          }}
                        >
                        <h3 className="card-title text-center pt-2">
                        {props.note.title}
                        </h3>
                    </a>
                </div>
                <div className="note-content dropup addTagOption d-flex flex-row-reverse">
                    <div className="dropdown-menu dropdown-menu-right"aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item"
                           href="!#"
                           onClick={(e)=>{
                            e.preventDefault();
                            dispatch(toggleAddTag(true));
                            }}>
                            Tags
                        </a>
                    </div>
                    <a id="dropdownMenuButton"
                       data-toggle="dropdown"
                       aria-haspopup="true"
                       href="!#"
                       className="pr-auto"
                       aria-expanded="false">
                       ...
                    </a>
                </div>
            </div>
            {(noteToggle === props.note.id) && <NoteModal values={props.note}/>}
            {addTagToggle && <TagModal close={()=>{                            dispatch(toggleAddTag(false))}}
                                       tags={props.note.tags}/>}
        </div>
    )
}

export default Note;