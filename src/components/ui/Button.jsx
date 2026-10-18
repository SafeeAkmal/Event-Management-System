import { styled } from '../../stitches.config';

export const Button = styled('button', {
  // Base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '$medium',
  borderRadius: '$DEFAULT',
  border: '1px solid transparent',
  cursor: 'pointer',
  transition: 'background-color 150ms ease, opacity 150ms ease, box-shadow 150ms ease',
  outline: 'none',
  textDecoration: 'none',

  '&:focus-visible': {
    outline: '2px solid $indigo500',
    outlineOffset: '2px',
  },

  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$indigo600',
        color: '$white',
        '&:hover': {
          backgroundColor: '$indigo700',
        },
      },
      danger: {
        backgroundColor: '$red600',
        color: '$white',
        '&:hover': {
          backgroundColor: '$red700',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$indigo600',
        borderColor: '$indigo600',
        '&:hover': {
          backgroundColor: '$indigo50',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$gray700',
        '&:hover': {
          backgroundColor: '$gray100',
        },
      },
      link: {
        backgroundColor: 'transparent',
        color: '$indigo600',
        textDecoration: 'underline',
        padding: '0',
        '&:hover': {
          color: '$indigo800',
        },
      },
    },
    size: {
      sm: {
        fontSize: '$sm',
        px: '$3',
        py: '$1',
        lineHeight: '1.5rem',
      },
      md: {
        fontSize: '$base',
        px: '$4',
        py: '$2',
      },
      lg: {
        fontSize: '$lg',
        px: '$6',
        py: '$3',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
