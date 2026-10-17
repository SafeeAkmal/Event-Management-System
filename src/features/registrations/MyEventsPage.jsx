import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelRegistration } from './registrationSlice';

const MyEventsPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const registeredEvents = useSelector((state) =>
    currentUser ? state.registrations.byUser[currentUser.email] || [] : []
  );

  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingEvents = registeredEvents.filter(
    (item) => (item.dates?.start?.localDate || '9999-12-31') >= todayStr
  );

  const pastEvents = registeredEvents.filter(
    (item) => (item.dates?.start?.localDate || '9999-12-31') < todayStr
  );

  const handleCancel = (eventId) => {
    dispatch(cancelRegistration({ userEmail: currentUser.email, eventId }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Registered Events</h1>

      {registeredEvents.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-600 mb-4">You have not registered for any events yet.</p>
          <Link to="/events" className="px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Upcoming Events ({upcomingEvents.length})</h2>
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No upcoming registered events.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white p-4 rounded-lg shadow border border-gray-100 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-green-600 uppercase">Upcoming</span>
                      <h3 className="text-lg font-bold text-gray-800 mt-1">{event.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Date: {event.dates?.start?.localDate}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t">
                      <Link to={`/events/${event.id}`} className="text-sm text-indigo-600 hover:underline font-medium">
                        View Details
                      </Link>
                      <button
                        onClick={() => handleCancel(event.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Cancel Registration
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Completed / Past Section */}
          <section>
            <h2 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Past Events ({pastEvents.length})</h2>
            {pastEvents.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No completed registered events.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastEvents.map((event) => (
                  <div key={event.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Completed</span>
                    <h3 className="text-lg font-bold text-gray-700 mt-1">{event.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Date: {event.dates?.start?.localDate}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;