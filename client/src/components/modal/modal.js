import React from 'react';
import './modal.scss';
function modal(props){
    return <div className="note--details">
                <div className="overlay">
                    <div className="popup">
                        {props.children}
                    </div>
                </div>
            </div>
}

export default modal;