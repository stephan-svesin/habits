import React from 'react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface ChecklistData {
  id: string;
  type: 'checklist';
  title: string;
  tasks: Task[];
}

interface Props {
  data: ChecklistData;
  updateWidget: (updatedData: ChecklistData) => void;
}

export default function ChecklistWidget({ data, updateWidget }: Props) {
  
  const toggleTask = (taskId: string) => {
    const updatedTasks = data.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    updateWidget({ ...data, tasks: updatedTasks });
  };

  const addTask = (taskText: string) => {
    if (!taskText.trim()) return;
    const newTask: Task = { id: Date.now().toString(), text: taskText, completed: false };
    updateWidget({ ...data, tasks: [...data.tasks, newTask] });
  };

  const updateTitle = (newTitle: string) => {
    updateWidget({ ...data, title: newTitle });
  };

  const completedCount = data.tasks.filter(t => t.completed).length;
  const totalCount = data.tasks.length;

  return (
    <div className="widget-card">
      {/* WIDGET HEADER */}
      <div className="widget-header">
        <div className="widget-title-area">
          <span className="widget-icon">◯</span>
          <input
            type="text"
            value={data.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="widget-title-input"
          />
        </div>
        <span className="task-counter">
          {totalCount > 0 ? `${completedCount}/${totalCount}` : ''}
        </span>
      </div>

      {/* TASK LIST */}
      <ul className="task-list">
        {data.tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="checkmark"></span>
              <span className="task-text">{task.text}</span>
            </label>
          </li>
        ))}
      </ul>

      {/* ADD NEW TASK INPUT */}
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add new task"
          className="add-task-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTask(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}