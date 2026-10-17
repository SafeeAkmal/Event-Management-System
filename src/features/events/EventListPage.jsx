import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, setFilters } from './eventsSlice';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';

const EventListPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error, filters, pagination } = useSelector((state) => state.events);
  const [keyword, setKeyword] = useState(filters.keyword);
  const [category, setCategory] = useState(filters.category);

  useEffect(() => {
    dispatch(fetchEvents({ keyword: filters.keyword, category: filters.category, page: 0 }));
  }, [dispatch, filters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({ keyword, category }));
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchEvents({ keyword: filters.keyword, category: filters.category, page: newPage }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Upcoming Events</h1>

      <EventFilters
        keyword={keyword}
        category={category}
        onSearchChange={setKeyword}
        onCategoryChange={(cat) => {
          setCategory(cat);
          dispatch(setFilters({ keyword, category: cat }));
        }}
        onSearchSubmit={handleSearchSubmit}
      />

      {loading && (
        <div className="text-center py-12 text-gray-500 font-medium">
          Loading events from Ticketmaster...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-6">
          {error}
        </div>
      )}

      {!loading && !error && list.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No events found. Try adjusting your search or category filter.
        </div>
      )}

      {!loading && !error && list.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {list.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              disabled={pagination.currentPage === 0}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className="px-4 py-2 border rounded text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage + 1} of {pagination.totalPages}
            </span>
            <button
              disabled={pagination.currentPage + 1 >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className="px-4 py-2 border rounded text-sm disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventListPage;