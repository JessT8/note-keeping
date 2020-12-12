import * as actions from "./actionTypes";
import * as queries from '../../query/query';
import { client } from '../../apolloClient';

export const signIn = (userInput) => async (dispatch)=>{
    dispatch({
        type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.SIGN_IN,
        variables: userInput.variables
    }).then(results=>{
            localStorage.setItem("token",  results.data.signIn);
            dispatch({
                type:actions.SIGN_IN,
                payload:
                {
                    user:userInput.variables.userInput.username,
                    error: false,
                    signedIn:true
                }
            })
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                error: true
            }
        })
    })
}

export const signUp = (userInput) => async (dispatch)=>{
    dispatch({
        type:actions.SIGN_UP,
        payload:
        {
            user:userInput.username,
            loading:false,
        }
  });
}

export const signOut = () => (dispatch)=>{
    dispatch({
        type:actions.SIGN_OUT,
        payload:
        {
            user:'',
            loading:false,
            signedIn:false
        }
  });
}