import React, { useState } from 'react';
import './App.css';
import { gql, useLazyQuery} from '@apollo/client';

const SIGN_IN = gql`query SignIn($userInput: UserInput!){
        signIn(userInput: $userInput)
  }`;

function SignIn() {
    const  [getUser]= useLazyQuery(SIGN_IN);
    const [values, setValues] = useState({username:'', password:''});
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
                         getUser({variables:{userInput:{username:values.username, password:values.password}}})}
                    }
                    >
                    Sign in
            </button>
        </form>
    </div>
  );
}

export default SignIn;