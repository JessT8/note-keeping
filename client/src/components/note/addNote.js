import React, { useState , useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addNote } from '../../store/actions/noteAction';
import { toggleError } from '../../store/actions/toggleAction';
import TextEditor from '../TextEditor/TextEditor'
import Error from '../error/error';
import FullModal from '../modal/fullModal';
import Modal from '../modal/modal';

function AddNote(props) {
    const [values, setValues] = useState({id:"", title:"", description:"", pin:false });
    const error = useSelector(state=>state.notes.error);
    const errorToggle = useSelector(state=>state.toggle.toggleError);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const editorRef = useRef(null);
    const isLoading = useSelector(state=> state.notes.isLoading);

    const getRef = (v) => {
        editorRef.current = v.current;
    }

    const [clicked, setClicked] = useState(false);
    useEffect(()=>{
        if(!isLoading && clicked){
            if(!error){
                setValues({title:'', description:'' })
                props.close();
                dispatch(toggleError(false));
            }
            else{
                dispatch(toggleError(true));
            }
            setClicked(false);
        }
    },[isLoading, error, dispatch, props, clicked]);
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
                            getRef={getRef}
                            onChange={(desc)=>{setValues({...values, "description":JSON.stringify(desc)})}}/>
                        </div>
                        <div className="flex-center">
                            <button className="btn btn-primary"
                                    type="button"
                                    onClick={ ()=>{
                                    if(values.title && values.description){
                                       dispatch(addNote({noteInput: { title: values.title, description: values.description , pin:values.pin} }));
                                        setClicked(true);
                                    }else{
                                        !values.title ? inputRef.current.focus(): editorRef.current.focus();
                                    }}
                                    }>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                {errorToggle && (<Modal>
            <button className="close"
                    onClick={()=>{dispatch(toggleError(false))
                }}>
                &#10005;
            </button><Error/></Modal>)}
            </FullModal>
}

export default AddNote;