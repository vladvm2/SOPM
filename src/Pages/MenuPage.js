import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBars,
  faUser,
  faTimes,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import "./MenuPage.css";
import AddTaskPage from "./AddTaskPage";
import papagalImage from "./papagal.png";
import Alert from "./Alert";

const MenuPage = () => {
  const navigate = useNavigate();
  const [savedTasks, setSavedTasks] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const [filter, setFilter] = useState("upcoming");

  const handleSaveTask = (taskData) => {
    const newTask = { ...taskData, status: taskData.status || "upcoming" };
    setSavedTasks((prevSavedTasks) => [...prevSavedTasks, newTask]);
    setShowAddTaskModal(false);
  };

  const handleDeleteTask = (taskIndex) => {
    setSavedTasks((prevSavedTasks) =>
      prevSavedTasks.filter((_, index) => index !== taskIndex)
    );
  };

  const handleCompleteTask = (taskIndex) => {
    const updatedTasks = savedTasks.map((task, index) =>
      index === taskIndex
        ? { ...task, status: "completed" }
        : task
    );
    setSavedTasks(updatedTasks);
  };

  const toggleAddTaskModal = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset.filter);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "upcoming":
        return savedTasks.filter((task) => task.status === "upcoming");
      case "completed":
        return savedTasks.filter((task) => task.status === "completed");
      case "overdue":
        return savedTasks.filter((task) => task.status === "overdue");
      default:
        return savedTasks;
    }
  };

  const goToPage = (page) => {
    navigate(page);
  };

  return (
    <div className="menu-page-container">
      <div className="chirp-control-container">
        <div className="top-left-icon">
          <div className="icon-and-text">
           
            
          </div>
        </div>

        <div className="container">
          {alert && <Alert msg={alert.msg} />}
          <div className="filter">
            <button
              data-filter="upcoming"
              className={filter === "upcoming" ? "active" : ""}
              onClick={filterTasks}
            >
              Upcoming
            </button>
            <button
              data-filter="completed"
              className={filter === "completed" ? "active" : ""}
              onClick={filterTasks}
            >
              Completed
            </button>
            <button
              data-filter="overdue"
              className={filter === "overdue" ? "active" : ""}
              onClick={filterTasks}
            >
              Overdue
            </button>
            <button
              data-filter="all"
              className={filter === "all" ? "active" : ""}
              onClick={filterTasks}
            >
              All
            </button>
          </div>
        </div>

        <div className="add-task-image-container" onClick={toggleAddTaskModal}>
          <img
            src={papagalImage}
            alt="Add Task"
            className="add-task-button-image"
          />
        </div>
        <div className="saved-tasks-container">
  {getFilteredTasks().map((savedTask, index) => (
    <div key={index} className="saved-task-item">
      <div className="task-details">
        {savedTask.status === "completed" ? (
          <s>{savedTask.task} - {savedTask.deadline}</s>
        ) : (
          <>
            {savedTask.task} - {savedTask.deadline}
            {/* Verifică dacă descrierea există și o afișează */}
            {savedTask.description && (
              <div className="task-description">{savedTask.description}</div>
            )}
          </>
        )}
      </div>
       
            <div className="task-actions">
                <button
                  className="complete-task-button"
                  onClick={() => handleCompleteTask(index)}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                {savedTask.location !== null &&
                  <div>
                    Location
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                }
                <button
                  className="delete-task-button"
                  onClick={() => handleDeleteTask(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddTaskModal && (
        <AddTaskPage onSaveTask={handleSaveTask} onClose={toggleAddTaskModal} />
      )}

      <header>
        {/* Header content if necessary */}
      </header>

      <div className="icons-container">
        <button className="icon-button" onClick={() => goToPage("/Home")}>
          <FontAwesomeIcon icon={faHouse} />
        </button>
        <button className="icon-button" onClick={() => goToPage("/Menu")}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="icon-button" onClick={() => goToPage("/User")}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>

      <div className="container">
        {/* Other components or content if necessary */}
      </div>
    </div>
  );
};

export default MenuPage;
