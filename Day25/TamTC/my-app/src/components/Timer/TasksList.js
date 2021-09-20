import React, { useState } from "react"
import Task from "./Task"
import dayjs from "dayjs"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Button from "@material-ui/core/Button"
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
  btn: {
    margin: "2rem auto",
    display: "flex",
  },
}))

export default function TasksList(props) {
  const classes = useStyles()
  const [visible, setVisible] = useState(5)
  const loadMore = () => {
    setVisible((prev) => prev + 5)
  }
  const days = [
    ...new Set(
      props.tasks?.map((day) => dayjs(day.start_time).format("DD/MM/YYYY"))
    ),
  ]

  const daysGroup = days
    .reverse()
    .map((day) =>
      props.tasks?.filter(
        (d) => dayjs(d.start_time).format("DD/MM/YYYY") === day
      )
    )
  const handleDeleteTask = (newTasks) => {
    props.onDeleted(newTasks)
  }
  return (
    <>
      {daysGroup.slice(0, visible).map((ul, idx) => (
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
                  id={item.id}
                  desc={item.description}
                  start={item.start_time}
                  end={item.end_time}
                  spent={item.time_spent}
                  tagsDesc={item.tags_desc}
                  status={item.status}
                  tasks={props.tasks}
                  onDeleted={handleDeleteTask}
                />
              )
            })}
          </List>
        </div>
      ))}
      {daysGroup.slice(0, visible).length === visible && (
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          type="button"
          onClick={loadMore}
        >
          Load more
        </Button>
      )}
    </>
  )
}
