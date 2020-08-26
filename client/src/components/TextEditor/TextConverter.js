import React from "react";
import Draft from 'draft-js'
import createStyles from 'draft-js-custom-styles';
const {Editor, EditorState, Modifier, RichUtils, convertToRaw, convertFromRaw} = Draft;
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])

class TextConverter extends React.Component {
  render() {
    const data = JSON.parse(JSON.parse(this.props.description));
    const contentState = convertFromRaw(data);
    const editorState = EditorState.createWithContent(contentState);
    return (
      <div className="App">
        {<Editor editorState={editorState} readOnly={true}  customStyleFn={customStyleFn}/>}
      </div>
    );
  }
}

export default TextConverter;