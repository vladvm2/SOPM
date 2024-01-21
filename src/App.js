// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from "./Pages/MenuPage";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Menu from "./Pages/Menu";
import User from "./Pages/User";
import Login from './Pages/Login'; // Make sure you have this component created
import Register from './Pages/Register'; // Make sure you have this component created
import { TasksProvider } from './Pages/TasksContext';
import { DarkModeProvider } from './Pages/DarkModeContext';
import { RatingProvider } from './Pages/RatingContext';


import "./App.css";

import Navigation from './Pages/Navigation'; // Assuming Navigation is saved in the Components folder
import Help from './Pages/Help'; // Adjust the import path as necessary
import RateUs from './Pages/RateUs'; // Assuming Navigation is saved in the Components folder
import AddTaskPage from './Pages/AddTaskPage';

function App() {
  return (
    <TasksProvider>
      
      <DarkModeProvider>
        <RatingProvider>
        <div className="App">
      <Navigation />
      <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/menupage" element={<MenuPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/user" element={<User />} />
              <Route path="/help" element={<Help />} />
              <Route path="/rateus" element={<RateUs />} />
              <Route path="/add-task" element={<AddTaskPage />} />
            </Routes>
          </div>
        </RatingProvider>
      </DarkModeProvider>
    </TasksProvider>
  );
}

export default App;