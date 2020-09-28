import React, {useState} from 'react';
import NoteModal from "./noteModal";
import TagModal from "../tag/tagModal";
import TextConverter from '../TextEditor/TextConverter';
import './note.scss'
function Note(props){
    const [ toggle , setToggle ] = useState(false);
    const [ addTagToggle, setAddTagToggle ] = useState(false);
    return (
        <div className="card border-0 pt-2 col-12 col-md-6 col-lg-4 col-xl-4 ">
            <div className="card-body note-label">
                <div>
                    <a href="/"
                       className="note-label-btn"
                       onClick={(e)=>{
                            e.preventDefault();
                            setToggle(true)}}
                        >
                        <h4 className="card-title text-center">
                        {props.note.title}
                        </h4>
                        <div className="note-content py-2">
                            <TextConverter description={props.note.description}/>
                        </div>
                    </a>
                </div>
                <div className="dropup addTagOption d-flex flex-row-reverse">
                    <div className="dropdown-menu dropdown-menu-right"aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item"
                           href="!#"
                           onClick={(e)=>{
                            e.preventDefault();
                            setAddTagToggle(true);
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
            {toggle && <NoteModal back={()=>{
                                    setToggle(false)}
                                  }
                                  values={props.note}/>}
            {addTagToggle && <TagModal close={()=>{setAddTagToggle(false)}}
                                       tags={props.note.tags}/>}
        </div>
    )
}

export default Note;