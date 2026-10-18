import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../../../stitches.config';

// --- Styled Components ---

const CardWrapper = styled('div', {
  backgroundColor: '$white',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  border: '1px solid $gray100',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 150ms ease',

  '&:hover': {
    boxShadow: '$lg',
  },
});

const EventImage = styled('img', {
  height: '12rem',
  width: '100%',
  objectFit: 'cover',
});

const CardBody = styled('div', {
  padding: '$4',
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const CategoryLabel = styled('span', {
  fontSize: '$xs',
  fontWeight: '$semibold',
  color: '$indigo600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const EventTitle = styled('h3', {
  fontSize: '$lg',
  fontWeight: '$bold',
  color: '$gray800',
  marginTop: '$1',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
});

const EventDate = styled('p', {
  fontSize: '$sm',
  color: '$gray500',
  marginTop: '$1',
});

const EventVenue = styled('p', {
  fontSize: '$xs',
  color: '$gray600',
  marginTop: '$1',
});

const ViewDetailsLink = styled(Link, {
  marginTop: '$4',
  display: 'block',
  textAlign: 'center',
  backgroundColor: '$indigo50',
  color: '$indigo600',
  fontWeight: '$medium',
  paddingTop: '$2',
  paddingBottom: '$2',
  borderRadius: '$DEFAULT',
  transition: 'background-color 150ms ease',

  '&:hover': {
    backgroundColor: '$indigo100',
  },
});

// --- Component ---

const EventCard = ({ event }) => {
  const image = event.images?.find((img) => img.ratio === '16_9') || event.images?.[0];
  const venue = event._embedded?.venues?.[0];
  const dateStr = event.dates?.start?.localDate;
  const timeStr = event.dates?.start?.localTime;

  return (
    <CardWrapper>
      {image && (
        <EventImage
          src={image.url}
          alt={event.name}
        />
      )}
      <CardBody>
        <div>
          <CategoryLabel>
            {event.classifications?.[0]?.segment?.name || 'Event'}
          </CategoryLabel>
          <EventTitle>{event.name}</EventTitle>
          <EventDate>
            {dateStr} {timeStr ? `at ${timeStr.slice(0, 5)}` : ''}
          </EventDate>
          <EventVenue>
            {venue ? `${venue.name}, ${venue.city?.name || ''}` : 'Location TBD'}
          </EventVenue>
        </div>

        <ViewDetailsLink to={`/events/${event.id}`}>
          View Details
        </ViewDetailsLink>
      </CardBody>
    </CardWrapper>
  );
};

export default EventCard;