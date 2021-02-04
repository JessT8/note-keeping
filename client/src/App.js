import React from 'react';
import './App.css';
import './styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './components/main/home';
import LandingPage from './components/main/landingPage';
import SignIn from './components/user/signin';
import SignUp from './components/user/signup';
import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux';
import NavBar from './components/navBar/navBar';

function App(props) {
    const client = useApolloClient();
    const user = useSelector( state => state.user.user);
  return (
    <Router>
            <NavBar user={user} client={client}/>
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