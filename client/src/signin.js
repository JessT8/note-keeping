import React, { useState, useEffect } from 'react';
import './App.css';
import { gql, useLazyQuery} from '@apollo/client';
import { useHistory } from "react-router-dom";

const SIGN_IN = gql`query SignIn($userInput: UserInput!){
        signIn(userInput: $userInput)
  }`;

function SignIn() {
    const [values, setValues] = useState({username:'', password:'', success:false});
    const history = useHistory();
    const  [getUser]= useLazyQuery(SIGN_IN, {
        onCompleted:(data)=>{
            setValues({...values,data})
        }
    });
    useEffect(()=>{
        if(values.data){
            localStorage.setItem("token",  values.data.signIn);
            history.push('/');
        }
    },[values])
  return (
    <div className="container">
        <form>
            <div className="form-group">
                <label htmlFor="username">Email address</label>
                <input className="form-control"
                       id="username"
                       placeholder="Username"
                       value={values.username}
                       onChange={e=>{setValues({...values,"username":e.target.value})}}
                       />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password"
                       className="form-control"
                       id="password"
                       name="password"
                       placeholder="Password"
                       value={values.password}
                       onChange={e=>{setValues({...values,"password":e.target.value})}}
                />
            </div>
            <button type="submit"
                    className="btn btn-primary"
                    onClick={(e)=>{
                        e.preventDefault();
                         getUser({variables:{userInput:{username:values.username, password:values.password}}})
                     }
                    }
                    >
                    Sign in
            </button>
        </form>
    </div>
  );
}

export default SignIn;