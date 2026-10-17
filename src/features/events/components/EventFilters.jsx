import React from 'react';

const EventFilters = ({ keyword, category, onSearchChange, onCategoryChange, onSearchSubmit }) => {
  const categories = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

  return (
    <form onSubmit={onSearchSubmit} className="bg-white p-4 rounded-lg shadow border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search events by name or keyword..."
        value={keyword}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded transition"
      >
        Search
      </button>
    </form>
  );
};

export default EventFilters;