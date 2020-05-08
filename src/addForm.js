import React, { useState } from "react";

function AddForm() {
    const [values, setValues] = useState({title:"", note:"" });
    const [notes, setNotes] = useState([]);
    return  <div className="AddForm">
                <div>
                    <label
                        htmlFor="title">
                            Title
                    </label>
                </div>
                <div>
                    <input
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={(e)=>{setValues({...values, "title":e.target.value})}}
                    />
                </div>
                <div>
                    <label
                        htmlFor="note">
                        Note
                    </label>
                </div>
                <div>
                    <textarea
                        name="note"
                        id="note"
                        value={values.note}
                        placeholder="Write your notes here!"
                        onChange={(e)=>{setValues({...values, note:e.target.value})}}
                    />
                </div>
                <div>
                    <button onClick={()=>{
                        setValues({title:"",note:""});
                        setNotes([...notes, values])}}>
                        Add
                    </button>
                </div>
            </div>
}


export default AddForm;