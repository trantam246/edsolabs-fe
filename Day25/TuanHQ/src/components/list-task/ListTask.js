import { Box } from '@material-ui/core';
import SingleTask from 'components/single-task/SingleTask';
import React from 'react';
import moment from 'moment';

const ListTask = ({ tasksInDay }) => {
  tasksInDay.sort(
    (a, b) =>
      moment(b.start_time).format('HH:mm:ss').split(':').join('') -
      moment(a.start_time).format('HH:mm:ss').split(':').join('')
  );
  return (
    <Box>
      {tasksInDay.map((task, idx) => (
        <SingleTask task={task} key={idx} />
      ))}
    </Box>
  );
};

export default ListTask;
