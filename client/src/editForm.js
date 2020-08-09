import React, { useState } from "react";
import { gql, useMutation } from '@apollo/client';

const UPDATE_NOTE = gql`
   mutation updateNote($id: Float!, $noteInput:NoteInput!){
      updateNote(id:$id, noteInput:$noteInput){
        id,
        description
      }
  }
`;

function EditForm(props) {
    const [values, setValues] = useState(props.values);
    const [ updateNote ]= useMutation(UPDATE_NOTE, {
        onError:(err)=>{
            console.log(err)
            props.displayMessage('Error :( ... ' +err);
        }
  });
    return  <div className="EditForm">
                <div className="overlay">
                    <div className="popup">
                        <a className="close" onClick={()=>{props.close();}}>&times;</a>
                        <div className="content">
                            <div className="form__group_popup">
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
                                    className="form__label"
                                    >
                                    Title
                                </label>
                            </div>
                            <div className="form__group_popup">
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="3"
                                    className="form__field_custom"
                                    value={values.description}
                                    placeholder="Write your notes here!"
                                    onChange={(e)=>{
                                        setValues({...values, description:e.target.value})}}
                                />
                                 <label
                                    htmlFor="note"
                                    className="form__label2"
                                >
                                Note
                                </label>
                            </div>
                            <div>
                                <button className="btnAdd"
                                        onClick={()=>{

                                            if(values.title && values.description){
                                                props.updateNote(values);
                                                  props.close();
                                                  values.pin = false;
                                                  updateNote( {variables: { id:parseInt(values.id,10), noteInput:{title:values.title, description: values.description, pin: values.pin}}});
                                            }else{
                                                console.log("error message");
                                            }}
                                        }>
                                             Save
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}

export default EditForm;