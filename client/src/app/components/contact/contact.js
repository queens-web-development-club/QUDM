"use state"

import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle expansion

  // This function handles the expansion and applies a smooth transition
  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      try {
        const response = await fetch('api/contact/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        });
        if (response.ok) {
          setName('');
          setEmail('');
          setMessage('');
          setEmailError('');
          alert('Form submitted successfully!');
        } else {
          alert('Error submitting form. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Please try again later.');
      }
    }
  };


  // Dynamic styles for smooth height transition
  const formStyle = {
    height: isExpanded ? '400px' : '120px', // Adjust these values as needed
    overflow: 'hidden',
    transition: 'height 0.5s ease', // Smooth transition for height change
  };

  return (
    <div className="main">
      <div className="info">
        {/* Your info sections here */}
      </div>
      <div className="form-box" style={formStyle}>
        <div className="button-container">
          <button onClick={toggleForm} style={{ margin: '20px', fontSize: "15px", fontFamily: "inherit", fontWeight: "bold" }}>
            {isExpanded ? 'Close' : 'Leave a Message'}
          </button>
        </div>
        
        {isExpanded && (
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            <textarea placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button style={{ fontSize: "15px", fontFamily: "inherit", fontWeight: "bold"}} type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
