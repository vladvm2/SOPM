import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Help.css';

const Help = () => {
  const [showFAQ, setShowFAQ] = useState(true);
  const navigate = useNavigate(); // Get the navigate function

  const faq = [
    {
      question: "Cum mă înregistrez?",
      answer: "Pentru a te înregistra, mergi la pagina de înregistrare și completează formularul."
    },
   
    // Poți adăuga mai multe întrebări și răspunsuri aici
  ];

  // Function to go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  // Optionally, you could combine this with hiding the FAQ
  const handleClose = () => {
    setShowFAQ(false);
    goBack();
  };

  if (!showFAQ) {
    return null; // If showFAQ is false, don't render the component
  }

  return (
    <div className="help-container">
      <button className="close-faq" onClick={handleClose}>X</button> {/* Call the handleClose function */}
      <h2>Need Help?</h2>
      <div className="faq-section">
        {faq.map((faqItem, index) => (
          <div key={index} className="faq-item">
            <h3>{faqItem.question}</h3>
            <p>{faqItem.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;

