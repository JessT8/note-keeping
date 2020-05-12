import React, { useState } from "react";

function AddForm(props) {
    const [values, setValues] = useState({title:"", note:"", favorite:false });
    return  <div className="AddForm">
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
                                    name="note"
                                    id="note"
                                    rows="3"
                                    className="form__field_custom"
                                    value={values.note}
                                    placeholder="Write your notes here!"
                                    onChange={(e)=>{
                                        setValues({...values, note:e.target.value})}}
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
                                if(values.title && values.note){
                                    setValues({title:"",note:""});
                                    props.setNotes( values);
                                    props.close();
                                }else{
                                    console.log("error message");
                                }}
                                }>
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}


export default AddForm;