import React, { useState, useEffect } from 'react';

const ScheduleSetsViewer = ({ programId, semesterId }) => {
  const [scheduleSets, setScheduleSets] = useState([]);
  const [selectedScheduleSet, setSelectedScheduleSet] = useState(null);

  useEffect(() => {
    const fetchScheduleSets = async () => {
      const response = await fetch(`/api/scheduleSets?programId=${programId}&semesterId=${semesterId}`);
      if (response.ok) {
        const data = await response.json();
        setScheduleSets(data.scheduleSets);
        // Optionally set the first schedule set as selected by default
        setSelectedScheduleSet(data.scheduleSets[0]);
      }
    };

    if (programId && semesterId) {
      fetchScheduleSets();
    }
  }, [programId, semesterId]);

  const handleSelectScheduleSet = (scheduleSetId) => {
    const selected = scheduleSets.find(set => set._id === scheduleSetId);
    setSelectedScheduleSet(selected);
  };

  return (
    <div>
      <h2>Select a Schedule Set to View</h2>
      <select onChange={(e) => handleSelectScheduleSet(e.target.value)}>
        {scheduleSets.map(set => (
          <option key={set._id} value={set._id}>
            Schedule Set - {new Date(set.createdAt).toLocaleDateString()}
          </option>
        ))}
      </select>

      {selectedScheduleSet && (
        <div>
          {/* Render details of the selected schedule set here */}
          <h3>Selected Schedule Set Details</h3>
          {/* Example: Render the courses */}
          {selectedScheduleSet.schedules.map(schedule => (
            <p key={schedule._id}>{schedule.course}</p> // Adjust based on your data structure
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduleSetsViewer;
