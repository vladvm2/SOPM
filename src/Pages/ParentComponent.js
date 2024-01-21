// ParentComponent.js
import React, { useState } from 'react';
import RateUs from './RateUs';

const ParentComponent = () => {
  const [showRateUs, setShowRateUs] = useState(true);
  const [savedRating, setSavedRating] = useState(null);

  const handleClose = () => {
    setShowRateUs(false);
  };

  const handleSave = (rating) => {
    setSavedRating(rating);
    setShowRateUs(false);
  };

  return (
    <div>
      {showRateUs && <RateUs onClose={handleClose} onSave={handleSave} />}
      {savedRating && <p>Your saved rating: {savedRating}</p>}
    </div>
  );
};

export default ParentComponent;
