import React from 'react';

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 text-xs font-semibold rounded-full";
  const map = {
    Approved: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return <span className={`${base} ${map[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
};

export default StatusBadge;
