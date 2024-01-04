
'use client'

import React from 'react';

const GroceryListPage: React.FC = () => {
  // This is a static list of groceries for now
  const groceries = ['Apples', 'Bananas', 'Carrots'];

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded shadow-md w-1/2">
        <h1 className="text-2xl font-bold mb-10 text-center">Grocery List</h1>

        <ul>
          {groceries.map((grocery, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="text-lg">{grocery}</span>
              <button 
                className="bg-red-500 text-white rounded px-2 py-1"
                onClick={() => console.log('Delete button clicked')}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button 
          className="bg-green-500 text-white rounded px-4 py-2 mt-10 block mx-auto"
          onClick={() => console.log('Add button clicked')}
        >
          Add Grocery
        </button>
      </div>
    </div>
  );
};

export default GroceryListPage;