import * as React from 'react';
import { Typography } from '@material-ui/core';

interface TableHeadingProps {
  style?: any;
}

export default (props: TableHeadingProps) => (
  <>
    <Typography>ID</Typography>
    <Typography>Name</Typography>
    <Typography>Email</Typography>
    <Typography>Balance</Typography>
    <div />
  </>
);
