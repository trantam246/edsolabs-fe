import moment from "moment";

export const convertTimeSpent = (timeSpentMil) => {
  const utcTimeSpent = moment.utc(timeSpentMil);
  const hoursSpent = utcTimeSpent.hour();
  const minSpent = utcTimeSpent.minute();
  const timeSpent = timeSpentMil / 1000;
  if (timeSpent < 60) {
    return " Just a few seconds";
  }
  if (timeSpent === 86400) {
    return "A day";
  }
  if (timeSpent % 3600 === 0) {
    return `${timeSpent / 3600} hours`;
  }
  if (timeSpent / 60 < 60) {
    return `${Math.floor(timeSpent / 60)} min`;
  }
  return `${hoursSpent} hours ${minSpent} min`;
};

export const momentDate = (date) => moment(date, "YYYY-MM-DD HH:mm:s");

export const formatDate = (date, format = "YYYY-MM-DD") => {
  return momentDate(date).format(format);
};

export const getUniqDate = (tasks) => {
  const sortedList = tasks
    .map((task) => task.start_time)
    .sort((a, b) => -momentDate(a).diff(momentDate(b)))
    .map((item) => formatDate(item, "DD/MM/YYYY"));
  return [...new Set(sortedList)];
};

export const handleDifferentDate = (start, end) => {
  let start_time = start.format("YYYY-MM-DD HH:mm:s"),
    end_time,
    time_spent;
  const dayDifference = end.diff(start, "days");
  if (dayDifference !== 0) {
    end_time = start.format("YYYY-MM-DD 23:59:59");
    time_spent = momentDate(end_time).diff(start);
  } else {
    end_time = end.format("YYYY-MM-DD HH:mm:s");
    time_spent = end.diff(start);
  }
  return { start_time, end_time, time_spent };
};

export const calculateTimeDif = (start, end) => {
  const momentStart = momentDate(start);
  const momentEnd = momentDate(end);
  return momentEnd.diff(momentStart);
};

export const toServerDate = (date, type, format = "YYYY-MM-DD") => {
  let time = "HH:mm:s";
  if (type === "start") {
    time = "00:00:0";
  }
  if (type === "end") {
    time = "23:59:59";
  }
  return moment(date, format).format(`YYYY-MM-DD ${time}`);
};

export const convertDate = (date) => {
  switch (date) {
    case "Today": {
      const now = moment();
      const startDate = now.format("YYYY-MM-DD 00:00:1");
      const endDate = now.format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    case "Yesterday": {
      const yesterady = moment().subtract(1, "days");
      const startDate = yesterady.format("YYYY-MM-DD 00:00:1");
      const endDate = yesterady.format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    case "This week": {
      const currenDate = moment();
      const startDate = currenDate
        .startOf("isoWeek")
        .format("YYYY-MM-DD 00:00:1");
      const endDate = currenDate.endOf("isoWeek").format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    case "Last week": {
      const currenDate = moment().subtract(7, "days");
      const startDate = currenDate
        .startOf("isoWeek")
        .format("YYYY-MM-DD 00:00:1");
      const endDate = currenDate.endOf("isoWeek").format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    case "This month": {
      const currenDate = moment();
      const startDate = currenDate
        .startOf("month")
        .format("YYYY-MM-DD 00:00:1");
      const endDate = currenDate.endOf("month").format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    case "Last month": {
      const currenDate = moment().subtract(1, "months");
      const startDate = currenDate
        .startOf("month")
        .format("YYYY-MM-DD 00:00:1");
      const endDate = currenDate.endOf("month").format("YYYY-MM-DD 23:59:59");
      return { startDate, endDate };
    }
    default:
      return null;
  }
};
