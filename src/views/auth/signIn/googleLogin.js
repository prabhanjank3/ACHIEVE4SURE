import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import { gapi } from 'gapi-script';
import {authenticateUser} from 'reduxf/actions/authactions';
import { useDispatch } from "react-redux";
import '../auth.css';

export default function App() {
  const [loginStatus] = useState(false);
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const dispatch = useDispatch();
    const responseGoogle =  response => {
    const usrData = {
        firstname: response.profileObj.givenName,
        lastname: response.profileObj.familyName,
        email: response.profileObj.email,
        token:response.tokenId,
        imageUrl: response.profileObj.imageUrl
        }
        dispatch(authenticateUser(usrData));
  };
  const responseGoogleFailure =  response => {
    
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);
  return (
    <div >
      {!loginStatus && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={renderProps => (
            <GoogleButton className="google-login-btn"  onClick={renderProps.onClick} >Sign in with Google</GoogleButton>
          )}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </div>
  );
}
