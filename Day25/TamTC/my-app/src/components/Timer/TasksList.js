import React from "react"
import Task from "./Task"
import dayjs from "dayjs"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  task__list: {
    backgroundColor: "transparent !important",
    marginBottom: "2rem !important",
    boxShadow: "rgb(100 100 111 / 40%) 0 0.7rem 2.9rem 0",
    padding: "0!important",
    [`& p`]: {
      fontSize: "1.6rem",
    },
  },
  date__group: {
    fontSize: "2rem !important",
  },
}))

export default function TasksList(props) {
  const classes = useStyles()
  const days = [
    ...new Set(
      props.tasks?.map((day) => dayjs(day.start_time).format("DD/MM/YYYY"))
    ),
  ]

  const daysGroup = days.map((day) =>
    props.tasks?.filter((d) => dayjs(d.start_time).format("DD/MM/YYYY") === day)
  )

  return daysGroup.map((ul, idx) => (
    <div key={idx}>
      <Typography className={classes.date__group}>
        {dayjs().format("DD/MM/YYYY") === days[idx] ? "Today" : days[idx]}
      </Typography>
      <List
        key={idx}
        sx={{ width: "100%", bgcolor: "background.paper" }}
        className={classes.task__list}
      >
        {ul?.reverse().map((item, idx) => {
          return (
            <Task
              key={idx}
              desc={item.description}
              start={item.start_time}
              end={item.end_time}
              spent={item.time_spent}
              tagsDesc={item.tags_desc}
              status={item.status}
            />
          )
        })}
      </List>
    </div>
  ))
}
