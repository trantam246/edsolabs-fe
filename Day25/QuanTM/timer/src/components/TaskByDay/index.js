import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import moment from "moment";

import ActionMenu from "./ActionMenu";

const useStyles = makeStyles((theme) => ({
  typo: {
    fontWeight: theme.typography.fontWeightBold,
  },
  listItem: {
    backgroundColor: theme.palette.grey[400],
  },
  taskTitle: {
    flexBasis: "50%",
    flexShrink: 0,
  },
  tag: {
    "& span": {
      display: "flex",
      gap: theme.spacing(1),
    },
  },
}));

export default function TaskByDay(props) {
  const classes = useStyles();
  const { tasks, date } = props;

  const renderList = () => {
    return tasks.map((task) => {
      return (
        <ListItem className={classes.listItem} key={task.id}>
          <ListItemText className={classes.taskTitle}>
            {task.description}
          </ListItemText>
          <ListItemText className={classes.tag}>
            <LocalOfferIcon />
            {task.tags.map((tag) => tag.name).join(", ")}
          </ListItemText>
          <ListItemText>{`${task.start_time} - ${
            task.end_time || ""
          }`}</ListItemText>
          <ListItemText>{task.time_spent || "In Progress"}</ListItemText>
          <ListItemSecondaryAction>
            <ActionMenu task={task} />
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <article>
      <Typography
        className={classes.typo}
        variant="subtitle1"
        component="h4"
        color="primary"
        gutterBottom
      >
        {moment().format("DD/MM/YYYY") === date ? "Today" : date}
      </Typography>
      <List>{renderList()}</List>
    </article>
  );
}
