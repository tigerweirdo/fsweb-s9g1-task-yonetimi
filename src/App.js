import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import React, { useState } from 'react';


function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);
  const [message, setMessage] = useState('');

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    setMessage('Yeni görev başarıyla eklendi.');
    
  }
  function handleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: 'yapıldı' } : task
      )
    );
    setMessage('Görev başarıyla tamamlandı.');
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          <TaskForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
              {message && <div className="message">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
