import React, { useState } from "react";
import  TextEditor  from './components/TextEditor/TextEditor';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { updateNote } from './store/actions/noteAction';
import { useDispatch } from 'react-redux';
import FullModal from './components/modal/fullModal';

function EditForm(props) {
    const [values, setValues] = useState(props.values);
    const dispatch = useDispatch();
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
                            <TextEditor description={values.description} onChange={(desc)=>{setValues({...values, "description":JSON.stringify(desc)})
                            }}   edit={true}
                             />
                        </div>
                        <div className="flex-center">
                            <button className="noteBtn"
                                    onClick={()=>{
                                        if(values.title && values.description){
                                            if(props.values.title !== values.title || props.values.description!== values.description){
                                              dispatch(updateNote({variables: { id:parseInt(values.id,10), noteInput:{title:values.title, description: values.description, pin: values.pin}}}))
                                           }
                                            props.showEdit();
                                        }else{
                                            console.log("invalid input");
                                        }
                                    }
                                    }>
                                         Save
                             </button>
                        </div>
                    </div>
                </div>
            </FullModal>
}

export default EditForm;