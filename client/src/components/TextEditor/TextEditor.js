import React from 'react'
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, Entity} from 'draft-js'
import createStyles from 'draft-js-custom-styles';
import './TextEditor.css';
import OptionControls from './OptionControls';
import {decorator } from './LinkDecorator';
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])

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