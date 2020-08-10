import React, { useState } from 'react';
import './App.css';
import { gql, useMutation} from '@apollo/client';

const SIGN_UP = gql`mutation SignUp($userInput: UserInput!){
        signUp(userInput: $userInput)
  }`;

function SignUp() {
    const [signup ]= useMutation(SIGN_UP);
    const [values, setValues] = useState({username:'', password:''});
  return (
    <div className="container">
        <h3>Sign Up</h3>
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
                         signup({variables:{userInput:{username:values.username, password:values.password}}})}
                    }
                    >
                    Sign up
            </button>
        </form>
    </div>
  );
}

export default SignUp;