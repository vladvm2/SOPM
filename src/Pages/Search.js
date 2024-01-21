import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useTasks } from './TasksContext';

import "./Search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { savedTasks, taskSuggestions } = useTasks();

  const filteredTasks = savedTasks.filter(task =>
    (task.title && task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSuggestions = taskSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
  };

  const showNoResultMessage = searchTerm && filteredTasks.length === 0 && filteredSuggestions.length === 0;

  return (
    <div className="search-page-container">
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="suggestions-container">
        {searchTerm && filteredSuggestions.map((suggestion, index) => (
          <button key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
      <div className="container">
        {showNoResultMessage ? (
          <p>Nu s-a găsit niciun rezultat 😔</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map((task, index) => (
              <li key={index}>
                <p className="task-title">{task.title}</p>
                <p className="task-description">{task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;



