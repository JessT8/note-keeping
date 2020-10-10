import React, { useState , useRef } from "react";
import { useDispatch } from 'react-redux';
import { addNote } from './store/actions/noteAction';
import TextEditor from './components/TextEditor/TextEditor'
import FullModal from './components/modal/fullModal';

function AddForm(props) {
    const [values, setValues] = useState({id:"", title:"", description:"", pin:false });
    const dispatch = useDispatch();
    const inputRef = useRef([]);
    inputRef.current = [];
   const addToRefs = el => {
     if (el && !inputRef.current.includes(el)) {
       inputRef.current.push(el);
     }
    };

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
                                ref={addToRefs}
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
                            <TextEditor onChange={(desc)=>{setValues({...values, "description":JSON.stringify(desc)})}} />
                        </div>
                        <div className="flex-center">
                            <button className="noteBtn"
                                    type="button"
                                    onClick={ ()=>{
                                    if(values.title && values.description){
                                       setValues({title:"",description:""});
                                       dispatch(addNote({noteInput: { title: values.title, description: values.description , pin:values.pin} }));
                                       props.close();
                                    }else{
                                        !values.title ? inputRef.current[0].focus(): inputRef.current[1].focus();
                                    }}
                                    }>
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </FullModal>
}

export default AddForm;