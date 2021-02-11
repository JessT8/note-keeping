import * as actionTypes from "../actions/actionTypes";

let initialState = {
    user:'',
    loading:'',
    signedIn:false,
    error: ''
}
export default function noteReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.LOADING:
            return {...state,
                    loading:false,
                    signinError: ''}
        case actionTypes.SIGN_IN:
            return ({...state} = action.payload);
        case actionTypes.SIGN_UP:
            return ({...state} = action.payload);
        case actionTypes.SIGN_OUT:
            return ({...state} = action.payload);
        case actionTypes.ERROR:
            return ({...state} = action.payload);
        default:
            return state;
    }
}