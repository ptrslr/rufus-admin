import styled, { css } from 'styled-components';

export const heading = css`
  margin: 0;
  font-weight: 700;
  text-rendering: optimizeLegibility;
`;

export const Heading1 = styled.h1`
  ${heading} font-size: 1.5rem;
  /*text-transform: uppercase;*/
  /*letter-spacing: 0.05em;*/
`;
export const Heading2 = styled.h2`
  ${heading} font-size: 1.5rem;
`;
export const Heading3 = styled.h2`
  ${heading} font-size: 1.25rem;
`;
export const Heading4 = styled.h2`
  ${heading} font-size: 1rem;
`;
