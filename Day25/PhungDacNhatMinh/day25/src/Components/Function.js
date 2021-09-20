import moment from "moment";
//data by date
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

//formatday
export const formatDay = (date) => {
  const a = new Date().toLocaleDateString("en-GB");
  if (a === new Date(date).toLocaleDateString("en-GB")) {
    return "today";
  }
  if (date) {
    const day = new Date(date);
    return day.toLocaleDateString("en-GB");
  }
  return;
};
export const formatNowDay = (date) => {
  if (date) {
    const day = new Date(date);
    return day.toISOString().split("T")[0];
  }
  return;
};

//formatTime
export const formatTime = (e) => {
  if (e) {
    const d = new Date(e); // for now
    const time =
      `0${d.getHours()}`.slice(-2) + ":" + `0${d.getMinutes()}`.slice(-2);
    return time;
  }
  return;
};

//handleClick
export const handleClickTimeFormat = () => {
  const x = new Date();
  const timeFormat = `${formatNowDay(x)} ${formatTime(x)}`;
  return timeFormat;
};

// chooseTag
export const chooseTag = (a, b, c, d) => {
  const arr = [];
  if (a) {
    arr.push(1);
  }
  if (b) {
    arr.push(2);
  }
  if (c) {
    arr.push(3);
  }
  if (d) {
    arr.push(4);
  }
  return arr;
};

// formatTimeSpent
export const formatTimeSpent = (e) => {
  if (e < 60) {
    let m = Math.floor(e);
    return `${m} mins`;
  } else if (e < 1440 && 60 < e) {
    let h = Math.floor(e / 60);
    let m = Math.floor(e % 60);
    return `${h} hours ${m} mins`;
  } else if (e > 1440) {
    let d = Math.floor(e / 1440);
    let h = Math.floor((e % 1440) / 60);
    let m = Math.floor((e % 60) % 60);
    return `${d} days ${h} hours ${m} mins`;
  }
};

//renderTags
export const renderTags = (i) => {
  if (!i) return;
  const listTag = ["Online", "Meeting", "Training", "Coding"];
  const tag = i.tags.map((i) => listTag[i - 1]);
  return tag;
};

//duration
export const durationMins = (e) => {
  let now = moment(e);
  let end = moment(new Date());
  let d = moment.duration(end.diff(now));
  let days = d.asDays();
  let mins = days * 1440;
  return mins;
};

//duration 2 days
export const durationMins2Days = (a, b) => {
  let now = moment(a);
  let end = moment(b);
  let d = moment.duration(end.diff(now));
  let days = d.asDays();
  let mins = days * 1440;
  return mins;
};

//week
let weekStart = moment().clone().startOf("week");

//this week
export const getThisWeek = () => {
  let thisDays = [];
  for (let i = 2; i <= 8; i++) {
    thisDays.push(formatNowDay(moment(weekStart).add(i, "days")));
  }
  return thisDays;
};
//last week
export const getLastWeek = () => {
  let lastDays = [];
  for (let i = 1; i >= -5; i--) {
    lastDays.push(formatNowDay(moment(weekStart).add(i, "days")));
  }
  return lastDays;
};

//month
let i = 0;
let j = 0;
let monthStart = moment().format("MMM");
switch (monthStart) {
  case "Jan":
    i = 31;
    j = 30;
    break;
  case "Mar":
    i = 31;
    j = 27;
    break;
  case "May":
  case "Jul":
  case "Aug":
  case "Oct":
  case "Dec":
    i = 31;
    j = 29;
    break;
  case "Apr":
  case "Jun":
  case "Sep":
  case "Nov":
    i = 30;
    j = 30;
    break;
  case "Feb":
    i = 28;
    j = 30;
    break;

  default:
    break;
}
let month = moment().clone().startOf("month");
//this month
export const getThisMonth = () => {
  let thisDays = [];
  for (let x = 1; x <= i; x++) {
    thisDays.push(formatNowDay(moment(month).add(x, "days")));
  }
  return thisDays;
};
//last month
export const getLastMonth = () => {
  let lastDays = [];
  for (let y = 0; y >= -j; y--) {
    lastDays.push(formatNowDay(moment(month).add(y, "days")));
  }
  return lastDays;
};
