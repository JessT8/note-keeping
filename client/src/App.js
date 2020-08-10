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
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand"  to="/">Notekeeper</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mr-2" >
                        <Link to="/">Home</Link>
                    </li>
                    <li class="nav-item mr-2">
                        <Link to="/signin">Signin</Link>
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