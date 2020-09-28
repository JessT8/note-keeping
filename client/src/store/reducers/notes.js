import * as actionTypes from "../actions/actionTypes";
import * as noteActions from '../actions/noteAction';

let initialState = {
    notes: [],
    isLoading: true
}
export default function noteReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.LOADING:
            return noteActions.loading(state);
        case actionTypes.UPDATE_NOTE:
            return ({...state ={
                    notes:[...state.notes, action.payload],
                    isLoading:false}
                });
        case actionTypes.GET_NOTES:
            return ({...state} = action.payload);
        case actionTypes.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
                isLoading:false
            };
        default:
            return state;
    }
}