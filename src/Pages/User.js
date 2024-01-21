import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import './User.css';

const User = () => {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [savedDay, setSavedDay] = useState(null);
  const [savedMonth, setSavedMonth] = useState(null);
  const [savedYear, setSavedYear] = useState(null);
  const [bio, setBio] = useState("");
  const [isBioSaved, setIsBioSaved] = useState(false);
  const [hobbies, setHobbies] = useState([]);
  const [newHobby, setNewHobby] = useState("");
  const hobbySuggestions = ["Călătorii", "Fotografie", "Gătit", "Meditație", "Ciclism", "Pictură"];

  const handleSave = () => {
    setSavedDay(selectedDay);
    setSavedMonth(selectedMonth);
    setSavedYear(selectedYear);
  };

  const handleSaveBio = () => {
    console.log("Biography saved:", bio);
    setIsBioSaved(true);
    setTimeout(() => setIsBioSaved(false), 3000);
  };

  const handleAddHobby = () => {
    if (newHobby.trim() !== "") {
      setHobbies([...hobbies, newHobby]);
      setNewHobby("");
    }
  };

  const handleDeleteHobby = (index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
  };

  const handleAddSuggestion = (suggestion) => {
    if (suggestion.trim() !== "" && !hobbies.includes(suggestion)) {
      setHobbies([...hobbies, suggestion]);
    }
  };

  const goBack = () => {
    navigate(-1); // Navighează înapoi în istoric
  };

  return (
    <div className="user-page-container">
      <div className="icons-container">
        <button className="icon-button" onClick={goBack}>
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
        <h1 className="header">User Profile</h1>
      </header>
      <div className="bio-section">
        <textarea
          className="bio-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Introduceți biografia dvs..."
        />
        <button onClick={handleSaveBio}>Salvați Biografia</button>
        {bio && (
          <button onClick={() => setBio("")}>Șterge Biografia</button>
        )}
        {isBioSaved && <p>Saved</p>}
      </div>

      <div className="dob-inputs">
        <div className="dob-input">
          <DatePicker
            selected={selectedDay}
            onChange={(date) => setSelectedDay(date)}
            dateFormat="dd"
            placeholderText="Zi"
            className="date-input"
          />
        </div>
        <div className="dob-input">
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM"
            placeholderText="Lună"
            className="date-input"
          />
        </div>
        <div className="dob-input">
          <DatePicker
            selected={selectedYear}
            onChange={(date) => setSelectedYear(date)}
            dateFormat="yyyy"
            placeholderText="An"
            className="date-input"
          />
        </div>
        <button onClick={handleSave}>Salvați</button>
      </div>

      <div className="hobby-section">
        <h3 className="hobby-title">Hobby-uri</h3>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index} className="hobby-item">
              {hobby}
              <button onClick={() => handleDeleteHobby(index)}>Șterge</button>
            </li>
          ))}
        </ul>
        <div className="add-hobby">
          <input
            type="text"
            className="hobby-input"
            placeholder="Adăugați un nou hobby"
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
          />
          <button onClick={handleAddHobby}>Adăugați</button>
        </div>
        <div className="hobby-suggestions">
          <p className='sugestii'>Sugestii:</p> 
          <ul>
            {hobbySuggestions.map((suggestion, index) => (
              <button key={index} onClick={() => handleAddSuggestion(suggestion)}>{suggestion}</button>
            ))}
          </ul>
        </div>
      </div>

      {savedDay && savedMonth && savedYear && (
        <div className="saved-date">
          Dată Salvată: {savedDay.getDate()}/{savedMonth.getMonth() + 1}/{savedYear.getFullYear()}
        </div>
      )}
    </div>
  );
};

export default User;
