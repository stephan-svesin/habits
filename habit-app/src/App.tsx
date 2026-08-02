import { useState } from 'react';
import ChecklistWidget, { type ChecklistData } from './components/ChecklistWidget';
import './App.css';


type Widget = ChecklistData; 

function App() {

  const [widgets, setWidgets] = useState<Widget[]>([]);

 
  const addChecklistWidget = () => {
    const newWidget: ChecklistData = {
      id: Date.now().toString(),
      type: 'checklist',
      title: 'NEW LIST',
      tasks: [],
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleWidgetUpdate = (updatedWidget: Widget) => {
    setWidgets(widgets.map(w => w.id === updatedWidget.id ? updatedWidget : w));
  };

  return (
    <div className="app-wrapper">
      <div className="mobile-container">
        
        {/* WIDGETS CONTAINER*/}
        <main className="widgets-container">
          {widgets.length === 0 && (
            <p className="empty-state">Canvas issssss emptyyyyyyyyyyyyyyyyyyyyy</p>
          )}

          {widgets.map(widget => {
            if (widget.type === 'checklist') {
              return (
                <ChecklistWidget 
                  key={widget.id} 
                  data={widget} 
                  updateWidget={handleWidgetUpdate} 
                />
              );
            }
            return null;
          })}
        </main>

        {/* + BUTTON */}
        <button className="fab-button" onClick={addChecklistWidget}>
          +
        </button>
        
      </div>
    </div>
  );
}

export default App;