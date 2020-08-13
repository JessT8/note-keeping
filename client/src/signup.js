import React, { useState } from 'react';
import './App.css';
import { gql, useMutation} from '@apollo/client';
import { useHistory } from "react-router-dom";

const SIGN_UP = gql`mutation SignUp($userInput: UserInput!){
        signUp(userInput: $userInput)
  }`;

function SignUp(props) {
    const [signup ]= useMutation(SIGN_UP);
    const [values, setValues] = useState({username:'', password:''});
     const history = useHistory();
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
                        signup({variables:{userInput:{username:values.username, password:values.password}}})
                         history.push("/");
                    }
                    }
                >
                    Sign up
            </button>
        </form>
    </div>
  );
}

export default SignUp;