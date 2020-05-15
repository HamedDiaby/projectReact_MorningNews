import React, { useState, useEffect } from 'react';
import './App.css';
import {Input ,Button ,Alert} from 'antd';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


function ScreenHome(props) {

  const[signUpUsername, setSignUpUsername] = useState('');
  const[signUpEmail, setSignUpEmail] = useState('');
  const[signUpPassword, setSignUpPassword] = useState('');
  const[signInEmail, setSignInEmail] = useState('');
  const[signInPassword, setSignInPassword] = useState('');
  const[signUpStatus, setSignUpStatus] = useState(false);
  const[userData, setUserData] = useState({});
  const[errorSignIn, setErrorSignIn] = useState('');
  const[errorSignUp, setErrorSignUp] = useState('');

  var handleSubmitSignIn = async ()=> {
    if(signInEmail != '' && signInPassword != ''){
      var rawResponse = await fetch('/sign-in', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `email=${signInEmail}&password=${signInPassword}`
      });
      var response = await rawResponse.json();
      if(response != null){
        setUserData(response);
        setSignUpStatus(true);
        props.savesToken(response);
      } else {
        setErrorSignIn('Mot de passe ou email incorrect !');
      }
    } else {
      setErrorSignIn('Les champs de saisis ne vdoivent pas etre vides !');
    }
  }

  var handleSubmitSignUp = async ()=>{
    if(signUpUsername != '' && signUpEmail != '' && signUpPassword != ''){
      var rawResponse = await fetch('/sign-up', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `userName=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
      });
      var response = await rawResponse.json();
      if(response != null){
        setUserData(response);
        setSignUpStatus(true);
        props.savesToken(response);
      } else {
        setErrorSignUp('Un autre compte est déjà associé à cet email !')
      }
    } else {
      setErrorSignUp('Les champs de saisis ne doivent pas etre vides !');
    }
  }

  if(signUpStatus == true){
    return (
      <Redirect to='/screen_source' />
    );
  } else {

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                  {errorSignIn == '' ? null : <Alert message={errorSignIn} type="error" showIcon />}
                  
                  <Input className="Login-input" placeholder="arthur@lacapsule.com"
                    onChange={ (e)=> setSignInEmail(e.target.value) }
                    value={signInEmail}
                  />

                  <Input.Password className="Login-input" placeholder="password"
                    onChange={ (e)=> setSignInPassword(e.target.value) }
                    value={signInPassword}
                  />
            

            <Button style={{width:'80px'}} type="primary" onClick={ ()=> handleSubmitSignIn() }>
              Sign-in
            </Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  {errorSignUp == '' ? null : <Alert message={errorSignUp} type="error" showIcon />}
                  
                  <Input className="Login-input" placeholder="Arthur G"
                    onChange={ (e)=> setSignUpUsername(e.target.value) }
                    value={signUpUsername}
                  />

                  <Input className="Login-input" placeholder="arthur@lacapsule.com"
                    onChange={ (e)=> setSignUpEmail(e.target.value) }
                    value={signUpEmail}
                  />

                  <Input.Password className="Login-input" placeholder="password"
                    onChange={ (e)=> setSignUpPassword(e.target.value) }
                    value={signUpPassword}
                  />
            

            <Button onClick={ ()=> handleSubmitSignUp()}  style={{width:'80px'}} type="primary">
              Sign-up
            </Button>

          </div>

      </div>
  );
  }
}

function savedUserToken(dispatch){
  return {
    savesToken: function(token) {
      dispatch( {type: 'userToken', actionUserToken: token} );
    }
  }
}

export default connect(
  null,
  savedUserToken
)(ScreenHome);
