/**
 * Theme
 * Variables and scales for styling
 */

export const grays = [
  '#f8f9f9',
  '#ebedee',
  '#dee1e3',
  '#cfd3d6',
  '#bec4c8',
  '#acb4b9',
  '#97a1a7',
  '#7f8a93',
  '#5f6e78',
  '#374047',
];

export const white = '#fff';
export const black = grays[9];

export const blue = '#07c';
export const washedBlue = '#e4f0f9';

export const red = '#B71C1C';
export const washedRed = '#faeaeb';

export const washedGreen = '#e3f9ec';

export const yellow = '#ffeb3b';
export const washedYellow = '#fffacc';

export const primary = black;

export const colors = {
  white,
  black,
  blue,
  washedBlue,
  red,
  washedRed,
  washedGreen,
  yellow,
  washedYellow,
  primary,
  grays,
};

export const space = ['.25rem', '.5rem', '1rem', '2rem', '4rem', '8rem'];

const theme = {
  bold: 600,
  space,
  colors,
};

export default theme;
