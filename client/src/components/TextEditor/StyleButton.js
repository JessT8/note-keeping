import React from 'react';
import LinkIcon from '../icon/linkIcon.svg';
import ULIcon from '../icon/ulIcon.svg';
import ImageIcon from '../icon/imageIcon.svg';
import FontSizeIcon from '../icon/fontSizeIcon.svg';
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
            label = <img src={LinkIcon}/>
          }else if(props.option.label === 'image'){
            label = <img src={ImageIcon}/>
          }else if(props.option.label === 'unordered-list-item'){
            label = <img src={ULIcon} />
          }else if(props.option.label === 'text-left'){
            label = <img src={TextLeftIcon} />
          }else if(props.option.label === 'text-center'){
            label = <img src={TextCenterIcon} />
          }else if(props.option.label === 'text-right'){
            label = <img src={TextRightIcon} />
          }else if(props.option.label === 'font-size-dropdown'){

          }
          return (
            <span className={`${props.option.styleName} col`} onMouseDown={onToggle}>
              {label}
            </span>
          );
}

export default StyleButton;