import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./AddTaskPage.css";
import { v4 as uuidv4 } from 'uuid';

const AddTaskPage = ({ onClose, onSaveTask }) => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [locationRequired, setLocationRequired] = useState(false);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errorMessage, setErrorMessage] = useState("");
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Interval logic here (if needed)
    }, 1000 * 60 * 60); // Check once every hour

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleLocationChange = (event) => {
    const isChecked = event.target.checked;
    setLocationRequired(isChecked);

    if (!isChecked) {
      setLocation({ lat: null, lng: null });
      setErrorMessage("");
      return;
    }

    if (!navigator.geolocation) {
      setErrorMessage('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setErrorMessage("");
      },
      () => {
        setErrorMessage('Unable to retrieve your location');
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task || !deadline) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const createdAt = new Date();

    const newTask = {
      id: uuidv4(),
      task,
      deadline,
      description,
      location: locationRequired ? location : null,
      status: 'upcoming',
      createdAt: createdAt.toISOString()
    };

    setShowSavedMessage(true);
  
    if (typeof onSaveTask === 'function') {
      onSaveTask(newTask);
    }
  
    setTimeout(() => {
      setShowSavedMessage(false);
      onClose();
    }, 3000);

    resetForm();
  };

  const resetForm = () => {
    setTask("");
    setDeadline("");
    setDescription("");
    setLocationRequired(false);
    setLocation({ lat: null, lng: null });
    setErrorMessage("");
  };

  return (
    <div className="add-task-overlay">
      <div className="add-task-modal">
        <button className="close-modal" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h1>Add Task</h1>
        {showSavedMessage && <div className="saved-message">Saved</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Task name" 
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
          />
          <input 
            type="date" 
            placeholder="Deadline" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
          />
          
          <label>
            Location Required:
            <input 
              type="checkbox" 
              checked={locationRequired} 
              onChange={handleLocationChange} 
            />
          </label>
          <button type="submit" className="add-task-button">Add Task</button>
        </form>
        {locationRequired && location.lat && location.lng && (
          <MapContainer 
            center={[location.lat, location.lng]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: '200px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[location.lat, location.lng]} />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default AddTaskPage;
