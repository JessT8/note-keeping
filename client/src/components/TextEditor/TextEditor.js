import React, {useState, useRef, useEffect} from 'react'
import {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw, Entity, AtomicBlockUtils} from 'draft-js'
import createStyles from 'draft-js-custom-styles';
import './TextEditor.css';
import OptionControls from './OptionControls';
import {decorator } from './LinkDecorator';
import MediaBlock from './MediaBlock';
import Modal from '../modal/modal';
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration', 'text-align'])

function TextEditor (props){
    const [getData, setData] = useState(true);
    const [addLink, setAddLink] = useState({value:'', completed:true, toggleModal:false, action:''});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [selectionState, setSelectionState] = useState(null);
    const editor = useRef(null);
    const focus = () =>{editor.current.focus();}
    const onChange = (editorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        props.onChange(JSON.stringify(convertToRaw(contentState)));
    };
    useEffect(()=>{
        if(props.edit && getData){
                const data = JSON.parse(JSON.parse(props.description));
                const contentState = convertFromRaw(data);
                const editorState = EditorState.createWithContent(contentState, decorator);
                setEditorState(editorState);
                setData(false);
        }
    },[getData, props])

    useEffect(()=>{
        if(addLink.value !== '' && addLink.completed){
            if(addLink.action === 'Add Link'){
                const entity = Entity.create("LINK", "MUTABLE", {
                    url: addLink.value
                });
                const newEditorState = RichUtils.toggleLink(editorState, selectionState, entity);
                setEditorState(newEditorState);
                setAddLink({...addLink, completed:false, value:'', action:  '' });
            }else if(addLink.action === 'Add Image Link'){
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity(
                       "image",
                       "IMMUTABLE",
                       { src: addLink.value }
                    );
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(
                    editorState,
                    { currentContent: contentStateWithEntity },
                    "create-entity"
                );
                setEditorState(AtomicBlockUtils.insertAtomicBlock(
                    newEditorState,
                    entityKey,
                    " "));
                setAddLink({...addLink, completed:false, value:'', action:  'Focus' });
            }
        }
        if(editor.current !== document.activeElement && addLink.action === 'Focus'){
                    focus();
        }

    },[ addLink , editorState, selectionState]);
    const clear = () => {
        const selection = editorState.getSelection()
        const contentState = editorState.getCurrentContent()
        const styles = editorState.getCurrentInlineStyle()

        const removeStyles = styles.reduce((state, style) => {
          return Modifier.removeInlineStyle(state, selection, style) }, contentState)

        const removeBlock = Modifier.setBlockType(removeStyles, selection, 'unstyled')

       setEditorState(EditorState.push(editorState,removeBlock));
    }
    const blockStyleFn = (block)=> {
        switch (block.getType()) {
            case 'TEXT-CENTER':
                return 'align-center';
            case 'TEXT-RIGHT':
                return 'align-right';
            default:
                return null;
        }
    }
    const onToggle = ( value, type )=>{
        if( type === 'link'){
            const selectionState = editorState.getSelection();
            setSelectionState(selectionState);
            setAddLink({...addLink, toggleModal:true, completed:false, action: "Add Link"});
            return;
        }
        if(type === 'image'){
            setAddLink({...addLink, toggleModal:true, completed:false, action: "Add Image Link"});
            return;
        }
        if(type==='align'){
            onChange(RichUtils.toggleBlockType(editorState, value));
            return;
        }
        if( type=== 'fontSize'){
            onChange(styles.fontSize.toggle(editorState, value));
            return;
        }
        if(type === 'block'){
            onChange(RichUtils.toggleBlockType(editorState, value));
           return;
        }
        if( type === 'inline' ){
            onChange(RichUtils.toggleInlineStyle(editorState, value));
            return;
        }
        if( type === 'clear' ){
            const properties = ['fontStyle', 'fontWeight', 'textDecoration' ];
           let newEditorState = editorState;
            properties.forEach(p =>{
                newEditorState = styles[p].remove(newEditorState);
            });
            clear(newEditorState);
            return;
        }
    }
            return (
                <>
                    <div className='textbox-container'>
                        <div className='flex-center container-fluid'>
                            <OptionControls
                                editorState={editorState}
                                onToggle={onToggle}
                            />
                        </div>
                        <div className='textbox-editor' onClick={focus}>
                            <Editor
                              editorState={editorState}
                              onChange={onChange}
                              placeholder="Write your notes here..."
                              ref={editor}
                              customStyleFn={customStyleFn}
                              blockStyleFn={blockStyleFn}
                              blockRendererFn={MediaBlock}
                              stripPastedStyles={true}
                              handleKeyCommand={(command) => {
                                  let newState = RichUtils.handleKeyCommand(editorState, command)
                                  if (newState) {
                                    onChange(newState)
                                    return "handled"
                                  }
                                  return "not-handled"
                                }}
                            />
                        </div>
                    </div>
                    {addLink.toggleModal && <Modal>
                    <button className="close"
                            onClick={()=>{
                                setAddLink({...addLink, value:'', toggleModal:false, action:  ''})
                            }}>
                            &#10005;
                    </button>
                    <h3 className="text-center pb-3">{addLink.action}</h3>
                    <div className="form-group ">
                        <input className="form-control"
                               value={addLink.value}
                               onChange={(e)=>{
                                    setAddLink({...addLink, value:e.target.value});
                                }}
                        />
                    </div>
                    <button className="btn btn-primary"
                            onClick={()=>{
                                setAddLink({...addLink, completed:true, toggleModal:false});
                            }}
                            >Add Link</button>
                    </Modal>}
                </>);
            }

export default TextEditor;