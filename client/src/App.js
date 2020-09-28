import React , { useState }from 'react';
import './App.css';
import './styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './home';
import LandingPage from './landingPage';
import SignIn from './components/user/signin';
import SignUp from './components/user/signup';
import Error from './components/error/error';
import { useApolloClient } from '@apollo/client'

function App(props) {
   const [user, setUser] = useState({token:localStorage.getItem('token'), username:localStorage.getItem('user')});
   const client = useApolloClient();
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
                      {!user.token ?
                      <Link className="nunito-font navLink text-white"
                            to="/signin">Sign in</Link> :
                      <button className="button-link navLink nunito-font text-white"
                         onClick={()=> {
                                localStorage.clear();
                                setUser({token:"", username:""});
                                client.clearStore();
                            }}>
                            Sign Out</button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
            <Switch>
                <Route exact path="/">
                    { user.token ? <Home props={props} client={client}/>  : <LandingPage/> }
                </Route>
                <Route exact path="/signin">
                 {!user.token ?
                    <SignIn setUser = {(values)=>{
                        setUser(values);
                    }}/> : <Redirect exact from='/signin' to='/'/>}
                </Route>
                <Route exact path="/signup">
                   {!user.token ? <SignUp /> : <Redirect exact from='/signup' to='/'/>}
                </Route>
                <Route exact path="/error">
                    <Error />
                </Route>
                {/* <Route path="*">
                    <NotFound />
                </Route>*/}
            </Switch>
    </Router>
  );
}


export default App;