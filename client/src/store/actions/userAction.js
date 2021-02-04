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
                    signedIn:true,
                    error: '',
                }
            })
    }).catch(()=>{
        dispatch({
            type: actions.ERROR,
            payload:{
                error: 'SIGNIN_ERROR',
            }
        })
    })
}

export const signUp = (userInput) => async (dispatch)=>{
    dispatch({
        type: actions.LOADING,
    });
    client.mutate({
        mutation: queries.SIGN_UP,
        variables: userInput.variables
    }).then(results=>{
            localStorage.setItem("token",  results.data.signUp);
            dispatch({
                type:actions.SIGN_UP,
                payload:
                {
                    user:userInput.variables.userInput.username,
                    error: '',
                    signedIn:true
                }
            })
    }).catch((err)=>{
        console.log(err);
        dispatch({
            type: actions.ERROR,
            payload:{
                error: 'SIGNUP_ERROR',
            }
        })
    })
}

export const signOut = () => (dispatch)=>{
    dispatch({
        type:actions.SIGN_OUT,
        payload:
        {
            user:'',
            loading:false,
            signedIn:false,
            error:''
        }
  });
}