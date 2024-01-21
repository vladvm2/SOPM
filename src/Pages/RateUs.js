// RateUs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./RateUs.css";
import { useRating } from './RatingContext';

const RateUs = ({ onClose }) => {
  const navigate = useNavigate(); // Get the navigate function
  const { rating, setRating } = useRating();
  const [isSaved, setIsSaved] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
  };

  // Function to redirect to the RateUs page
  const goToRateUsPage = () => {
    navigate('/rateus'); // Use the navigate function to redirect
  };

  return (
    <div className="rate-us-wrapper">
    
      <div className="rate-us-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Rate Us</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`star-button ${rating >= star ? 'selected' : ''}`}
              onClick={() => handleRating(star)}
            >
              ★
            </button>
          ))}
        </div>
        <div>
          {rating > 0 ? <p>You rated this {rating} out of 5.</p> : <p>Please select a rating.</p>}
          <button onClick={handleSave} className="save-rating-button">Save Rating</button>
          {isSaved && <p className="saved-confirmation">Saved!</p>}
        </div>
      </div>
    </div>
  );
};

export default RateUs;
