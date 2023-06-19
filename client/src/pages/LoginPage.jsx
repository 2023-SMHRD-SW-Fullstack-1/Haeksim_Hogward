import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import "../assets/css/login.css";


 const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    //서버에서 가져온값과 연결 
    console.log('Email:', email);
    console.log('Password:', password);
  };
   

  return (
    <div className='login-box'>
     
     <h1>WELCOME</h1>
      <form>
        <div className='user-box'>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required=""
            placeholder='Email'
          />
          
        </div>
        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required=""
            placeholder='Password'
          />
        </div>

        <div class="d-grid gap-2">
        <button type= "button" href="#" onClick={handleLogin} class="btn btn-dark btn btn-lg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
        </button>
        </div>

      </form>
      
    </div>
  )
}

export default LoginPage