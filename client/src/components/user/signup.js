import React, { useState, useEffect } from 'react';
import '../../App.css';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from '../../store/actions/userAction';

function SignUp() {
    const [values, setValues] = useState({username:'', password:''});
    const history = useHistory();
    const dispatch = useDispatch();
    const error = useSelector( state => state.user.error);
    const signIn = useSelector( state => state.user.signedIn);

    useEffect(()=>{
        if(signIn){
            localStorage.setItem("user",  values.username);
            history.push('/');
        }
    }, [signIn, history, values.username ])
  return (
    <div className="container-fluid position-fixed h-100 w-100 bg-light">
        <div className="row h-75 justify-content-center">
            <div className="col-5 rounded border pt-4 pb-5 pl-5 pr-5 mt-5 bg-white my-auto">
                <form>
                    <div className="text-center mb-4">
                        <h2 className="nunito-font">Sign Up</h2>
                    </div>
                    {(error === 'SIGNUP_ERROR') ? <div className="alert-danger alert " role="alert">Username is taken</div>:''}
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
                               autoComplete="off"
                               value={values.password}
                               onChange={e=>{setValues({...values,"password":e.target.value})}}
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit"
                                className="btn btn-primary"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    dispatch(signUp({variables:{userInput:{username:values.username, password:values.password}}}));
                                    }
                                }
                            >
                                Sign up &rarr;
                        </button>
                    </div>
                    <hr/>
                    <div className="text-center mb-4">
                        <p className="text-muted">Already have an account? Click <a href="/signin">here</a> to sign in</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
}

export default SignUp;