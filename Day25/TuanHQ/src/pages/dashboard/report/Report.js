import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@material-ui/core';
import { useTaskContext } from 'contexts/TaskContext';
import BarChart from 'components/bar-chart/BarChart';
import DoughnutChart from 'components/doughnut-chart/DoughnutChart';
import React, { useEffect, useState } from 'react';
import { useTagContext } from 'contexts/TagContext';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const firstDay = moment(moment().startOf('week').toDate()).format('DD/MM/YYYY');
const lastDay = moment(moment().endOf('week').toDate()).format('DD/MM/YYYY');

const Productivity = () => {
  return (
    <div>
      <Paper>
        <Box height={60} display="flex" alignItems="center" p={2}>
          <Typography variant="h6" gutterBottom>
            Productivity report
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

const Report = () => {
  const classes = useStyles();
  const { playing, tasks } = useTaskContext();

  const { tags, callSnackbar } = useTagContext();

  const [filter, setFilter] = useState('All');
  const [valueFilter, setValueFilter] = useState(null);

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
    setValueFilter(null);

    if (event.target.value === 'Today') {
      setValueFilter(moment().format('DD/MM/YYYY'));
      callSnackbar(`Time do tags in ${event.target.value}`, 'success');
    } else {
      callSnackbar(
        `${event.target.value} - Functions in development`,
        'warning'
      );
    }
  };

  const getTagsInTasks = () => {
    // Lấy ra danh sách tags trong mỗi task, và thời gian cho mỗi tag
    // thời gian mỗi tag = tổng thời gian chia số tag, dổi về giờ
    // ngày thực hiện task này
    const tagsInTask = tasks.map((task) => {
      const o = {
        tags: task.tags,
        time_spent_tag:
          tags.time_spent !== null
            ? task.time_spent / task.tags.length / 3600
            : 0, //mins
        dayDoTask: moment(task.start_time).format('DD/MM/YYYY'),
      };
      return o;
    });

    return tagsInTask;
  };

  const minsTags = () => {
    let tagsInTask = getTagsInTasks();

    if (filter === 'Today') {
      tagsInTask = getTagsInTasks().filter(
        (task) => task.dayDoTask === valueFilter
      );
    }

    // console.log(tagsInTask);

    // khởi tạo lưu trữ, thông tin tag và tổng thời gian mỗi tag
    const spentTimeEachTag = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      total_time_spent: 0,
      day_do_tag: [],
    }));

    // duyệt từng task,
    tagsInTask.map((task) => {
      // duyệt từng tag trong danh sách vừa khởi tạo
      spentTimeEachTag.map((tag) => {
        // nếu trong danh sách task.tags có id của tag thì cộng thêm time_spent cho tag đó
        if (task.tags.includes(tag.id)) {
          tag.total_time_spent += task.time_spent_tag;
          tag.day_do_tag.push({
            day_name: task.dayDoTask,
            time_spent: task.time_spent_tag,
          });
        }
      });
    });
    // console.log(spentTimeEachTag);
    return spentTimeEachTag;
  };

  const [spentTimeEachTag, setSpentTimeEachTag] = useState(minsTags());
  // console.log(spentTimeEachTag);

  const totalTimeSpent = () => {
    const total = spentTimeEachTag.reduce(
      (prev, curr) => prev + curr.total_time_spent,
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    // console.log(valueFilter);
    setSpentTimeEachTag(minsTags());
  }, [valueFilter]);

  return (
    <div>
      {!playing && <Productivity />}
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Total: {totalTimeSpent()} hours
          </Typography>

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              onChange={handleChangeFilter}
            >
              <MenuItem value={'All'}>All</MenuItem>
              <MenuItem value={'Today'}>Today</MenuItem>
              <MenuItem value={'Yesterday'}>Yesterday</MenuItem>
              <MenuItem value={'This week'}>This week</MenuItem>
              <MenuItem value={'Last week'}>Last week</MenuItem>
              <MenuItem value={'This month'}>This month</MenuItem>
              <MenuItem value={'Last month'}>Last month</MenuItem>
              <MenuItem value={'Date range'}>Date range</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <DoughnutChart spentTimeEachTag={spentTimeEachTag} />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <BarChart spentTimeEachTag={spentTimeEachTag} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Report;
