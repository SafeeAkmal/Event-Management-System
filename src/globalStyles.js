import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  '*': {
    margin: 0,
    padding: 0,
  },
  html: {
    lineHeight: '1.5',
    WebkitTextSizeAdjust: '100%',
  },
  body: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: 'inherit',
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  'img, picture, video, canvas, svg': {
    display: 'block',
    maxWidth: '100%',
  },
  'input, button, textarea, select': {
    font: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6': {
    overflowWrap: 'break-word',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  'ul, ol': {
    listStyle: 'none',
  },
});
