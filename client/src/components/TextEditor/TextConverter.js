import React from "react";
import Draft from 'draft-js'
import createStyles from 'draft-js-custom-styles';
const {Editor, EditorState, Modifier, RichUtils, ContentState, convertToRaw, convertFromRaw, CompositeDecorator} = Draft;
const {styles, customStyleFn} = createStyles(['font-size', 'font-style', 'font-weight', 'text-decoration'])


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
    <a href={url} target='_blank'>
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

class TextConverter extends React.Component {
    constructor(props) {
        super(props);
        this.state={
         editorState: EditorState.createEmpty()
        }
    }
    getText(editorState){
       const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
       const mappedBlocks = blocks.map(
          block => (!block.text.trim() && "\n") || block.text
        );

        let newText = "";
        for (let i = 0; i < mappedBlocks.length; i++) {
          const block = mappedBlocks[i];

          // handle last block
          if (i === mappedBlocks.length - 1) {
            newText += block;
          } else {
            // otherwise we join with \n, except if the block is already a \n
            if (block === "\n") newText += block;
            else newText += block + "\n";
          }
        }
        const lines = newText.split('\n')
        const firstLine = lines[0].trim() + '...';
        return firstLine;
    }
    componentDidMount(){
        const data = JSON.parse(JSON.parse(this.props.description));
        const contentState = convertFromRaw(data);
        let editorState = EditorState.createWithContent(contentState, decorator);
        this.setState({ editorState });
    }
  render() {
    return (
      <div className="App">
        {this.props.format ? <Editor editorState={this.state.editorState} readOnly={true}  customStyleFn={customStyleFn}/> : this.getText(this.state.editorState)}
      </div>
    );
  }
}

export default TextConverter;