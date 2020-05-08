import React, { useState } from "react";

function AddForm() {
    const [values, setValues] = useState({title:"", note:"" });
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
                    />
                </div>
                <div>
                    <button>
                        Add
                    </button>
                </div>
            </div>
}


export default AddForm;