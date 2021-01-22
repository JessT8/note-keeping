import React from 'react';
import NoteModal from "./noteModal";
import TagModal from "../tag/tagModal";
import AddIcon from '../icon/addIcon.svg';
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
                <div className="note-content d-flex flex-row-reverse">
                    <a
                           href="!#"
                           onClick={(e)=>{
                            e.preventDefault();
                            dispatch(toggleAddTag(props.note.id));
                            }}>
                           <span class="addTagOption addTag-icon"></span>
                     </a>
                </div>
            </div>
            {(noteToggle === props.note.id) && <NoteModal values={props.note}/>}
            {(addTagToggle === props.note.id) && <TagModal
                                       tags={props.note.tags}
                                       values={props.note}
                                       />}
        </div>
    )
}

export default Note;