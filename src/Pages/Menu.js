import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";
import { DarkModeContext } from './DarkModeContext';
import { useRating } from './RatingContext';
import RateUs from './RateUs';

const Menu = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [showRateUs, setShowRateUs] = useState(false);
  const navigate = useNavigate();
  const { rating } = useRating();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openRateUs = () => {
    setShowRateUs(true);
  };

  const navigateToHelp = () => {
    navigate('/help');
  };

  const closeRateUs = () => {
    setShowRateUs(false);
  };

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1a1a1a' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
  }, [darkMode]);

  return (
    <div className={`Menu-page-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="icons-container">
        <button className="icon-button" onClick={() => navigate("/menupage")}>
          <FontAwesomeIcon icon={faHouse} />
        </button>
        <button className="icon-button" onClick={() => navigate("/Menu")}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="icon-button" onClick={() => navigate("/User")}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
      <header>
        <button className="menu-button" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button className="menu-button" onClick={openRateUs}>
          Rate Us
        </button>
        <button className="menu-button" onClick={navigateToHelp}>
          Help
        </button>
      </header>

      {showRateUs && <RateUs onClose={closeRateUs} />}
      <div className="container">
        {/* Am eliminat Link-ul către 'Menu Page' */}
        {rating > 0 && <p>Your saved rating: {rating}</p>}
      </div>
    </div>
  );
};

export default Menu;
