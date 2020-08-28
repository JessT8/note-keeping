import React from 'react'
import Draft from 'draft-js'
import createStyles from 'draft-js-custom-styles';
import './TextEditor.css';
const {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, Entity, CompositeDecorator} = Draft;
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])
//LINK
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}


const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} onClick={()=>window.prompt('Paste the link -')}>
      {props.children}
    </a>
  );
}

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

export default class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.editor = React.createRef();
        this.focus = () => {this.editor.current.focus()};
        this.onChange = (editorState) => {
        this.setState({editorState});
            const contentState = editorState.getCurrentContent();
            this.props.onChange(JSON.stringify(convertToRaw(contentState)));
        };
        this.onToggle = (value, type) => this._onToggle(value,type);
        this.onAddLink = () => this._onAddLink();
    }
    componentDidMount(){
        if(this.props.edit){
            const data = JSON.parse(JSON.parse(this.props.description));
            const contentState = convertFromRaw(data);
            const editorState = EditorState.createWithContent(contentState, decorator);
            this.onChange(editorState);
        }
    }
    _onAddLink = () => {
        const link = window.prompt('Paste the link -')
        const { editorState } = this.state;
        const selectionState = editorState.getSelection();
        const entity = Entity.create("LINK", "MUTABLE", {
            url: link
        });
        const newEditorState = RichUtils.toggleLink(editorState, selectionState, entity);
        this.onChange(newEditorState);
    }
    clear(editorState) {
        const selection = editorState.getSelection()
        const contentState = editorState.getCurrentContent()
        const styles = editorState.getCurrentInlineStyle()

        const removeStyles = styles.reduce((state, style) => {
          return Modifier.removeInlineStyle(state, selection, style) }, contentState)

        const removeBlock = Modifier.setBlockType(removeStyles, selection, 'unstyled')

       this.setState({
         editorState: EditorState.push(
           editorState,
           removeBlock
         )
       })
    }
    _onToggle( value, type ){
        const { editorState } = this.state;
        if( type === 'link'){
            this.onAddLink();
            return;
        }
        if( type === 'predefined' ){
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, value));
            return;
        }else if( type === 'initial' ){
            //for clearing
            const properties = ['fontStyle', 'fontWeight', 'textDecoration' ];
            let newEditorState = editorState;
            properties.map(p=>{
                newEditorState = styles[p].remove(newEditorState);
            });
            this.clear(newEditorState);
            return;
        }
        const selection = editorState.getSelection();
        const newEditorState = styles[type].remove(editorState);
        this.onChange(styles[type].add(newEditorState,value))
    }
    render() {
        const {editorState} = this.state;
            return (
                <div className='textbox-container'>
                    <div className='flex-center'>
                        <OptionControls
                            editorState={editorState}
                            onToggle={this.onToggle}
                        />
                    </div>
                    <div className='textbox-editor' onClick={this.focus}>
                        <Editor
                          readOnly={!this.props.edit}
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
          {label: '•', value: 'unordered-list-item', styleName:'tool-label',type:'predefined'},
          {label: 'code', value: 'code-block', styleName:'tool-label',type:'predefined'},
          {label:'U', value:'underline',styleName:'tool-label underline',type:'textDecoration'},
          {label:'B', value:'bold', styleName:'tool-label bold',type:'fontWeight'},
          {label:'I', value:'italic',styleName:'tool-label italic',type:'fontStyle'},
          {label:'abc', value:'line-through',styleName:'tool-label strikethrough', type:'textDecoration'},
          {label:'clear', value:'initial',styleName:'tool-label', type:'initial'},
          {label:'a', value:'link',styleName:'tool-label', type:'link'}
      ]

      const OptionControls = (props) => {
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