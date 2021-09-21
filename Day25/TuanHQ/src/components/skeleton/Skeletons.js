import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

const Skeletons = () => {
  return (
    <Box p={2}>
      <Skeleton animation="wave" variant="circle" width={40} height={40} />
      <Skeleton variant="rect" />
      <Skeleton variant="rect" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  );
};

export default Skeletons;
