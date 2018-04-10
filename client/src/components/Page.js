// @flow
import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

type Props = {
  children: React.node,
};
const Page = (props: Props) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Page;
