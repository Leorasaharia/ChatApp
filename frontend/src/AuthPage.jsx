import axios from 'axios';
import React from 'react';

const AuthPage = (props) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      const username = e.target.elements.username.value;
      try {
        const response = await axios.post('http://localhost:3001/authenticate', {
          username: username
        });
        props.onAuth({ ...response.data, secret: username });
      } catch (error) {
        console.error('Error:', error);
      }
    };
    return (
      <div className="background">
        <form onSubmit={onSubmit} className="form-card">
          <div className="form-title">Welcome!!</div>
          <div className="form-subtitle">Set a username to get started</div>
          <div className="auth">
            <div className="auth-label">Username</div>
            <input className="auth-input" name="username" />
            <button className="auth-button" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    );
  };
  
export default AuthPage;
