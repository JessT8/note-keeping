import React from 'react';


var OPTIONS = [
          {label: 'H1', value: '2.25rem', styleName:'tool-label', type:'fontSize'},
          {label: 'H2', value: '1.97rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H3', value: '1.73rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H4', value: '1.5rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H5', value: '1.31rem', styleName:'tool-label',type:'fontSize'},
          {label: 'Normal', value: '1rem', styleName:'tool-label',type:'fontSize'},
          {label: '•', value: 'unordered-list-item', styleName:'tool-label',type:'predefined'},
          {label: 'code', value: 'code-block', styleName:'tool-label',type:'predefined'},
          {label:'U', value:'underline',styleName:'tool-label underline',type:'textDecoration'},
          {label:'B', value:'bold', styleName:'tool-label bold',type:'fontWeight'},
          {label:'I', value:'italic',styleName:'tool-label italic',type:'fontStyle'},
          {label:'abc', value:'line-through',styleName:'tool-label strikethrough', type:'textDecoration'},
          {label:'clear', value:'initial',styleName:'tool-label', type:'initial'},
          {label:'a', value:'link',styleName:'tool-label', type:'link'}
]
      class StyleButton extends React.Component {
        constructor(props) {
          super(props);
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.option.value, this.props.option.type);
          };
        }

        render() {
          return (
            <span
            className={this.props.option.styleName} onMouseDown={this.onToggle}>
              {this.props.option.label}
            </span>
          );
        }
      }
function OptionControls (props){
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div className='textbox-options'>
            {OPTIONS.map((option,i) =>
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