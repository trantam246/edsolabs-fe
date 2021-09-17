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
    return `${e} mins`;
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
