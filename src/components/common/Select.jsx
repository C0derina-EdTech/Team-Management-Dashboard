import React from 'react';

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select {...props} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white">
      {children}
    </select>
  </div>
);

export default Select;
