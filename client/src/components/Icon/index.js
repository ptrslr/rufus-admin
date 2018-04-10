// @flow
import * as React from 'react';
import styled from 'styled-components';
// import IconSvg from './icons/People.js';

type Props = {
  name: string,
  opticalAlign?: Boolean,
};

const StyledIcon = styled.span`
  display: inline-block;
  vertical-align: ${props => (props.opticalAlign ? '-.25ex' : 'middle')};

  > svg {
    display: block;
  }
`;

const Icon = (props: Props) => {
  const { name, opticalAlign, ...other } = props;

  const IconSvg = require(`./icons/${name}.js`).default;

  // const Icon = StyledIcon.withComponent(IconSvg);

  return (
    <StyledIcon opticalAlign={opticalAlign} {...other}>
      <IconSvg />
    </StyledIcon>
  );
};

export default Icon;
