import React, { useState , useRef } from "react";

function AddForm(props) {
    const [values, setValues] = useState({title:"", note:"", favorite:false });
    const inputRef = useRef([]);
    inputRef.current = [];

   const addToRefs = el => {
     if (el && !inputRef.current.includes(el)) {
       inputRef.current.push(el);
     }
    };
    return  <div className="AddForm">
                <div className="overlay">
                    <div className="popup">
                        <a className="close" onClick={()=>{props.close();}}>&times;</a>
                        <div className="content">
                            <form>
                                <div className="form__group_popup">
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
                                <div className="form__group_popup">
                                    <textarea
                                        ref={addToRefs}
                                        name="note"
                                        id="note"
                                        rows="3"
                                        className="form__field_custom"
                                        value={values.note}
                                        placeholder="Write your notes here!"
                                        onChange={(e)=>{
                                            setValues({...values, note:e.target.value})}}
                                        required="required"
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
                                    type="submit"
                                    onClick={()=>{
                                    if(values.title && values.note){
                                        setValues({title:"",note:""});
                                        props.setNotes( values);
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