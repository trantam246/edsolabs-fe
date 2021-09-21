import { Box } from '@material-ui/core';
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