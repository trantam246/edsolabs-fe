import moment from 'moment';

export const GET_TODAY = () => {
  return [moment().format('YYYY-MM-DD').toString()];
};

export const GET_YESTERDAY = () => {
  return [moment().subtract(1, 'days').format('YYYY-MM-DD').toString()];
};

export const GET_CURRENT_WEEK = () => {
  var weekStart = moment(moment().startOf('isoweek')).format('YYYY-MM-DD'); // start day of this week
  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
  }
  return days;
};

export const GET_LAST_WEEK = () => {
  var lastWeekStart = moment(
    moment().startOf('isoweek').subtract(1, 'weeks'),
  ).format('YYYY-MM-DD');
  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(lastWeekStart).add(i, 'days').format('YYYY-MM-DD'));
  }

  return days;
};

export const GET_THIS_MONTH = () => {
  var thisMonthStart = moment(moment().startOf('month')).format('YYYY-MM-DD');
  var days = [];

  const dem = Number(moment(moment().endOf('month')).format('DD'));

  for (var i = 0; i < dem; i++) {
    days.push(moment(thisMonthStart).add(i, 'days').format('YYYY-MM-DD'));
  }

  return days;
};

export const GET_LAST_MONTH = () => {
  var lastMonthStart = moment(
    moment().startOf('month').subtract(1, 'months'),
  ).format('YYYY-MM-DD');
  var days = [];

  const dem = Number(
    moment().subtract(1, 'months').endOf('month').format('DD'),
  );

  for (var i = 0; i < dem; i++) {
    days.push(moment(lastMonthStart).add(i, 'days').format('YYYY-MM-DD'));
  }

  return days;
};
