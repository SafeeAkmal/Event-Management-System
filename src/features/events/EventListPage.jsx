import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, setFilters } from './eventsSlice';
import EventCard from './components/EventCard';
import EventFilters from './components/EventFilters';
import { styled } from '../../stitches.config';
import { Button } from '../../components/ui';

// --- Styled Components ---

const PageTitle = styled('h1', {
  fontSize: '$3xl',
  fontWeight: '$bold',
  color: '$gray800',
  marginBottom: '$6',
});

const LoadingMessage = styled('div', {
  textAlign: 'center',
  paddingTop: '$12',
  paddingBottom: '$12',
  color: '$gray500',
  fontWeight: '$medium',
});

const ErrorMessage = styled('div', {
  padding: '$4',
  backgroundColor: '$red100',
  border: '1px solid $red400',
  color: '$red700',
  borderRadius: '$DEFAULT',
  marginBottom: '$6',
});

const EmptyMessage = styled('div', {
  textAlign: 'center',
  paddingTop: '$12',
  paddingBottom: '$12',
  color: '$gray500',
});

const EventGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$6',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@md': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '@lg': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
  },
});

const Pagination = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$4',
  marginTop: '$8',
});

const PageInfo = styled('span', {
  fontSize: '$sm',
  color: '$gray600',
});

const PaginationButton = styled('button', {
  px: '$4',
  py: '$2',
  border: '1px solid $gray300',
  borderRadius: '$DEFAULT',
  fontSize: '$sm',
  backgroundColor: '$white',
  cursor: 'pointer',
  transition: 'background-color 150ms ease',

  '&:hover:not(:disabled)': {
    backgroundColor: '$gray50',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

// --- Component ---

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
      <PageTitle>Explore Upcoming Events</PageTitle>

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
        <LoadingMessage>
          Loading events from Ticketmaster...
        </LoadingMessage>
      )}

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {!loading && !error && list.length === 0 && (
        <EmptyMessage>
          No events found. Try adjusting your search or category filter.
        </EmptyMessage>
      )}

      {!loading && !error && list.length > 0 && (
        <>
          <EventGrid>
            {list.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </EventGrid>

          <Pagination>
            <PaginationButton
              disabled={pagination.currentPage === 0}
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            >
              Previous
            </PaginationButton>
            <PageInfo>
              Page {pagination.currentPage + 1} of {pagination.totalPages}
            </PageInfo>
            <PaginationButton
              disabled={pagination.currentPage + 1 >= pagination.totalPages}
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            >
              Next
            </PaginationButton>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default EventListPage;