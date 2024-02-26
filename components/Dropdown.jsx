
import React from 'react';

const Dropdown = ({ data, selectedData, onDataChange, dropDownType, labelProperty }) => {
  return (
    <div className="mb-4">
      <label htmlFor="program-select" className="block mb-2 text-sm font-medium text-gray-900">Select a Program:</label>
      <select
        id="program-select"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={selectedData?._id || ''}
        onChange={(e) => onDataChange(e.target.value)}
      >
        <option value="">Select a {dropDownType}</option>
        {data?.map((p) => (
          <option key={p._id} value={p._id}>
            {p[labelProperty]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
