import React from 'react';
import {
  Route, withRouter
} from 'react-router-dom';

// import GreetingContainer from './greeting/greeting_container';
// import SessionFormContainer from './session_form/session_form_container';
import SessionFormContainer from "./session_form/session_form_container";

// import SignUpFormContainer from './signup_form/signup_form_container';
import {AuthRoute} from '../util/route_util';
import Footer from './footer';

const AuthForm = () => (
  <div className='loginbackground'>
    <div className="top-margin-80">
      <div className="centered">
        <div className='centered'>
          <div className='logo centered top-margin-30'>
            <a className="navbar-brand brand " href="#">
              <p className='brand'>Curiosity</p>
            </a>
          </div>
        </div>
        <br/>
        <div className='centered'>
        <div className="centered slogan col-xs-12">
          <div>
            <h4>
              <p>A place to share knowledge and better understand the world</p>
              <br/>
              <br/>
            </h4>
          </div>
        </div>
        </div>
        <div className="container">

          <div className="signup_login row">
            <AuthRoute path="/login" component={SessionFormContainer} />
            <AuthRoute path="/signup" component={SessionFormContainer} />


          </div>
        <hr />
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

export default withRouter(AuthForm);
