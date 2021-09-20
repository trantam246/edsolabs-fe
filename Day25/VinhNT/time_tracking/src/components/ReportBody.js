import { Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import MenuDateRangePicker from './MenuDateRangePicker';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import image from '../public/assest/paper.jpg';
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    padding: theme.spacing(2),
  },
  bg: {
    backgroundImage: `url(${image})`,
  },
}));
const removeHead = (arr, end) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] > end) {
      continue;
    } else {
      return i;
    }
  }
};
const removeTail = (arr, start) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i][0] < start) {
      continue;
    } else {
      return i;
    }
  }
};
export default function ReportBody(props) {
  //   const [data, setData] = useState({});
  const [label, setLabel] = useState();
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const taskGroupByDays = Object.entries(
    props.task.reduce(function (r, a) {
      r[moment(a.start_time).format('YYYY-MM-DD')] =
        r[moment(a.start_time).format('YYYY-MM-DD')] || [];
      r[moment(a.start_time).format('YYYY-MM-DD')].push(a);
      return r;
    }, Object.create(null))
  ).sort(function (a, b) {
    return moment(b[0]).format('DD') - moment(a[0]).format('DD');
  });
  const onUpdate = (data) => {
    setStart(moment(data.startDate).format('YYYY-MM-DD'));
    setEnd(moment(data.endDate).format('YYYY-MM-DD'));
    if (data.label === undefined) {
      setLabel(
        `${moment(data.startDate).format('DD/MM/YYYY')}-${moment(
          data.endDate
        ).format('DD/MM/YYYY')}`
      );
    } else {
      setLabel(data.label);
    }
  };
  let sumMin = 0;
  let sumOnline = 0;
  let sumMeeting = 0;
  let sumTraining = 0;
  let sumCoding = 0;
  if (label !== undefined) {
    let a = removeHead(taskGroupByDays, end);
    if (a === undefined) alert('vui long chon khoang thoi gian khac');
    let b = removeTail(taskGroupByDays, start);
    let newArr = taskGroupByDays.slice(a, b + 1);
    newArr.forEach((e) => {
      e[1].forEach((o) => {
        if (o.time_spent === null) {
          sumMin += 0;
        } else {
          let sth = o.time_spent.split(' ');

          sumMin += parseInt(sth[0]);
        }
        for (let i = 0; i < o.tags.length; i++) {
          if (o.tags[i] === 1) {
            if (o.time_spent === null) {
              sumOnline += 0;
            } else {
              let sth = o.time_spent.split(' ');

              sumOnline += parseInt(sth[0]);
            }
          }
          if (o.tags[i] === 2) {
            if (o.time_spent === null) {
              sumMeeting += 0;
            } else {
              let sth = o.time_spent.split(' ');

              sumMeeting += parseInt(sth[0]);
            }
          }
          if (o.tags[i] === 3) {
            if (o.time_spent === null) {
              sumTraining += 0;
            } else {
              let sth = o.time_spent.split(' ');

              sumTraining += parseInt(sth[0]);
            }
          }
          if (o.tags[i] === 4) {
            if (o.time_spent === null) {
              sumCoding += 0;
            } else {
              let sth = o.time_spent.split(' ');

              sumCoding += parseInt(sth[0]);
            }
          }
        }
      });
    });
  }
  const classes = useStyle();
  return (
    <div className={classes.bg}>
      <div className={classes.root}>
        {label && (
          <Typography variant="h6">
            {sumMin > 180 ? (
              <>
                {label} : {Math.round((sumMin / 60) * 100) / 100} hours
              </>
            ) : (
              <>
                {label} : {sumMin} mins
              </>
            )}
          </Typography>
        )}
        <MenuDateRangePicker update={onUpdate} />
      </div>
      {label && (
        <div>
          <Paper className={classes.root}>
            <BarChart
              label={label}
              online={sumOnline}
              meeting={sumMeeting}
              training={sumTraining}
              coding={sumCoding}
            />
            <DoughnutChart
              sum={sumMin}
              online={sumOnline}
              meeting={sumMeeting}
              training={sumTraining}
              coding={sumCoding}
            />
          </Paper>
        </div>
      )}
    </div>
  );
}
