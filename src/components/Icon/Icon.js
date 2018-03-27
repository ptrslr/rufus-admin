// @flow
import * as React from 'react';
import styled from 'styled-components';
// import IconSvg from './icons/People.js'

type Props = {
  name: string,
  size?: string,
  color?: string,
  opticalAlign?: Boolean,
};

const Icon = (props: Props) => {
  const { name, size, color, opticalAlign, ...other } = props;

  const IconSvg = require(`./icons/${name}.js`).default;

  const StyledSvg = styled(IconSvg)`
    display: inline-block;
    vertical-align: ${props => (opticalAlign ? '-.25ex' : 'middle')};

    color: ${props => (color ? color : 'inherit')};
    font-size: ${props => (size ? size : 'inherit')};
  `;

  return <StyledSvg {...other} />;
};

export default Icon;
