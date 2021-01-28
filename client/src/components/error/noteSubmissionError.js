import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './error.scss';
import Error from './error';
import Modal from '../modal/modal';
import { toggleError } from '../../store/actions/toggleAction';

function NoteSubmissionError(props){
    const dispatch = useDispatch();
    const isLoading = useSelector(state=> state.notes.isLoading);
    const error = useSelector(state=>state.notes.error);
    const errorToggle = useSelector(state=>state.toggle.toggleError);
    useEffect(()=>{
        if(!isLoading && props.clicked){
            if(!error){
                if(props.edit){
                    props.showEdit();
                }else{
                    props.clearValues();
                    props.close();
                }
                dispatch(toggleError(false));
            }
            else{
                dispatch(toggleError(true));
            }
            props.resetClick();
        }
    },[isLoading, error, dispatch, props]);
    if(!errorToggle){
        return <></>;
    }
    return (
        <Modal>
            <button className="close"
                        onClick={()=>{dispatch(toggleError(false))
                    }}>
                &#10005;
            </button>
            <Error/>
        </Modal>
        )
}

export default NoteSubmissionError;