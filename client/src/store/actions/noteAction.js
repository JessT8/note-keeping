import * as actions from "./actionTypes";
import * as queries from '../../query/query';
import { client } from '../../apolloClient';

export const getNotes = () => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    client.query({
        query: queries.NOTES
    }).then(results=>{
        dispatch({
            type:actions.GET_NOTES,
            payload:
            {
                notes: results.data.notes,
                isLoading: false
            }
      });
    });
}

export const addNote =  ( noteInput) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.ADD_NOTE,
        variables: noteInput
    }).then(results=>{
        dispatch({
            type:actions.ADD_NOTE,
            payload: {id:results.data.createNote.id, ...noteInput.noteInput, tags:[], pin:false}
      });
    });
}

export const updateNote = (noteInput) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.UPDATE_NOTE,
        variables: noteInput
    }).then(results=>{
        dispatch({
            type:actions.UPDATE_NOTE,
            payload: {id:results.data.createNote.id, ...noteInput.noteInput, tags:[], pin:false}
      });
    });
}
export const deleteNote = (id) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.DELETE_NOTE,
        variables: {id : parseInt(id)}
    }).then(()=>{
        dispatch({
            type:actions.DELETE_NOTE,
            payload: {id}
      });
    });
}
export const loading = (state) => {
    return {...state, isLoading: true}
}