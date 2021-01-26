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
            const uniqueTags = getUniqueTags(results.data.notes);
            dispatch({
                type:actions.GET_NOTES,
                payload:
                {
                    notes: results.data.notes,
                    tags: uniqueTags,
                    isLoading: false,
                }
            });
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                isLoading: false,
                error: 'Unsuccessful'
            }
        })
    })
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
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                isLoading: false,
                error: 'Unsuccessful'
            }
        })
    })
}

export const updateNote = (noteInput) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.UPDATE_NOTE,
        variables: noteInput.variables
    }).then(()=>{
        let id = noteInput.variables.id.toString();
        dispatch({
            type:actions.UPDATE_NOTE,
            payload: {id, ...noteInput.variables.noteInput}
      });
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                error:'Unsuccessful'
            }
        })
    })
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
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                error: 'Unsuccessful'
            }
        })
    });
}
export const addTag =  (input) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    const variables = { ...input.variables, noteId: parseInt(input.variables.noteId,10) };
    client.mutate({
        mutation: queries.ADD_TAG,
        variables
    }).then((result)=>{
        console.log(result);
        dispatch({
            type:actions.ADD_TAG,
            payload: {id:input.variables.noteId, tag: {name:input.variables.tagInput.name, id: input.variables.noteId} }
        });
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                isLoading: false,
                error: 'Unsuccessful'
            }
        })
    })
}
export const removeTag =  (input) => async (dispatch)=>{
    dispatch({
    type: actions.LOADING,
    });
    const variables = { ...input.variables, noteId: parseInt(input.variables.noteId,10) };
    client.mutate({
        mutation: queries.REMOVE_TAG,
        variables
    }).then(()=>{
        dispatch({
            type:actions.REMOVE_TAG,
            payload: {id:input.variables.noteId, name: input.variables.tagInput.name , isLoading: true}
        });
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                error: 'Unsuccessful',
                isLoading: false
            }
        })
    })
}
export const loading = (state) => {
    return {...state, isLoading: true}
}

export const getUniqueTags = (notes)=>{
        let tags = []
       notes.forEach((note)=>{
            tags = tags.concat(note.tags);
       });
       let unique = {}
       tags.sort((a,b)=>{
            let str1 = a.name;
            let str2 = b.name;
                if(str1.toLowerCase() !== str2.toLowerCase()) {
                    str1 = str1.toLowerCase();
                    str2 = str2.toLowerCase();
                }
                return str1 > str2 ? 1 : (str1 < str2 ? -1 : 0);
        }).forEach((tag)=> {
            if(!unique[tag.name]){
                unique[tag.name] = tag;
            }
        })
        return Object.values(unique);
}

export const refresh = () => (dispatch) => {
    dispatch({
        type: actions.REFRESH,
        payload:{
            refresh: true,
            error: null
        }
    })
}

export const setError = (error) => (dispatch) =>{
    dispatch({
        type: actions.ERROR,
        payload:{
            error
        }
    })
}