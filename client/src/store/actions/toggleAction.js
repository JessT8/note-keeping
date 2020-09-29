import * as actions from "./actionTypes";

export const toggleNote = (toggleNote) =>(dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote,
            toggleAddTag: false
        }
  });
}

export const toggleAddTag = (toggleAddTag) =>(dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote: false,
            toggleAddTag
        }
  });
}