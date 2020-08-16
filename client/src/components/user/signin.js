import React, { useState, useEffect } from 'react';
import '../../App.css';
import { gql, useLazyQuery} from '@apollo/client';
import { useHistory } from "react-router-dom";

const SIGN_IN = gql`query SignIn($userInput: UserInput!){
        signIn(userInput: $userInput)
  }`;

function SignIn(props) {
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
            localStorage.setItem("user",  values.username);
            props.setUser({token: values.data.signIn, user: values.username})
            history.push('/');
        }
    },[values])
  return (
       <div className="container-fluid position-fixed h-100 w-100 bg-light">
            <div className="row h-75 justify-content-center">
                <div className="col-5 rounded border p-5 bg-white fade-in my-auto">
                    <form>
                        <div className="text-center mb-4">
                            <h3>Sign In</h3>
                        </div>
                        <div className="form-group ">
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
                        <div className="text-right">
                            <button type="submit"
                                    className="btn btn-primary"
                                    onClick={(e)=>{
                                        e.preventDefault();
                                         getUser({variables:{userInput:{username:values.username, password:values.password}}})
                                     }
                                    }
                                    >
                                    Sign in &rarr;
                            </button>
                        </div>
                        <hr/>
                        <div className="text-center mb-4">
                            <p className="text-muted">Don't have an account yet? Click <a href="/signup">here</a> to register</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default SignIn;