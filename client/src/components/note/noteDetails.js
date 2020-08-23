import React , {useState }from 'react';

function NoteDetails(props) {
    return  <div className="popup">
                <button className="back button-link"
                   onClick={()=>{props.back();}}>
                    &larr;
                </button>
                <div>
                    <div className="mx-auto mt-3">
                        <h1>{props.values.title}</h1>
                        <div className="row">
                            <div className="col mx-auto">
                                <button className="button-link mx-2"
                                        onClick={()=>{
                                            props.showEdit();
                                        }}
                                >Edit
                                </button> |
                                <button className="button-link mx-2"
                                        onClick={()=>{props.deleteNote()}}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="details--description mt-3 mx-auto">
                        <p>{props.values.description}</p>
                    </div>
                </div>
            </div>
}

export default NoteDetails;