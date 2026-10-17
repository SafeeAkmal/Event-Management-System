import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails, clearSelectedEvent } from './eventsSlice';
import { registerForEvent, cancelRegistration } from '../registrations/registrationsSlice';

const EventDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedEvent: event, loading, error } = useSelector((state) => state.events);
  const { currentUser } = useSelector((state) => state.auth);
  const userRegistrations = useSelector((state) => 
    currentUser ? state.registrations.byUser[currentUser.email] || [] : []
  );

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    dispatch(fetchEventDetails(id));
    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [dispatch, id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading event details...</div>;
  }

  if (error || !event) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center">
        {error || 'Event not found.'}
        <div className="mt-4">
          <Link to="/events" className="text-indigo-600 font-semibold underline">Back to Events</Link>
        </div>
      </div>
    );
  }

  const isRegistered = userRegistrations.some((item) => item.id === event.id);
  const image = event.images?.find((img) => img.ratio === '16_9') || event.images?.[0];
  const venue = event._embedded?.venues?.[0];
  const priceRange = event.priceRanges?.[0];

  const handleRegister = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    dispatch(registerForEvent({ userEmail: currentUser.email, event }));
    setFeedback({ type: 'success', message: 'Successfully registered for this event!' });
  };

  const handleCancel = () => {
    dispatch(cancelRegistration({ userEmail: currentUser.email, eventId: event.id }));
    setFeedback({ type: 'info', message: 'Registration cancelled.' });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border border-gray-100 overflow-hidden">
      {image && (
        <img src={image.url} alt={event.name} className="w-full h-80 object-cover" />
      )}

      <div className="p-6">
        {feedback && (
          <div className={`mb-4 p-3 rounded text-sm ${feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-blue-100 text-blue-700 border border-blue-300'}`}>
            {feedback.message}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {event.classifications?.[0]?.segment?.name} &bull; {event.classifications?.[0]?.genre?.name}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{event.name}</h1>
          </div>

          <div>
            {isRegistered ? (
              <button
                onClick={handleCancel}
                className="w-full md:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded shadow transition"
              >
                Cancel Registration
              </button>
            ) : (
              <button
                onClick={handleRegister}
                className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded shadow transition"
              >
                Register for Event
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-gray-100 py-6 my-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Date & Time</h3>
            <p className="text-gray-800 font-medium mt-1">
              {event.dates?.start?.localDate} {event.dates?.start?.localTime ? `at ${event.dates.start.localTime.slice(0, 5)}` : ''}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Timezone: {event.dates?.timezone || 'Local'}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase">Venue & Location</h3>
            <p className="text-gray-800 font-medium mt-1">{venue?.name || 'TBA'}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {venue?.address?.line1}, {venue?.city?.name}, {venue?.country?.name}
            </p>
          </div>

          {priceRange && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Pricing</h3>
              <p className="text-gray-800 font-medium mt-1">
                {priceRange.min} - {priceRange.max} {priceRange.currency}
              </p>
            </div>
          )}

          {event.url && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase">Official Tickets</h3>
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium mt-1 inline-block text-sm">
                Buy on Ticketmaster &rarr;
              </a>
            </div>
          )}
        </div>

        {event.pleaseNote && (
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Important Note</h4>
            <p className="text-sm text-gray-600">{event.pleaseNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailPage;