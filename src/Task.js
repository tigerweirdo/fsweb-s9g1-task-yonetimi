import React from 'react';

function Task({ taskObj, onComplete }) {
  return (
    <div className="task">
      <h3>{taskObj.title}</h3>
      <p>{taskObj.description}</p>
      {taskObj.status === 'yapılacak' && (
        <button onClick={() => onComplete(taskObj.id)}>Tamamlandı</button>
      )}
    </div>
  );
}

export default Task;