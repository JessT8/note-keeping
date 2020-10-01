import React from 'react';
import TextConverter from '../TextEditor/TextConverter';
import { useDispatch } from 'react-redux'
import { deleteNote } from '../../store/actions/noteAction';
import FullModal from '../modal/fullModal';

function NoteDetails(props) {
    const dispatch = useDispatch();
    return (
        <FullModal>
            <button className="back button-link"
                    onClick={()=>{props.back();}}>
                    &larr;
            </button>
            <div>
                <div>
                    <div className="d-flex justify-content-center mt-3">
                        <h1>{props.values.title}</h1>
                    </div>
                    <div className="row">
                        <div className="col d-flex justify-content-center mt-">
                            <button className="button-link mx-2"
                                    onClick={()=>{
                                        props.showEdit();
                                    }}>
                                    Edit
                            </button> |
                            <button className="button-link mx-2"
                                    onClick={() => {
                                        dispatch(deleteNote(props.values.id))
                                    }}>
                                    Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="details--description mt-3 mx-auto">
                    <TextConverter description={props.values.description}
                                   format={true}/>
                </div>
            </div>
        </FullModal>
    )
}

export default NoteDetails;