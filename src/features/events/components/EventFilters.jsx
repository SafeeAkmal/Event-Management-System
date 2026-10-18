import React from 'react';
import { styled } from '../../../stitches.config';
import { Button, Input } from '../../../components/ui';

// --- Styled Components ---

const FiltersForm = styled('form', {
  backgroundColor: '$white',
  padding: '$4',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  border: '1px solid $gray100',
  marginBottom: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  '@md': {
    flexDirection: 'row',
  },
});

const SearchInput = styled(Input, {
  flex: '1',
});

const CategorySelect = styled('select', {
  px: '$4',
  py: '$2',
  border: '1px solid $gray300',
  borderRadius: '$DEFAULT',
  fontSize: '$base',
  color: '$gray900',
  backgroundColor: '$white',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',

  '&:focus': {
    borderColor: '$indigo500',
    boxShadow: '0 0 0 2px rgba(99,102,241,0.25)',
  },
});

// --- Component ---

const EventFilters = ({ keyword, category, onSearchChange, onCategoryChange, onSearchSubmit }) => {
  const categories = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Miscellaneous'];

  return (
    <FiltersForm onSubmit={onSearchSubmit}>
      <SearchInput
        type="text"
        placeholder="Search events by name or keyword..."
        value={keyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <CategorySelect
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </CategorySelect>

      <Button type="submit" variant="primary" size="md">
        Search
      </Button>
    </FiltersForm>
  );
};

export default EventFilters;