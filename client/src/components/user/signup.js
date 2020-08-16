import React, { useState } from 'react';
import '../../App.css';
import { gql, useMutation} from '@apollo/client';
import { useHistory } from "react-router-dom";

const SIGN_UP = gql`mutation SignUp($userInput: UserInput!){
        signUp(userInput: $userInput)
  }`;

function SignUp() {
    const [signup ]= useMutation(SIGN_UP);
    const [values, setValues] = useState({username:'', password:''});
     const history = useHistory();
  return (
    <div className="container-fluid position-fixed h-100 w-100 bg-light">
        <div className="row justify-content-center">
            <div className="col-5 rounded border p-5 mt-5 bg-white fade-in">
                <form>
                    <div className="text-center mb-4">
                        <h3>Register</h3>
                    </div>
                    <div className="form-group">
                        <input className="form-control"
                               id="username"
                               placeholder="Username"
                               value={values.username}
                               onChange={e=>{setValues({...values,"username":e.target.value})}}
                               />
                    </div>
                    <div className="form-group">
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
                    <hr/>
                    <div className="text-center mb-4">
                        <p className="text-muted">Already have an account? Click <a href="/signin">here</a> to login</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default SignUp;