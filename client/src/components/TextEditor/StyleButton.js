import React from 'react';

function StyleButton(props){
        const onToggle = (e) => {
            e.preventDefault();
            props.onToggle(props.option.value, props.option.type);
          };
          return (
            <span
            className={props.option.styleName} onMouseDown={onToggle}>
              {props.option.label}
            </span>
          );
}

export default StyleButton;