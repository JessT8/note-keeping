import React , {useEffect, useState}from "react";
import {Editor, EditorState, convertToRaw, convertFromRaw }from 'draft-js'
import createStyles from 'draft-js-custom-styles';
import {decorator } from './LinkDecorator';
import MediaBlock from './MediaBlock';

const {customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])

function TextConverter(props){
    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    function getText(){
       const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
       const mappedBlocks = blocks.map(
          block => (!block.text.trim() && "\n") || block.text
        );

        let newText = "";
        for (let i = 0; i < mappedBlocks.length; i++) {
          const block = mappedBlocks[i];
          if (i === mappedBlocks.length - 1) {
            newText += block;
          } else {
            if (block === "\n") newText += block;
            else newText += block + "\n";
          }
        }
        const lines = newText.split('\n')
        const firstLine = lines[0].trim() + '...';
        return firstLine;
    }
    useEffect(()=>{
        const data = JSON.parse(JSON.parse(props.description));
        const contentState = convertFromRaw(data);
        let editorState = EditorState.createWithContent(contentState, decorator);
        setEditorState(editorState);
    },[props.description]);

    function blockStyleFn(block) {
        switch (block.getType()) {
            case 'TEXT-CENTER':
                return 'align-center';
            case 'TEXT-RIGHT':
                return 'align-right';
            default:
                return null;
        }
    }
    return (
      <div>
        {props.format ? <Editor editorState={editorState} readOnly={true}  customStyleFn={customStyleFn} blockRendererFn={MediaBlock} blockStyleFn={blockStyleFn}/> : getText()}
      </div>
    );
}

export default TextConverter;