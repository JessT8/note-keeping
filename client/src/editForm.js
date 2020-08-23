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
            props.displayMessage('Error :( ... ' + err);
        }
  });
        console.log(props.values);
    return  <div className="EditForm">
                <div className="popup">
                    <button className="close button-link"
                       onClick={()=>{props.close();}}>
                       &times;
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
                                className="form__label"
                                >
                                Title
                            </label>
                        </div>
                        <div className="form__group_popup mx-auto">
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
                            <button className="noteBtn"
                                    onClick={()=>{
                                        if(values.title && values.description){
                                            //if changes were made
                                            if(props.values.title !== values.title || props.values.description!== values.description){
                                            props.updateNote(values);
                                              updateNote( {variables: { id:parseInt(values.id,10), noteInput:{title:values.title, description: values.description, pin: values.pin}}});
                                           }
                                            props.close();
                                        }else{
                                            console.log("invalid input");
                                        }}
                                    }>
                                         Save
                             </button>
                        </div>
                    </div>
                </div>
            </div>
}

export default EditForm;