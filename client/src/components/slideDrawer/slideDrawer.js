import React from 'react'
import './slideDrawer.css'
function SlideDrawer(props){
       let tags = []
       props.notes.forEach((note)=>{
            tags = tags.concat(note.tags);
       })
       let filteredTags = tags.filter((tag,i,arr)=> arr.indexOf(tag) === i).sort((a,b)=>{
            let str1 = a.name;
            let str2 = b.name;
                if(str1.toLowerCase() !== str2.toLowerCase()) {
                    str1 = str1.toLowerCase();
                    str2 = str2.toLowerCase();
                }
                return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);
        });

       return(
          <>
          {props.show ?
            <div className="side-drawer col-3">
            <hr/>
             <a href="\\" className="tag-filter" onClick={(e)=>{
                    e.preventDefault();
                    props.filterNotes("");}}>
                    <h4 className="ml-3 mb-3">All</h4>
            </a>
             <h4 className="ml-3 mb-3">Tags</h4>
             {filteredTags.map((tag , i) =>(
                <a key={i} href="\\" className="tag-filter" onClick={(e)=>{
                    e.preventDefault();
                    props.filterNotes(tag.name);
                }}><p className="ml-3 mb-2" >{tag.name}</p></a>
             ))}</div>:''}
          </>)
}

export default SlideDrawer;