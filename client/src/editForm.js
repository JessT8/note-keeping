import React, { useState } from "react";

function EditForm(props) {
    const [values, setValues] = useState(props.values);

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
                                                props.updateNote(values, props.index);
                                                  props.close();

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