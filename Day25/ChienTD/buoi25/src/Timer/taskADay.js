import React, { useState } from "react";
import { Box } from "@mui/system";
import OneTask from "./OneTask";
import moment from "moment";

const TaskADay = (props) => {
  const { filterDay, listTasks, valueFiterDate } = props.dataADay;
  const [dateFilter, setDateFilter] = useState([]);
  const tasks = [...listTasks];
  // if (valueFiterDate) {
  //   console.log('filter>>', valueFiterDate)
  //   setDateFilter(filterDay.filter(x => moment(x).format("DD/MM/YYYY") === moment(valueFiterDate).format("DD/MM/YYYY")))
  // } else setDateFilter(filterDay)
  return (
    <Box mt={3}>
      {filterDay.map((element) => {
        const taskDay = (
          <Box key={Math.random()} component="h4" m={0} textAlign="left" mb={2}>
            {moment(element).format("DD/MM/YYYY") ===
            moment().format("DD/MM/YYYY") ? (
              <Box>Today</Box>
            ) : (
              <Box>{moment(element).format("DD/MM/YYYY")}</Box>
            )}
            {listTasks.map((x) => {
              if (x.start_time === element) {
                return (
                  <Box key={x.id}>
                    <OneTask valueTask={x} />
                  </Box>
                );
              }
            })}
          </Box>
        );
        return taskDay;
      })}
    </Box>
  );
};

export default TaskADay;
