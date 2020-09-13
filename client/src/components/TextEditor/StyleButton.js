import React from 'react';
import LinkIcon from '../icon/linkIcon.svg';
import ULIcon from '../icon/ulIcon.svg';
import ImageIcon from '../icon/imageIcon.svg';
// import FontSizeIcon from '../icon/fontSizeIcon.svg';
import TextLeftIcon from '../icon/textLeftIcon.svg';
import TextCenterIcon from '../icon/textCenterIcon.svg';
import TextRightIcon from '../icon/textRightIcon.svg';

function StyleButton(props){
        const onToggle = (e) => {
            e.preventDefault();
            props.onToggle(props.option.value, props.option.type);
          };
          let label = props.option.label;
          if(props.option.label === 'link'){
            label = <img src={LinkIcon} alt='link-icon'/>
          }else if(props.option.label === 'image'){
            label = <img src={ImageIcon} alt='img-icon'/>
          }else if(props.option.label === 'unordered-list-item'){
            label = <img src={ULIcon} alt='UL-icon'/>
          }else if(props.option.label === 'text-left'){
            label = <img src={TextLeftIcon} alt='left-align-icon'/>
          }else if(props.option.label === 'text-center'){
            label = <img src={TextCenterIcon} alt='center-align-icon'/>
          }else if(props.option.label === 'text-right'){
            label = <img src={TextRightIcon} alt='right-align-icon'/>
          }else if(props.option.label === 'font-size-dropdown'){

          }
          return (
            <span className={`${props.option.styleName} col`} onMouseDown={onToggle}>
              {label}
            </span>
          );
}

export default StyleButton;