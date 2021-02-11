import React, { useState, useRef } from "react";
import { updateNote } from '../../store/actions/noteAction';
import { useDispatch } from 'react-redux';
import TextEditor  from '../TextEditor/TextEditor';
import FullModal from '../modal/fullModal';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import NoteSubmissionError from '../error/noteSubmissionError';

function EditNote(props) {
    const [values, setValues] = useState(props.values);
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    return  <FullModal>
                <div className="mt-5">
                    <button className="back button-link"
                       onClick={()=>{props.showEdit()}}>
                        &larr;
                    </button>
                    <div className="content">
                        <div className="form__group_popup mx-auto">
                            <input
                                id="title"
                                name="title"
                                className="form__field"
                                value={values.title}
                                placeholder="Title"
                                ref={inputRef}
                                onChange={(e)=>{setValues({...values, "title":e.target.value})}}
                            />
                            <label
                                htmlFor="title"
                                className="form__label nunito-font"
                                >
                                Title
                            </label>
                        </div>
                        <div className=" form__group_popup mx-auto">
                            <TextEditor
                                description={values.description} onChange={(desc)=>{setValues({...values, "description":JSON.stringify(desc)})}}
                                edit={true}
                             />
                        </div>
                        <div className="flex-center">
                            <button className="btn btn-primary"
                                    onClick={()=>{
                                        if(values.title){
                                            if(props.values.title !== values.title || props.values.description!== values.description){
                                              dispatch(updateNote({variables: { id:parseInt(values.id,10), noteInput:{title:values.title, description: values.description, pin: values.pin}}}))
                                            }
                                            setClicked(true);
                                        }else{
                                            inputRef.current.focus();
                                        }
                                    }
                                    }>
                                         Save
                             </button>
                        </div>
                    </div>
                </div>
                { <NoteSubmissionError clicked={clicked} close={props.close} clearValues={()=>{setValues({title:'', description:''})}} resetClick={()=>{setClicked(false)}} showEdit={props.showEdit}/>}
            </FullModal>
}

export default EditNote;