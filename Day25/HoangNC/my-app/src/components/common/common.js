import { withStyles } from "@mui/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const getUser = () => {
  const userStr = localStorage.getItem("name");
  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
};

export const setUserLocal = (name, avt) => {
  localStorage.setItem("name", JSON.stringify(name));
  localStorage.setItem("avatar", JSON.stringify(avt));
};

export const removeUserLocal = () => {
  localStorage.removeItem("user");
};

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

export const groupDay = (task) => {
  const dayGroup = [];
  task.forEach((item) => {
    const index = dayGroup.findIndex((i) => {
      return (
        new Date(i.date).toLocaleTimeString() ===
        new Date(item.start_time).toLocaleTimeString()
      );
    });
    if (index === -1) {
      const newItem = {
        date: item.start_time,
        tasks: [],
      };
      dayGroup.push(newItem);
      dayGroup[dayGroup.length - 1].tasks.push(item);
    } else {
      dayGroup[index].tasks.push(item);
    }
  });
  return dayGroup;
};

export const formatDay = (date) => {
  const a = new Date().toLocaleDateString();
  if (a === new Date(date).toLocaleDateString()) {
    return "Today";
  }
  if (date) {
    const day = new Date(date);
    return day.toLocaleDateString();
  }
  return;
};

export const renderTags = (i) => {
  if (!i) return;
  const listTag = [" Online ", " Meeting ", " Training ", " Coding "];
  const tag = i.tags.map((i) => listTag[i - 1]);
  return tag;
};

export const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    padding: "0 8px",
    boxShadow: "3px -3px #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      // backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        // color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
