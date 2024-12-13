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
    try {
      // Make post request to Netlify function endpoint
      const response = await fetch('/.netlify/functions/get-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        console.log("Login successful, status: 200");
  
        // Update auth context
        auth.login();
  
        // Log to check if auth context is updated
        console.log('Auth context after login:', auth);
  
        // Redirect to /admin
        console.log('Redirecting to /admin');
        router.push('/admin');
      } else {
        alert('Improper Email or Password');
      }
    } catch (err) {
      console.error('Login error:', err);
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
