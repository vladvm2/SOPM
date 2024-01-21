// SomeOtherComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OtherComponent = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ... other content ... */}
      <button onClick={() => navigate('/rateus')}>Rate Us</button>
    </div>
  );
};

export default OtherComponent;
