import * as actionTypes from "../actions/actionTypes";
import * as noteActions from '../actions/noteAction';

let initialState = {
    notes: [],
    isLoading: true,
    error: '',
    tags: [],
}
export default function noteReducer(state = initialState, action){
    let notes, note, tagFound, tags;
    switch(action.type){
        case actionTypes.LOADING:
            return noteActions.loading(state);
        case actionTypes.GET_NOTES:
            return {...state = action.payload }
        case actionTypes.ADD_NOTE:
            return {
                ...state,
                notes:[action.payload.note, ...state.notes],
                isLoading:false,
                error:''
            }
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
            notes = state.notes.filter((note) => note.id !== action.payload.id);
            return {
                ...state,
                tags: noteActions.getUniqueTags(notes),
                notes,
                isLoading: false,
                error: '',
            };
        case actionTypes.REMOVE_TAG:
            note = state.notes.find( ele => ele.id === action.payload.id);
            let tagCount = 0;
            notes = state.notes.map((n)=> {
                if(n.tags.some(tag=> tag.name === action.payload.name)){
                    tagCount+=1;
                }
                if(n.id === note.id){
                    let noteCopy = {...n};
                    noteCopy.tags = noteCopy.tags.filter((t)=>t.name!==action.payload.name);
                    return noteCopy;
                }
                return n;
            })
            tags = (tagCount <= 1) ? state.tags.filter((t)=>t.name!==action.payload.name) : state.tags;

            return {
                ...state,
                notes,
                tags,
                isLoading:false,
                error: ''
            };
        case actionTypes.ADD_TAG:
            note = state.notes.find( ele => ele.id === action.payload.id);
            tagFound = false;
            notes = state.notes.map((n)=> {
                if(n.tags.indexOf(action.payload.tag)){
                    tagFound = true;
                }
                if(n.id === note.id){
                    let noteCopy = {...n};
                    noteCopy.tags = [...noteCopy.tags, action.payload.tag]
                    return noteCopy;
                }
                return n;
            })
            tags = tagFound ? noteActions.getUniqueTags(notes) : state.tags;
            return {
                ...state,
                notes,
                tags,
                isLoading:false,
                error:''
            };
         case actionTypes.ERROR:
            return { ...state = action.payload}
        default:
            return state;
    }
}