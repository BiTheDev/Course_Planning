// ProgramDropdown.jsx
import React from 'react';

const ProgramDropdown = ({ programs, selectedProgram, onProgramChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="program-select" className="block mb-2 text-sm font-medium text-gray-900">Select a Program:</label>
      <select
        id="program-select"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={selectedProgram?._id || ''}
        onChange={(e) => onProgramChange(e.target.value)}
      >
        <option value="">Select a program</option>
        {programs.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgramDropdown;
