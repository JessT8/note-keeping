import React from 'react';
import './error.scss';
function Error(){
    return (
        <div className="container-fluid position-fixed h-100 w-100 bg-light">
            <div className="justify-content-center">
                <div className="my-auto">
                    <div className="row pt-5">
                        <div className='col'>
                            <div className="face mx-auto">
                                <div className="eye"></div>
                                <div className="eye right"></div>
                                <div className="mouth sad"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row  h-75 pt-5">
                        <div className='col  justify-content-center'>
                            <p className="error-font text-center nunito-font">
                            Opps...Something went wrong...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default Error;