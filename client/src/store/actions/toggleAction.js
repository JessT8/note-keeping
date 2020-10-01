import * as actions from "./actionTypes";

export const toggleNote = (toggleNote) =>(dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote,
            toggleAddTag: ''
        }
  });
}

export const toggleAddTag = (toggleAddTag) =>(dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote: '',
            toggleAddTag
        }
  });
}