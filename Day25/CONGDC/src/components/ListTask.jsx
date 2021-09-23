import { Box } from '@mui/material';
import SingleTask from '../components/SingleTask';
import React from 'react';

const ListTask = ({ tasksInDay }) => {
  return (
    <Box>
      {tasksInDay.map((task, idx) => (
        <SingleTask task={task} key={idx} />
      ))}
    </Box>
  );
};

export default ListTask;