import React , { useState }from 'react';
import './App.css';
import './styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './home';
import LandingPage from './landingPage';
import SignIn from './components/user/signin';
import SignUp from './components/user/signup';

function App() {
   const [user, setUser] = useState({token:localStorage.getItem('token'), username:localStorage.getItem('user')})
  return (
    <Router>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="navBar">
            <Link className="navbar-brand cinzel-font pl-5"  to="/">Notekeeper</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" >
                        <Link className="nunito-font navLink text-white" to="/">Home</Link>
                    </li>
                    <li className="text-white ml-3 mr-3"> |
                    </li>
                    <li className="nav-item">
                      {!user.token ?
                      <Link className="nunito-font navLink text-white"
                            to="/signin">Sign in</Link> :
                      <button className="button-link navLink nunito-font text-white"
                         onClick={()=> {
                                localStorage.clear();
                                setUser({token:"", username:""});
                                window.location.href = '/';
                            }}>
                            Sign Out</button>
                        }
                    </li>

                </ul>
            </div>
        </nav>
            <Switch>
                <Route exact path="/">
                    { user.token ? <Home />  : <LandingPage/> }

                </Route>
                <Route path="/signin">
                    <SignIn setUser = {(values)=>{
                        setUser(values);

                    }}/>
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
    </Router>
  );
}



export default App;