import React from 'react';
import './modal.scss';

function modal(props){
    return <div className="fullscreen-popup">
                {props.children}
            </div>
}

export default modal;