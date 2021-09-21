import moment from "moment";

// Format form
// DucNT 17.9.2021
export const TIME_DAY = (input) => {
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

//format ngày hôm nay
// DucNT 17.9.2021
export const formatDay = (date) => {
  // trả về ngày dưới dạng chuỗi format theo khung giờ en-GB
  const a = new Date().toLocaleDateString("en-GB");
  if (a === new Date(date).toLocaleDateString("en-GB")) {
    return "Today" + " " + a;
  }
  if (date) {
    const day = new Date(date);
    return day.toLocaleDateString("en-GB");
  }
  return;
};
// format thời điểm hiện tại
// DucNT 17.9.2021
export const formatNowDay = (date) => {
  if (date) {
    const day = new Date(date);
    return day.toISOString().split("T")[0];
  }
  return;
};
//format giờ : phút
// DucNT 17.9.2021
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

// Chọn tag khi nhấn vào icon tags
// Duc NT 17.9.2021

export const chooseTag = (online, meeting, training, coding) => {
  const arr = [];
  if (online) {
    arr.push(1);
  }
  if (meeting) {
    arr.push(2);
  }
  if (training) {
    arr.push(3);
  }
  if (coding) {
    arr.push(4);
  }
  return arr;
};

// format lại định dạng sang giồ phút
// DucNT 17.9.2021
export const formatTimeSpent = (e) => {
  if (e < 60) {
    return `${Math.floor(e)} mins`;
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
// Render dữ liệu của tags
// DucNT 17.9.2021
export const renderTags = (i) => {
  if (!i) return;
  const listTag = ["Online", "Meeting", "Training", "Coding"];
  const tag = i.tags.map((i) => listTag[i - 1]);
  return tag;
};
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
