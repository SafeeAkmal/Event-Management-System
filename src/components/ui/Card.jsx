import { styled } from '../../stitches.config';

export const Card = styled('div', {
  backgroundColor: '$white',
  border: '1px solid $gray100',
  borderRadius: '$lg',
  boxShadow: '$DEFAULT',
  overflow: 'hidden',

  variants: {
    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: '$3',
      },
      md: {
        padding: '$4',
      },
      lg: {
        padding: '$6',
      },
    },
    shadow: {
      sm: { boxShadow: '$sm' },
      DEFAULT: { boxShadow: '$DEFAULT' },
      md: { boxShadow: '$md' },
      lg: { boxShadow: '$lg' },
    },
  },

  defaultVariants: {
    padding: 'md',
    shadow: 'DEFAULT',
  },
});
