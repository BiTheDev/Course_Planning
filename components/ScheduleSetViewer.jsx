import React, { useState, useEffect } from 'react';
import Dropdown from "@/components/General/Dropdown";

const ScheduleSetsViewer = ({ programId, semesterId }) => {
  const [scheduleSets, setScheduleSets] = useState([]);
  const [selectedScheduleSet, setSelectedScheduleSet] = useState(null);

  useEffect(() => {

    const fetchScheduleSets = async () => {
      try {
        const response = await fetch(`/api/scheduleSets?programId=${programId}&semesterId=${semesterId}`);
        const data = await response.json();
        console.log("Fectched schedule sets:", data.scheduleSets); // for debugging
        setScheduleSets(data.scheduleSets);
        // Optionally set the first schedule set as selected by default
        setSelectedScheduleSet(data.scheduleSets[0]);
      } catch (error) {
        console.error("Error fetching schedule sets:", error); 
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

      <div className="container mx-auto px-4 py-8">
      <h2>Select a Schedule Set to View</h2>
      <Dropdown
        options={scheduleSets.map(set => ({
          value: set._id,
          label: `Schedule Set - ${new Date(set.createdAt).toLocaleDateString()}`
        }))}
        onChange={(value) => handleSelectScheduleSet(value)}
        value={selectedScheduleSet ? selectedScheduleSet._id : null}
      />        
      </div>
      

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
