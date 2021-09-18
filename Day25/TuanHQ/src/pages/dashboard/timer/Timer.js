import { Box, Typography } from '@material-ui/core';
import DateFilter from 'components/date-filter/DateFilter';
import ListTask from 'components/list-task/ListTask';
import { useTaskContext } from 'contexts/TaskContext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const getDay = (tasks) => {
  const listDay = [
    ...new Set(
      tasks.map((task) => moment(task.start_time).format('DD/MM/YYYY'))
    ),
  ];

  listDay.sort((a, b) => b.split('/').join('') - a.split('/').join(''));
  return listDay;
};

const Timer = () => {
  const { tasks } = useTaskContext();

  const listDaysInit = getDay(tasks);

  const [listDays, setListDays] = useState(listDaysInit);
  const [listTasks, setListTasks] = useState(tasks);

  useEffect(() => {
    setListDays(getDay(tasks));
    setListTasks(tasks);
  }, [tasks]);

  console.log();
  return (
    <div>
      <DateFilter />

      {listDays.map((day, index) => {
        const tasksInDay = listTasks.filter(
          (task) => moment(task.start_time).format('DD/MM/YYYY') === day
        );

        return (
          <Box px={2} pt={1} key={index}>
            <Typography variant="subtitle1" gutterBottom>
              {day === moment().format('DD/MM/YYYY') ? 'Today' : day}
            </Typography>
            <ListTask tasksInDay={tasksInDay} />
          </Box>
        );
      })}
    </div>
  );
};

export default Timer;
