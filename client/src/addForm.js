import React, { useState , useRef } from "react";
import { gql, useMutation } from '@apollo/client';

const ADD_NOTE = gql`
   mutation createNote($noteInput:NoteInput!){
      createNote(
        noteInput:$noteInput
        ){
        id
    }
  }
`;

function AddForm(props) {
    const [values, setValues] = useState({id:"", title:"", description:"", pin:false });
    const inputRef = useRef([]);
    const [addNote] = useMutation(ADD_NOTE, {
    onCompleted: (data) => {
        if(data){
            values.id = data.createNote.id
            props.setNotes( values);
        }
    },
    onError:(err)=>{
        console.log(err)
        props.displayMessage('Opps... Something went wrong '+ err);
    }
    });
    inputRef.current = [];

   const addToRefs = el => {
   //display errors
     if (el && !inputRef.current.includes(el)) {
       inputRef.current.push(el);
     }
    };
    return  <div className="note--details">
                <div className="AddForm">
                    <div className="popup">
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
                            <div className="form__group_popup mx-auto">
                                <textarea
                                    ref={addToRefs}
                                    name="description"
                                    id="description"
                                    className="form__field_custom"
                                    value={values.description}
                                    placeholder="Write your notes here!"
                                    onChange={(e)=>{
                                        setValues({...values, description:e.target.value})}}
                                    required="required"
                                />
                            <label
                                htmlFor="description"
                                className="form__label2"
                            >
                                Note
                            </label>
                        </div>
                        <div>
                        <button className="noteBtn"
                                type="button"
                                onClick={ ()=>{

                                if(values.title && values.description){
                                   setValues({title:"",description:""});
                                   addNote({variables:{ noteInput: { title: values.title, description: values.description , pin:values.pin} }})
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
        </div>
    </div>
    </div>
}


export default AddForm;