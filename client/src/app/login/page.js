"use client"

// pages/login.js
import { useState } from 'react';
import { useAuth } from '../auth/authContext';

//next redirect library
import { useRouter } from 'next/navigation'

import "./login.css";

const Login = () => {

  const router = useRouter()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(password)

    try {
      //Make post request to endpoint with the email and password passed as json in the body
      const response = await fetch('http://localhost:3002/api/login/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      //If email and password match, login user and redirect to /admin, otherwise send an alert
      if (response.status === 200) {
        console.log("status: 200")
        auth.login(true);
        router.push('/admin')
      } else {
        alert('Improper Email or Password');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main">
      <div className="form-div">
        <div className="form-title">
          <h1>Admin Login</h1>
          <div className="line"></div>
        </div>

        <form className="form-main" onSubmit={handleLogin}>
          <label>
            <h1>Username:</h1>
            <input
              type="text"
              className="username-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            <h1>Password:</h1>
            <input
              type="password"
              className="password-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    
  );
};

export default Login;
