import React from 'react';
import './App.css';
import './styles.scss';

function LandingPage() {
  return (
    <div className="container-fluid position-fixed h-100 w-100 bg-light">
        <div className="row justify-content-center h-75 fade-in">
            <div className="my-auto">
                <p className="big-font text-center cinzel-font">Write your notes!</p>
                <h4 className="text-center">A quick and easy way for you to access all your notes</h4>
                <div className="text-right pt-5 started-font"><a  href="/signin">Get Started &rarr;</a></div>
            </div>

        </div>
        <div className="row justify-content-center fade-in">

        </div>
    </div>
  );
}

export default LandingPage;