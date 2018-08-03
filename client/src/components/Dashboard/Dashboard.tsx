import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import Clients from '../Clients/Clients';
import { History } from 'history';

export default (props: { history: History }) => (
  <ComponentWrapper>
    <div style={{ flex: 1 }}>
      <Clients {...props} />
    </div>
  </ComponentWrapper>
);
