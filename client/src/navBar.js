import React , { useState }from 'react';
import './App.css';
import './styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home'
import SignIn from './components/user/signin'
import SignUp from './components/user/signup'

function NavBar(props) {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark mb-3" id="navBar">
            <Link className="navbar-brand"  to="/">Notekeeper</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-2" >
                        <Link className="navLink text-white" to="/">Home</Link>
                    </li>

                    <li className="nav-item mr-2">
                      {!props.user.token ?
                      <Link className="navLink text-white"
                            to="/signin">Signin</Link> :
                      <a className="navLink text-white"
                         onClick={()=> {
                                localStorage.clear();
                                props.setUser({token:"", username:""});
                                window.location.href = '/';
                            }}>
                            Sign Out</a>
                        }
                    </li>)

                </ul>
            </div>
        </nav>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/signin">
                    <SignIn setUser = {(values)=>{props.setUser(values)}}/>
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
    </Router>
  );
}

export default NavBar;