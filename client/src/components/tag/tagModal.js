import React, { useState } from 'react';
import './tagModal.scss';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { addTag, removeTag } from '../../store/actions/noteAction';
import { toggleAddTag } from '../../store/actions/toggleAction';
function TagModal(props) {
    const [ tagValue, setTagValue ] = useState('');
    const dispatch = useDispatch();
    return  <Modal>
                <button className="close"
                    onClick={()=>{dispatch(toggleAddTag(''))}}>
                &#10005;
                </button>
                <h3 className="text-center">Tags</h3>
                <p className="text-center pb-1">{props.values.title}</p>
                <div className="form-group ">
                    <input className="form-control"
                        value={tagValue}
                        onChange={(e)=>{
                            setTagValue(e.target.value)
                        }}
                    />
                </div>
                <button className="btn btn-primary"
                    onClick={()=>{
                        if(tagValue){
                            dispatch(addTag({variables:{tagInput:{name:tagValue}, noteId:props.values.id}}));
                            setTagValue('');
                        }
                    }}
                    >Add Tags</button>
                <div className='mt-3 d-flex flex-row flex-wrap'>
                {props.tags.map((tag,i)=>(
                   <span key={i} className="badge badge-secondary px-2 py-1 text-truncate mr-1 my-2 "><span>{tag.name}</span><a href="!#" onClick={(e)=>{
                        e.preventDefault();
                        dispatch(removeTag({variables:{tagInput:{name:tag.name}, noteId:props.values.id}}));
                   }} className="pl-1">&#10005;</a></span>
                ))
                }
                </div>
                </Modal>
}

export default TagModal;