import React, { useState } from 'react';
import './tagModal.scss'
function TagModal(props) {
    const [ tagValue, setTagValue ] = useState('');
    return  <div className="note--details">
                <div className="tag-overlay">
                    <div className="tag-popup">
                        <button className="close"
                            onClick={()=>{props.close()}}>
                        &#10005;
                        </button>
                        <h3 className="text-center pb-3">Tags</h3>
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
                                    props.addTag(tagValue)
                                    setTagValue('');
                                }
                            }}
                            >Add Tags</button>
                        <div className='mt-3 d-flex flex-row flex-wrap'>
                        {props.tags.map((tag,i)=>(
                           <span key={i} className="badge badge-secondary px-2 py-1 text-truncate mr-1 my-2 ">{tag.name}</span>
                        ))
                        }
                    </div>
                    </div>
                </div>
            </div>
}

export default TagModal;