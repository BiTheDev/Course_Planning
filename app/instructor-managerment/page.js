import { useState, useEffect } from 'react';

const InstructorManagementPage = () => {
  const [instructors, setInstructors] = useState([]);

  // Fetch instructors data from the server or database
  useEffect(() => {
    // Make an API call to fetch the instructors data
    // Update the state with the fetched instructors
    const fetchData = async () => {
      try {
        const response = await fetch('/api/instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    fetchData();
  }, []);

  const handleInstructorUpdate = (updatedInstructor) => {
    // Send the updatedInstructor data to the server or database for updating
    // Update the state with the updated list of instructors
    const updatedInstructors = instructors.map((instructor) => {
      if (instructor.id === updatedInstructor.id) {
        return updatedInstructor;
      }
      return instructor;
    });
    setInstructors(updatedInstructors);
  };

  const handleInstructorAddition = (newInstructor) => {
    // Send the newInstructor data to the server or database for addition
    // Update the state with the updated list of instructors
    setInstructors([...instructors, newInstructor]);
  };

  return (
    <div>
      <h1>Instructor Management</h1>
      {/* Display detailed instructor information */}
      <ul>
        {instructors.map((instructor) => (
          <li key={instructor.id}>{instructor.name}</li>
        ))}
      </ul>

      {/* Instructor Update Form */}
      <InstructorUpdateForm onInstructorUpdate={handleInstructorUpdate} />

      {/* Create Instructor Form */}
      <CreateInstructorForm onInstructorAddition={handleInstructorAddition} />
    </div>
  );
};

export default InstructorManagementPage;