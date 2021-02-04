import React from 'react';
import './slideDrawer.css';
import { useSelector } from 'react-redux'
function SlideDrawer(props){
       const tags = useSelector( state => state.notes.tags);

       let tagFilterClass = "tag-filter"
       if(props.filterTag === ''){
            tagFilterClass = "currentTag"
       }
       return(
          <>
          {props.show ?
            <div className="side-drawer col-3">
            <hr/>
             <a href="\\" className={tagFilterClass} onClick={(e)=>{
                    e.preventDefault();
                    if(props.filterTag !==""){
                    props.filterNotes("");}}}>
                    <h4 className="ml-3 mb-3">All</h4>
            </a>
             <h4 className="ml-3 mb-3">Tags</h4>
             {tags.map((tag , i) =>{
                let tagClass = "tag-filter";
                if(props.filterTag === tag.name){
                    tagClass = "currentTag"
                }
                return (<a key={i} href="\\" className={tagClass} onClick={(e)=>{
                    e.preventDefault();
                    if(props.filterTag !== tag.name){
                        props.filterNotes(tag.name);
                    }
                }}><p className="ml-3 mb-2" >{tag.name}</p></a>)}
             )}</div>:''}
          </>)
}

export default SlideDrawer;