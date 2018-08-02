import * as React from 'react';
import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import Clients from '../Clients/Clients';

export default () => (
  <ComponentWrapper>
    <div style={{ flex: 1 }}>
      <Clients />
    </div>
  </ComponentWrapper>
);
