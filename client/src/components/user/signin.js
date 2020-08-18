import React, { useState, useEffect } from 'react';
import '../../App.css';
import { gql, useLazyQuery} from '@apollo/client';
import { useHistory } from "react-router-dom";

const SIGN_IN = gql`query SignIn($userInput: UserInput!){
        signIn(userInput: $userInput)
  }`;

function SignIn(props) {
    const [values, setValues] = useState({username:'', password:''});
     const [error, setError] = useState("");
    const history = useHistory();
    const  [getUser]= useLazyQuery(SIGN_IN, {
        onCompleted:(data)=>{
            setValues({...values,data})
        },
        onError:(data)=>{
            setError(true);
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
    const errorMessage = error ? (<div className="alert alert-danger" role="alert">The username or password is invalid</div>): "";
  return (
       <div className="container-fluid position-fixed h-100 w-100 bg-light">
            <div className="row h-75 justify-content-center">
                <div className="col-5 rounded border  pt-4 pb-5 pl-5 pr-5 mt-5 bg-white my-auto">
                    <form>
                        <div className="text-center mb-4">
                            <h2 className="nunito-font">Sign In</h2>
                        </div>
                        {errorMessage}

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
                                        if(values.username && values.password){
                                         getUser({variables:{userInput:{username:values.username, password:values.password}}})
                                        }else{
                                            setError(true);
                                        }
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