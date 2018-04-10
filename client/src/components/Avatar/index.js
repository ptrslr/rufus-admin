// @flow
import * as React from 'react';
import styled from 'styled-components';
import { grays } from '../../utils/theme';

import placeholder from './avatar.svg';

type Props = {
  size: 'xs' | 'sm' | 'md' | 'lg',
  src?: string,
  alt: string,
};

const sizes = {
  xs: '1.5rem',
  sm: '2rem',
  md: '2.5rem',
  lg: '4rem',
};

const Image = styled.img`
  display: block;
  border: 1px solid ${grays[2]};
  border-radius: 100%;

  width: ${props => (props.size ? sizes[props.size] : sizes[3])};
  height: ${props => (props.size ? sizes[props.size] : sizes[3])};
`;

const Avatar = (props: Props) => {
  const { size, src, alt } = props;

  return <Image size={size} src={src ? src : placeholder} alt={alt} />;
};

export default Avatar;
