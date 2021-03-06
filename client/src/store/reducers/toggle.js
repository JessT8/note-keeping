import * as actionTypes from "../actions/actionTypes";

let initialState = {
    toggleNote: '',
    toggleAddTag: '',
    toggleError: false
}
export default function toggleReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.TOGGLE_NOTE:
            return ({...state} = action.payload);
        case actionTypes.TOGGLE_ADD_TAG:
            return ({...state} = action.payload);
        case actionTypes.TOGGLE_ERROR:
            return ({...state} = action.payload);
        default:
            return state;
    }
}