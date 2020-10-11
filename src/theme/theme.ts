const colorScheme = {
  100: '#FEEAD2',
  200: '#FDD0A6',
  300: '#FAAE79',
  400: '#F68D57',
  500: '#F15A22',
  600: '#CF3D18',
  700: '#AD2511',
  800: '#8B120A',
  900: '#730607',
};

const colors = {
  white: 'white',
  black: 'black',
  primaryHover: 'rgba(241, 90, 34, 0.2)', // rgba from primary
  senior: colorScheme[600],
  primary: colorScheme[500],
  secondary: '#779e91',
  brandColor: colorScheme,
  font: {
    primary: 'black',
    secondary: '#404040',
    ghost: '#808080',
  },
  topbar: {
    link: '#808080',
    link_active_button: colorScheme[500],
  },
  backgroundShapes: '#FEF8F5',
  footer: {
    text: '#808080',
  },
};

export const theme = {
  fontWeights: {
    400: 400,
    700: 700,
  },
  fontSizes: [1.2, 1.4, 1.6, 1.7, 1.8, 2, 2.4, 2.6, 2.8, 3.3, 4, 6.4],
  colors,
  breakpoints: [430, 576, 768, 992, 1200],
};

type FontIndexes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export const rem = (index: FontIndexes) => `${theme.fontSizes[index]}rem`;
