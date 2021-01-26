import React from 'react';
import './App.css';
import './styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './components/main/home';
import LandingPage from './components/main/landingPage';
import SignIn from './components/user/signin';
import SignUp from './components/user/signup';
import { useApolloClient } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from './store/actions/userAction';

function App(props) {
    const client = useApolloClient();
    const dispatch = useDispatch();
    const user = useSelector( state => state.user.user);
  return (
    <Router>
        <nav className="fixed-top navbar navbar-expand-lg bg-dark navbar-dark" id="navBar">
            <Link className="navbar-brand cinzel-font pl-5" to="/">Notekeeper</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ml-3" >
                        <Link className="nunito-font navLink text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item ml-3">
                      {(!localStorage.getItem('token') && !user)?
                      <Link className="nunito-font navLink text-white"
                            to="/signin">Sign in</Link> :
                      <button className="button-link navLink nunito-font text-white"
                         onClick={()=> {
                                localStorage.clear();
                                client.clearStore();
                                dispatch(signOut());
                            }}>
                            Sign Out</button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
            <Switch>
                <Route exact path="/">
                    { (localStorage.getItem('token') || user) ? <Home props={props} client={client}/>  : <LandingPage/> }
                </Route>
                <Route exact path="/signin">
                 {!localStorage.getItem('token') ?
                    <SignIn /> : <Redirect exact from='/signin' to='/'/>}
                </Route>
                <Route exact path="/signup">
                   {!localStorage.getItem('token') ? <SignUp /> : <Redirect exact from='/signup' to='/'/>}
                </Route>
            </Switch>
    </Router>
  );
}


export default App;