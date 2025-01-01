"use client"

import { useState } from 'react';
import { useAuth } from '../auth/authContext';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '../../../utils/config';
import "./login.css";

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/get-login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful");
        auth.login();
        router.push('/admin');
      } else {
        const data = await response.json();
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError(data.message || 'An error occurred');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server');
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
          {error && <div className="error-message">{error}</div>}
          
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