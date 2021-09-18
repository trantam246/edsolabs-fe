import moment from 'moment';

export const HEADER_TIMER = 'timer';
export const HEADER_REPORT = 'report';

export const PROCESS_DAY_GROUP = (input) => {
  const output = [];

  input.forEach((item) => {
    const index = output.findIndex((_item) => {
      return (
        new Date(_item.date).toDateString() ===
        new Date(item.start_time).toDateString()
      );
    });
    if (index === -1) {
      const newItem = {
        date: item.start_time,
        tasks: [],
      };
      output.push(newItem);
      output[output.length - 1].tasks.push(item);
    } else {
      output[index].tasks.push(item);
    }
  });

  return output;
};

export const GROUP_5_DAY = (arrGroup) => {
  const group5days = [...arrGroup].splice(0, 5);
  return group5days;
};

export const FILTER_DATE = (dayGroupTask, dateFilter) => {
  return dayGroupTask.filter((item) => item.date.slice(0, 10) === dateFilter);
};

export const REPORT_SLICE_DAY = (numDay) => {
  return moment(moment().subtract(numDay, 'days')._d)
    .format('YYYY-MM-DD h:mm:ss')
    .slice(0, 10);
};

export const GET_CURRENT_WEEK = () => {
  var weekStart = moment(moment().startOf('week')).format('YYYY-MM-DD'); // start day of this week
  var days = [];

  for (var i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));
  }
  return days;
};

export const GET_LAST_WEEK = () => {
  var lastWeekStart = moment(
    moment().startOf('week').subtract(1, 'weeks'),
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

export const GET_DATE_RANGE = (startDate, endDate, type) => {
  let fromDate = moment(startDate);
  let toDate = moment(endDate);
  let diff = toDate.diff(fromDate, type);
  let range = [];
  for (let i = 0; i < diff; i++) {
    range.push(moment(startDate).add(i, type).format('YYYY-MM-DD'));
  }
  return range;
};
