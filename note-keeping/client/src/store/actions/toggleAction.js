import * as actions from "./actionTypes";

export const toggleNote = (toggleNote) => async (dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote,
            toggleAddTag: ''
        }
  });
}

export const toggleAddTag = (toggleAddTag) => async (dispatch)=>{
    dispatch({
        type:actions.TOGGLE_NOTE,
        payload:
        {
            toggleNote: '',
            toggleAddTag
        }
  });
}

export const toggleError = (toggleError) => async (dispatch)=>{
    dispatch({
        type:actions.TOGGLE_ERROR,
        payload:
        {
            toggleNote: '',
            toggleAddTag: '',
            toggleError
        }
  });
}