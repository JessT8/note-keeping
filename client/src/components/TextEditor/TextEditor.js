import React from 'react'
import Draft from 'draft-js'
import createStyles from 'draft-js-custom-styles';
import './TextEditor.css'
const {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw} = Draft;
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.editor = React.createRef();
        this.focus = () => {this.editor.current.focus()};
        this.onChange = (editorState) => {
        this.setState({editorState})
            const contentState = editorState.getCurrentContent();
            this.props.onChange(JSON.stringify(convertToRaw(contentState)));
        };
        this.onToggle = (value, type) => this._onToggle(value,type);
    }
    componentDidMount(){
        const data = JSON.parse(JSON.parse(this.props.description));
        const contentState = convertFromRaw(data);
        const editorState = EditorState.createWithContent(contentState);
        this.onChange(editorState);
    }
    _onToggle( value, type ){
        const { editorState } = this.state;
        if( value === 'unordered-list-item' ){
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, value));
            return;
        }else if( value === 'initial' ){
            const properties = ['fontStyle', 'fontWeight', 'textDecoration' ];
            let newEditorState = editorState;
            properties.map(p=>{
                newEditorState = styles[p].remove(newEditorState);
            });
                this.onChange(newEditorState);
                return;
        }
        const selection = editorState.getSelection();
        const newEditorState = styles[type].remove(editorState);
        this.onChange(styles[type].add(newEditorState,value))
    }
    render() {
        const {editorState} = this.state;
            return (
                <div style={styling.root}>
                    <OptionControls
                        editorState={editorState}
                        onToggle={this.onToggle}
                    />
                    <div style={styling.editor} onClick={this.focus}>
                        <Editor
                          editorState={editorState}
                          onChange={this.onChange}
                          placeholder="Write your notes here..."
                          ref={this.editor}
                          customStyleFn={customStyleFn}
                        />
                    </div>
                </div>
                );
            }
        }




//*********************************************
//********************BUTTONS******************
//*********************************************
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

      var OPTIONS = [
          {label: 'H1', value: '2.25rem', styleName:'tool-label', type:'fontSize'},
          {label: 'H2', value: '1.97rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H3', value: '1.73rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H4', value: '1.5rem', styleName:'tool-label',type:'fontSize'},
          {label: 'H5', value: '1.31rem', styleName:'tool-label',type:'fontSize'},
          {label: 'Normal', value: '1rem', styleName:'tool-label',type:'fontSize'},
          {label: '•', value: 'unordered-list-item', styleName:'tool-label',type:''},
          {label:'U', value:'underline',styleName:'tool-label underline',type:'textDecoration'},
          {label:'B', value:'bold', styleName:'tool-label bold',type:'fontWeight'},
          {label:'I', value:'italic',styleName:'tool-label italic',type:'fontStyle'},
          {label:'abc', value:'line-through',styleName:'tool-label strikethrough', type:'textDecoration'},
          {label:'clear', value:'initial',styleName:'tool-label', type:''}
      ]

      const OptionControls = (props) => {
        var currentStyle = props.editorState.getCurrentInlineStyle();
        return (
          <div style={styling.controls}>
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

      const styling = {
        root: {
          fontFamily: '\'Georgia\', serif',
          fontSize: 14,
          margin: '0 auto',
        },
        editor: {
          borderTop: '1px solid #ddd',
          cursor: 'text',
          fontSize: 16,
        },
        controls: {
          fontFamily: '\'Helvetica\', sans-serif',
          fontSize: 14,
          marginBottom: 10,
          userSelect: 'none',
        },
      };