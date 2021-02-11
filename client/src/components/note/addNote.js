import React, { useState , useRef } from "react";
import { useDispatch } from 'react-redux';
import { addNote } from '../../store/actions/noteAction';
import TextEditor from '../TextEditor/TextEditor'
import FullModal from '../modal/fullModal';
import NoteSubmissionError from '../error/noteSubmissionError';

function AddNote(props) {
    const [values, setValues] = useState({id:"", title:"", description:"", pin:false });
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    return  <FullModal>
                <button className="back button-link"
                        onClick={()=>{props.close();}}>
                     &larr;
                </button>
                <div className="content">
                    <form>
                        <div className="form__group_popup mx-auto">
                            <input
                                id="title"
                                name="title"
                                className="form__field"
                                value={values.title}
                                placeholder="Title"
                                onChange={(e)=>{setValues({...values, "title":e.target.value})}}
                                ref={inputRef}
                                required="required"
                            />
                            <label
                                htmlFor="title"
                                className="form__label"
                                >
                                Title
                            </label>
                        </div>
                        <div className=" form__group_popup mx-auto">
                            <TextEditor
                            onChange={(desc)=>{setValues({...values, "description":JSON.stringify(desc)})}}/>
                        </div>
                        <div className="flex-center">
                            <button className="btn btn-primary"
                                    type="button"
                                    onClick={ ()=>{
                                    if(values.title){
                                       dispatch(addNote({noteInput: { title: values.title, description: values.description , pin:values.pin} }));
                                        setClicked(true);
                                    }else{
                                        inputRef.current.focus();
                                    }}
                                    }>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
               { <NoteSubmissionError clicked={clicked} close={props.close} clearValues={()=>{setValues({title:'', description:''})}} resetClick={()=>{setClicked(false)}}/> }
            </FullModal>
}

export default AddNote;