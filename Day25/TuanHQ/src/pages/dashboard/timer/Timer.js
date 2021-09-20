import { Box, Button, Typography } from '@material-ui/core';
import DateFilter from 'components/date-filter/DateFilter';
import ListTask from 'components/list-task/ListTask';
import { useTaskContext } from 'contexts/TaskContext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Skeletons from 'components/skeleton/Skeletons';

const getDay = (tasks) => {
  const listDay = [
    ...new Set(
      tasks.map((task) => moment(task.start_time).format('DD/MM/YYYY'))
    ),
  ];

  listDay.sort((a, b) => b.split('/').join('') - a.split('/').join(''));

  return listDay;
};

const dayPerPage = 5;
let holdingDays = [];

const Timer = () => {
  const { tasks, taskLoading } = useTaskContext();

  // danh sách các ngày có trong db
  const listDaysInit = getDay(tasks);

  const [listDays, setListDays] = useState([]);
  //danh sách sẽ hiển thị ra
  const [listTasks, setListTasks] = useState(tasks);

  const [dateFilter, setDateFilter] = useState('');

  const [next, setNext] = useState(5);

  const getDateFilter = (value) => {
    setDateFilter(moment(value).format('DD/MM/YYYY'));
    // console.log(moment(value).format('DD/MM/YYYY'));
  };

  const refreshData = () => {
    setDateFilter('');
    holdingDays = [];
    sliceListDays(0, dayPerPage);
    setNext(5);
  };

  const sliceListDays = (start, end, day = listDaysInit) => {
    const sliceDays = day.slice(start, end);
    holdingDays = [...holdingDays, ...sliceDays];
    setListDays(holdingDays);
  };

  const loadMoreDays = () => {
    sliceListDays(next, next + dayPerPage);
    setNext(next + dayPerPage);
  };

  useEffect(() => {
    sliceListDays(0, dayPerPage);
  }, []);

  useEffect(() => {
    // setListDays(getDay(tasks));
    // sliceListDays(0, dayPerPage);
    refreshData();
    setListTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (dateFilter.trim() !== '') {
      const day = getDay(tasks).filter((d) => d === dateFilter);
      setListDays(day);
    }
    // else {
    //   // sliceListDays(0, dayPerPage);
    // }
  }, [tasks, dateFilter]);

  return (
    <div>
      <DateFilter getDateFilter={getDateFilter} refreshData={refreshData} />

      {taskLoading && <Skeletons />}

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

      {listDays.length !== listDaysInit.length && dateFilter.trim() === '' && (
        <Box display="flex" justifyContent="center" my={2}>
          <Button variant="outlined" color="secondary" onClick={loadMoreDays}>
            Load more + {listDaysInit.length - next}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Timer;
