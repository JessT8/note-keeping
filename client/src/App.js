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
import Home from './home'

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light mb-3" id="navBar">
            <Link className="navbar-brand"  to="/">Notekeeper</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mr-2" >
                        <Link className="navLink" to="/">Home</Link>
                    </li>
                    <li className="nav-item mr-2">
                        <Link className="navLink"to="/signin">Signin</Link>
                    </li>
                </ul>
            </div>
        </nav>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/signin">
                    <Signin />
                </Route>
            </Switch>
    </Router>
  );
}

function Signin() {
  return (
    <div>
      <h2>Signin</h2>
    </div>
  );
}

export default App;