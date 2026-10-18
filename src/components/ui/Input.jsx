import { styled } from '../../stitches.config';

export const Input = styled('input', {
  display: 'block',
  width: '100%',
  border: '1px solid $gray300',
  borderRadius: '$DEFAULT',
  px: '$4',
  py: '$2',
  fontSize: '$base',
  color: '$gray900',
  backgroundColor: '$white',
  outline: 'none',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',

  '&::placeholder': {
    color: '$gray400',
  },

  '&:focus': {
    borderColor: '$indigo500',
    boxShadow: '0 0 0 2px rgba(99,102,241,0.25)',
  },

  '&:disabled': {
    backgroundColor: '$gray100',
    color: '$gray500',
    cursor: 'not-allowed',
  },

  variants: {
    state: {
      default: {},
      error: {
        borderColor: '$red500',
        '&:focus': {
          borderColor: '$red500',
          boxShadow: '0 0 0 2px rgba(239,68,68,0.25)',
        },
      },
    },
  },

  defaultVariants: {
    state: 'default',
  },
});
