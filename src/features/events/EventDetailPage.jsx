import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventDetails, clearSelectedEvent } from './eventsSlice';
import { registerForEvent, cancelRegistration } from '../registrations/registrationsSlice';
import { styled } from '../../stitches.config';
import { Button } from '../../components/ui';

// --- Styled Components ---

const LoadingText = styled('div', {
  textAlign: 'center',
  paddingTop: '$12',
  paddingBottom: '$12',
  color: '$gray500',
});

const ErrorBox = styled('div', {
  maxWidth: '42rem',
  mx: 'auto',
  my: '$8',
  padding: '$4',
  backgroundColor: '$red100',
  border: '1px solid $red400',
  color: '$red700',
  borderRadius: '$DEFAULT',
  textAlign: 'center',
});

const ErrorLinkWrapper = styled('div', {
  marginTop: '$4',
});

const BackLink = styled(Link, {
  color: '$indigo600',
  fontWeight: '$semibold',
  textDecoration: 'underline',
});

const PageWrapper = styled('div', {
  maxWidth: '56rem',
  mx: 'auto',
  backgroundColor: '$white',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  border: '1px solid $gray100',
  overflow: 'hidden',
});

const HeroImage = styled('img', {
  width: '100%',
  height: '20rem',
  objectFit: 'cover',
});

const ContentArea = styled('div', {
  padding: '$6',
});

const FeedbackBanner = styled('div', {
  marginBottom: '$4',
  padding: '$3',
  borderRadius: '$DEFAULT',
  fontSize: '$sm',

  variants: {
    type: {
      success: {
        backgroundColor: '$green100',
        color: '$green700',
        border: '1px solid $green300',
      },
      info: {
        backgroundColor: '$blue100',
        color: '$blue700',
        border: '1px solid $blue300',
      },
    },
  },
});

const HeaderRow = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginBottom: '$6',

  '@md': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const CategoryTag = styled('span', {
  fontSize: '$xs',
  fontWeight: '$bold',
  color: '$indigo600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

const EventTitle = styled('h1', {
  fontSize: '$3xl',
  fontWeight: '$bold',
  color: '$gray900',
  marginTop: '$1',
});

const ButtonWrapper = styled('div', {
  width: '100%',

  '@md': {
    width: 'auto',
  },
});

const RegisterButton = styled(Button, {
  width: '100%',
  '@md': {
    width: 'auto',
  },
});

const DetailsGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$6',
  borderTop: '1px solid $gray100',
  borderBottom: '1px solid $gray100',
  paddingTop: '$6',
  paddingBottom: '$6',
  my: '$6',

  '@md': {
    gridTemplateColumns: '1fr 1fr',
  },
});

const DetailLabel = styled('h3', {
  fontSize: '$sm',
  fontWeight: '$semibold',
  color: '$gray500',
  textTransform: 'uppercase',
});

const DetailValue = styled('p', {
  color: '$gray800',
  fontWeight: '$medium',
  marginTop: '$1',
});

const DetailSub = styled('p', {
  fontSize: '$xs',
  color: '$gray500',
  marginTop: '2px',
});

const TicketLink = styled('a', {
  color: '$indigo600',
  fontSize: '$sm',
  fontWeight: '$medium',
  marginTop: '$1',
  display: 'inline-block',

  '&:hover': {
    textDecoration: 'underline',
  },
});

const NoteBox = styled('div', {
  marginTop: '$4',
  padding: '$4',
  backgroundColor: '$gray50',
  borderRadius: '$DEFAULT',
  border: '1px solid $gray200',
});

const NoteLabel = styled('h4', {
  fontSize: '$xs',
  fontWeight: '$semibold',
  color: '$gray500',
  textTransform: 'uppercase',
  marginBottom: '$1',
});

const NoteText = styled('p', {
  fontSize: '$sm',
  color: '$gray600',
});

// --- Component ---

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
    return <LoadingText>Loading event details...</LoadingText>;
  }

  if (error || !event) {
    return (
      <ErrorBox>
        {error || 'Event not found.'}
        <ErrorLinkWrapper>
          <BackLink to="/events">Back to Events</BackLink>
        </ErrorLinkWrapper>
      </ErrorBox>
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
    <PageWrapper>
      {image && <HeroImage src={image.url} alt={event.name} />}

      <ContentArea>
        {feedback && (
          <FeedbackBanner type={feedback.type}>
            {feedback.message}
          </FeedbackBanner>
        )}

        <HeaderRow>
          <div>
            <CategoryTag>
              {event.classifications?.[0]?.segment?.name} &bull; {event.classifications?.[0]?.genre?.name}
            </CategoryTag>
            <EventTitle>{event.name}</EventTitle>
          </div>

          <ButtonWrapper>
            {isRegistered ? (
              <RegisterButton onClick={handleCancel} variant="danger">
                Cancel Registration
              </RegisterButton>
            ) : (
              <RegisterButton onClick={handleRegister} variant="primary">
                Register for Event
              </RegisterButton>
            )}
          </ButtonWrapper>
        </HeaderRow>

        <DetailsGrid>
          <div>
            <DetailLabel>Date &amp; Time</DetailLabel>
            <DetailValue>
              {event.dates?.start?.localDate}{' '}
              {event.dates?.start?.localTime ? `at ${event.dates.start.localTime.slice(0, 5)}` : ''}
            </DetailValue>
            <DetailSub>Timezone: {event.dates?.timezone || 'Local'}</DetailSub>
          </div>

          <div>
            <DetailLabel>Venue &amp; Location</DetailLabel>
            <DetailValue>{venue?.name || 'TBA'}</DetailValue>
            <DetailSub>
              {venue?.address?.line1}, {venue?.city?.name}, {venue?.country?.name}
            </DetailSub>
          </div>

          {priceRange && (
            <div>
              <DetailLabel>Pricing</DetailLabel>
              <DetailValue>
                {priceRange.min} - {priceRange.max} {priceRange.currency}
              </DetailValue>
            </div>
          )}

          {event.url && (
            <div>
              <DetailLabel>Official Tickets</DetailLabel>
              <TicketLink href={event.url} target="_blank" rel="noopener noreferrer">
                Buy on Ticketmaster &rarr;
              </TicketLink>
            </div>
          )}
        </DetailsGrid>

        {event.pleaseNote && (
          <NoteBox>
            <NoteLabel>Important Note</NoteLabel>
            <NoteText>{event.pleaseNote}</NoteText>
          </NoteBox>
        )}
      </ContentArea>
    </PageWrapper>
  );
};

export default EventDetailPage;