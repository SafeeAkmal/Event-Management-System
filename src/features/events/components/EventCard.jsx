import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const image = event.images?.find((img) => img.ratio === '16_9') || event.images?.[0];
  const venue = event._embedded?.venues?.[0];
  const dateStr = event.dates?.start?.localDate;
  const timeStr = event.dates?.start?.localTime;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition">
      {image && (
        <img
          src={image.url}
          alt={event.name}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {event.classifications?.[0]?.segment?.name || 'Event'}
          </span>
          <h3 className="text-lg font-bold text-gray-800 mt-1 line-clamp-1">
            {event.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {dateStr} {timeStr ? `at ${timeStr.slice(0, 5)}` : ''}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {venue ? `${venue.name}, ${venue.city?.name || ''}` : 'Location TBD'}
          </p>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-4 block text-center bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium py-2 rounded transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;