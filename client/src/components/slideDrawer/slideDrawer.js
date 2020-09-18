import React from 'react'
import './slideDrawer.css'
function SlideDrawer(props){
      let drawerClasses = 'side-drawer'
       if(props.show) {
          drawerClasses = 'side-drawer open'
       }
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
          <div className={drawerClasses}>
             <h4 className="mt-5 ml-3 mb-3">Tags</h4>
             {filteredTags.map((tag , i) =>(
                <a key={i} href="\\" className="tag-filter" onClick={(e)=>{
                    e.preventDefault();
                    props.filterNotes(tag.name);
                }}><p className="ml-3 mb-2" >{tag.name}</p></a>
             ))}
          </div>)
}

export default SlideDrawer;