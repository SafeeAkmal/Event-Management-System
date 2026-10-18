import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelRegistration } from './registrationsSlice';
import { styled } from '../../stitches.config';
import { Button } from '../../components/ui';

// --- Styled Components ---

const PageWrapper = styled('div', {
  maxWidth: '64rem',
  mx: 'auto',
});

const PageTitle = styled('h1', {
  fontSize: '$3xl',
  fontWeight: '$bold',
  color: '$gray800',
  marginBottom: '$6',
});

const EmptyCard = styled('div', {
  backgroundColor: '$white',
  padding: '$8',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  border: '1px solid $gray100',
  textAlign: 'center',
});

const EmptyText = styled('p', {
  color: '$gray600',
  marginBottom: '$4',
});

const ExploreLink = styled(Link, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  px: '$4',
  py: '$2',
  backgroundColor: '$indigo600',
  color: '$white',
  borderRadius: '$DEFAULT',
  fontWeight: '$medium',
  transition: 'background-color 150ms ease',

  '&:hover': {
    backgroundColor: '$indigo700',
  },
});

const SectionsWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',
});

const SectionTitle = styled('h2', {
  fontSize: '$xl',
  fontWeight: '$bold',
  color: '$gray700',
  marginBottom: '$4',
  borderBottom: '1px solid $gray200',
  paddingBottom: '$2',
});

const EventGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$4',

  '@md': {
    gridTemplateColumns: '1fr 1fr',
  },
});

const UpcomingEventCard = styled('div', {
  backgroundColor: '$white',
  padding: '$4',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  border: '1px solid $gray100',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const PastEventCard = styled('div', {
  backgroundColor: '$gray50',
  padding: '$4',
  borderRadius: '$lg',
  border: '1px solid $gray200',
});

const UpcomingBadge = styled('span', {
  fontSize: '$xs',
  fontWeight: '$semibold',
  color: '$green600',
  textTransform: 'uppercase',
});

const PastBadge = styled('span', {
  fontSize: '$xs',
  fontWeight: '$semibold',
  color: '$gray500',
  textTransform: 'uppercase',
});

const EventName = styled('h3', {
  fontSize: '$lg',
  fontWeight: '$bold',
  marginTop: '$1',

  variants: {
    muted: {
      true: { color: '$gray700' },
      false: { color: '$gray800' },
    },
  },

  defaultVariants: {
    muted: 'false',
  },
});

const EventDate = styled('p', {
  fontSize: '$sm',
  color: '$gray500',
  marginTop: '$1',
});

const CardFooter = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '$4',
  paddingTop: '$3',
  borderTop: '1px solid $gray200',
});

const DetailsLink = styled(Link, {
  fontSize: '$sm',
  color: '$indigo600',
  fontWeight: '$medium',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const CancelButton = styled('button', {
  fontSize: '$xs',
  color: '$red600',
  fontWeight: '$medium',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,

  '&:hover': {
    color: '$red800',
  },
});

const EmptySection = styled('p', {
  fontSize: '$sm',
  color: '$gray500',
  fontStyle: 'italic',
});

// --- Component ---

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
    <PageWrapper>
      <PageTitle>My Registered Events</PageTitle>

      {registeredEvents.length === 0 ? (
        <EmptyCard>
          <EmptyText>You have not registered for any events yet.</EmptyText>
          <ExploreLink to="/events">Explore Events</ExploreLink>
        </EmptyCard>
      ) : (
        <SectionsWrapper>
          {/* Upcoming Section */}
          <section>
            <SectionTitle>Upcoming Events ({upcomingEvents.length})</SectionTitle>
            {upcomingEvents.length === 0 ? (
              <EmptySection>No upcoming registered events.</EmptySection>
            ) : (
              <EventGrid>
                {upcomingEvents.map((event) => (
                  <UpcomingEventCard key={event.id}>
                    <div>
                      <UpcomingBadge>Upcoming</UpcomingBadge>
                      <EventName muted="false">{event.name}</EventName>
                      <EventDate>Date: {event.dates?.start?.localDate}</EventDate>
                    </div>
                    <CardFooter>
                      <DetailsLink to={`/events/${event.id}`}>View Details</DetailsLink>
                      <CancelButton onClick={() => handleCancel(event.id)}>
                        Cancel Registration
                      </CancelButton>
                    </CardFooter>
                  </UpcomingEventCard>
                ))}
              </EventGrid>
            )}
          </section>

          {/* Completed / Past Section */}
          <section>
            <SectionTitle>Past Events ({pastEvents.length})</SectionTitle>
            {pastEvents.length === 0 ? (
              <EmptySection>No completed registered events.</EmptySection>
            ) : (
              <EventGrid>
                {pastEvents.map((event) => (
                  <PastEventCard key={event.id}>
                    <PastBadge>Completed</PastBadge>
                    <EventName muted="true">{event.name}</EventName>
                    <EventDate>Date: {event.dates?.start?.localDate}</EventDate>
                  </PastEventCard>
                ))}
              </EventGrid>
            )}
          </section>
        </SectionsWrapper>
      )}
    </PageWrapper>
  );
};

export default MyEventsPage;