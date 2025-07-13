import React from 'react';
import { AvailabilityEntry } from '@/lib/availability';

interface AvailabilityTableProps {
  availability: AvailabilityEntry[];
  isAdmin?: boolean;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

const AvailabilityTable: React.FC<AvailabilityTableProps> = ({ availability, isAdmin = false, onEdit, onDelete }) => {
  if (availability.length === 0) {
    return <p className="text-center text-gray-600">No availability data available.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full bg-white bg-opacity-90 rounded-lg">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg">Date</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Day</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">From Time</th>
            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">To Time</th>
            {isAdmin && <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tr-lg">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {availability.map((entry, index) => (
            <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
              <td className="py-3 px-4 whitespace-nowrap text-gray-800">{entry.date}</td>
              <td className="py-3 px-4 whitespace-nowrap text-gray-800">{entry.day}</td>
              <td className="py-3 px-4 whitespace-nowrap">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${entry.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                `}>
                  {entry.status}
                </span>
              </td>
              <td className="py-3 px-4 whitespace-nowrap text-gray-800">{entry.fromTime}</td>
              <td className="py-3 px-4 whitespace-nowrap text-gray-800">{entry.toTime}</td>
              {isAdmin && (
                <td className="py-3 px-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={() => onEdit && onEdit(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200 shadow-sm"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityTable;