import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Specific email suggestions
  const emailSuggestions = ["mihairadu785@yahoo.com", "anotheremail@mail.com", "test@test.com"];

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Check if the value matches the start of any suggestion
    if (value) {
      const matchedSuggestions = emailSuggestions.filter(suggestion =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Adăugați dialogul de confirmare aici
    const isConfirmed = window.confirm(`Are you sure you want to log in with the email ${email}?`);
    if (isConfirmed) {
      console.log('Login attempted with:', email, password);
      navigate('/menupage'); // Navigați doar dacă utilizatorul confirmă
    }
  };
  
  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email here"
            value={email}
            onChange={handleEmailChange}
            autoComplete="off" // Disable browser's default autocomplete
            required
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setEmail(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <input
            type="password"
            className="login-input"
            placeholder="Enter your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;



    
    


