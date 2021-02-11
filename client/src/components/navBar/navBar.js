import React from 'react';
import '../../App.css';
import '../../styles.scss';
import { Link } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { signOut } from '../../store/actions/userAction';
import { useHistory } from "react-router-dom";

function NavBar(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
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
                      {(!localStorage.getItem('token') && !props.user)?
                      <Link className="nunito-font navLink text-white"
                            to="/signin">Sign in</Link> :
                      <button className="button-link navLink nunito-font text-white"
                         onClick={()=> {
                                localStorage.clear();
                                props.client.clearStore();
                                dispatch(signOut());
                                history.push('/');
                            }}>
                            Sign Out</button>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;