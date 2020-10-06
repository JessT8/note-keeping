import * as actionTypes from "../actions/actionTypes";
import * as noteActions from '../actions/noteAction';

let initialState = {
    notes: [],
    isLoading: true,
    error: false,
}
export default function noteReducer(state = initialState, action){
    let notes, note;
    switch(action.type){
        case actionTypes.LOADING:
            return noteActions.loading(state);
        case actionTypes.GET_NOTES:
            return ({...state} = action.payload);
        case actionTypes.ADD_NOTE:
            return ({...state ={
                    notes:[...state.notes, action.payload],
                    isLoading:false}
                });
        case actionTypes.UPDATE_NOTE:
            notes =  state.notes.map((note) => {
                if(note.id === action.payload.id){
                    return ({...note}=action.payload);
                }
                return note;
            });
            return {
                ...state,
                notes,
                isLoading:false
            }
        case actionTypes.DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
                isLoading:false
            };
        case actionTypes.REMOVE_TAG:
            note = state.notes.find( ele => ele.id === action.payload.id);
            notes = state.notes.map((n)=> {
                if(n.id === note.id){
                    let noteCopy = {...n};
                    noteCopy.tags = noteCopy.tags.filter((t)=>t.name!==action.payload.name);
                    return noteCopy;
                }
                return n;
            })
            return {
                ...state,
                notes,
                isLoading:false
            };
        case actionTypes.ADD_TAG:
            note = state.notes.find( ele => ele.id === action.payload.id);
            notes = state.notes.map((n)=> {
                if(n.id === note.id){
                    let noteCopy = {...n};
                    noteCopy.tags = [...noteCopy.tags, action.payload.tag]
                    return noteCopy;
                }
                return n;
            })
            return {
                ...state,
                notes,
                isLoading:false
            };
         case actionTypes.ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}