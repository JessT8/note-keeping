import React from 'react';
import StyleButton from './StyleButton';
import Options from './Options'

function OptionControls (props){
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className='textbox-options row no-gutters'>
            {Options.OPTIONS.map((option,i) =>
            <React.Fragment key={i}>
              <StyleButton
                option={option}
                onToggle={props.onToggle}
              />
            </React.Fragment>
            )}
          </div>
        );
      };
export default OptionControls;