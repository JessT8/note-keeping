import React from 'react';
import SizeOptions from './SizeOptions';
import HighlightOptions from './HighlightOptions';

function StyleButton(props){
        const onToggle = (e) => {
            e.preventDefault();
            props.onToggle(props.option.value, props.option.type);
          };
          const toggleSize = (value, type) => {
            props.onToggle(value, type);
          };
          const toggleColor = (value, type) => {
            props.onToggle(value, type);
          };

          let label = props.option.label;
          if(props.option.label === 'link'){
            label = <span className="link-icon icon"></span>
          }else if(props.option.label === 'image'){
            label = <span className="image-icon icon"></span>
          }else if(props.option.label === 'unordered-list-item'){
            label = <span className="ul-icon icon"></span>
          }else if(props.option.label === 'text-left'){
            label = <span className="textLeft-icon icon"></span>
          }else if(props.option.label === 'text-center'){
            label = <span className="textCenter-icon icon"></span>
          }else if(props.option.label === 'text-right'){
            label = <span className="textRight-icon icon"></span>
          }else if(props.option.label === 'font-size-dropdown'){
            label = <span className="fontsize-icon icon"></span>
          }
          return (
            <>
            {(props.option.type !== 'fontSize' && (props.option.type !== 'highlight') ) &&
                <span className={`${props.option.styleName} col`} onMouseDown={onToggle}>
                  {label}
                </span>}
             {(props.option.label === 'font-size-dropdown') &&
                <div className={`${props.option.styleName} col dropdown`}>
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {label}
                    </span>
                    <span className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenuButton">
                        {SizeOptions.SIZEOPTIONS.map((opt,i)=>{
                        return <a key={i} className="dropdown-item" style={{"fontSize": opt.value}} href="//"      onClick={(e)=>{
                                        e.preventDefault();
                                        toggleSize(opt.value, opt.type)}}>
                                    {opt.label}
                                </a>
                        })}
                    </span>
                </div>}
                {(props.option.label === 'highlight-dropdown') &&
                <div className={`${props.option.styleName} col dropdown`}>
                    <span id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className='fas pt-1'>&#xf591;</i>
                    </span>
                    <div className="dropdown-menu scrollable-menu dropdown-color" aria-labelledby="dropdownMenuButton">
                        {HighlightOptions.HIGHLIGHTOPTIONS.map((opt,i)=>{
                            return <span key={i} className='color' style={{"color": opt.value}} ><a className="dropdown-item-color" style={{"color": opt.value}} href="//" onClick={(e)=>{
                                            e.preventDefault();
                                            toggleColor(opt.value, opt.type)}}>
                                        {opt.label}
                                    </a>
                                    </span>
                            })}
                    </div>
                </div>}
            </>
          );
}

export default StyleButton;