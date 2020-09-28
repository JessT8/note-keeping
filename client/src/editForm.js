import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import  TextEditor  from './components/TextEditor/TextEditor';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { updateNote } from './store/actions/noteAction';
function EditForm(props) {
    const [values, setValues] = useState(props.values);
    const [ updateNote ]= useMutation(UPDATE_NOTE, {
        onError:(err)=>{
            props.displayMessage('Error :( ... ' + err);
        }
    });
    return  <div className="EditForm">
                <div className="popup mt-5 pt-5">
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
                            }} edit={true} />
                        </div>
                        <div className="flex-center">
                            <button className="noteBtn"
                                    onClick={()=>{
                                        if(values.title && values.description){
                                            if(props.values.title !== values.title || props.values.description!== values.description){
                                            props.updateNote(values);
                                              updateNote( {variables: { id:parseInt(values.id,10), noteInput:{title:values.title, description: values.description, pin: values.pin}}});
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
            </div>
}

export default EditForm;