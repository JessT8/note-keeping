import * as actionTypes from "../actions/actionTypes";
import * as noteActions from '../actions/noteAction';

let initialState = {
    notes: [],
    isLoading: true,
    error: null,
    refresh: false,
    tags: [],
}
export default function noteReducer(state = initialState, action){
    let notes, note, tagFound, tags;
    let additionalState =  action.payload;
    switch(action.type){
        case actionTypes.LOADING:
            return noteActions.loading(state);
        case actionTypes.GET_NOTES:
            return {...state,
                    ...additionalState
                };
        case actionTypes.ADD_NOTE:
            return {...state,
                    notes:[action.payload, ...state.notes],
                    isLoading:false,
                    error:null
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
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== action.payload.id),
                isLoading:false
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
            tags = state.tags;
            if(tagCount <= 1){
                tags =  state.tags.filter((t)=>t.name!==action.payload.name)
            }
            return {
                ...state,
                notes,
                tags,
                isLoading:false
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
            tags = state.tags;
            if(tagFound){
                tags = noteActions.getUniqueTags(notes);
            }
            return {
                ...state,
                notes,
                tags,
                isLoading:false
            };
         case actionTypes.ERROR:
                 console.log('error', state);
            return {
                ...state,
                ...additionalState
            };
        case actionTypes.REFRESH:
            return {
                ...state,
                refresh: additionalState.refresh,
                error: additionalState.error
            };
        default:
            return state;
    }
}