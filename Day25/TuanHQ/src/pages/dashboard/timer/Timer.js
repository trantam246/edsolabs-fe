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

  const [dateFilter, setDateFilter] = useState('');

  const getDateFilter = (value) => {
    setDateFilter(moment(value).format('DD/MM/YYYY'));
    // console.log(moment(value).format('DD/MM/YYYY'));
  };

  const refreshData = () => {
    setDateFilter('');
  };

  useEffect(() => {
    setListDays(getDay(tasks));
    setListTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (dateFilter.trim() !== '') {
      const day = getDay(tasks).filter((d) => d === dateFilter);
      setListDays(day);
    } else {
      setListDays(getDay(tasks));
    }
  }, [tasks, dateFilter]);

  return (
    <div>
      <DateFilter getDateFilter={getDateFilter} refreshData={refreshData} />

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
