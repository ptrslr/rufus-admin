// @flow
import * as React from 'react';
import styled from 'styled-components';

const Body = styled.div`
  height: 100%;
  overflow-y: auto;
`;
const BodyInner = styled.div`
  height: 100%;
  padding: ${props => (props.padding ? props.padding : '2rem 1rem 0 2rem')};
`;
type Props = {
  children: React.Node,
  padding?: string,
};
const PageBody = (props: Props) => {
  return (
    <Body>
      <BodyInner padding={props.padding}>{props.children}</BodyInner>
    </Body>
  );
};

export default PageBody;
