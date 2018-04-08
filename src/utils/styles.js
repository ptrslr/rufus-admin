import { css } from 'styled-components';
import { placeholder, rgba } from 'polished';
import { colors } from './theme';

export const formControl = css`
  padding: 0.375em 0.725em;
  border: 1px solid transparent;
  border-radius: 3px;

  font-size: 1rem;
  line-height: 1.5;
`;
export const formControlSm = css`
  font-size: 0.875rem;
`;
export const formControlLg = css`
  padding: 0.5em 0.725em;
  font-size: 1.125rem;
`;

export const input = css`
  display: block;
  width: 100%;
  border-color: ${colors.grays[5]};

  font-size: 1rem;
  line-height: 1.5;

  color: ${colors.black};
  background: #fff;

  transition: all 250ms;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => rgba(colors.grays[5], 0.5)};
  }

  ${placeholder({
    color: colors.grays[4],
  })};

  &[readonly] {
    border-color: transparent;
    pointer-events: none;
    background: transparent;
  }
`;
