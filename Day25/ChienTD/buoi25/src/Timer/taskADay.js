import React from "react";
import { Box } from "@mui/system";
import OneTask from "./OneTask";
import moment from "moment";

const TaskADay = (props) => {
  const { filterDay, listTasks } = props.dataADay;
  const tasks = [...listTasks];
  return (
    <Box mt={3}>
      {filterDay.map((element) => {
          const taskDay = 
          <Box key={Math.random()} component="h4" m={0} textAlign='left' mb={2}>
              <Box>{moment(element).format('DD/MM/YYYY')}</Box>
              {
                  listTasks.map(x => {
                      if (x.start_time === element) {
                          return (
                              <Box key={x.id}>
                                  <OneTask valueTask={x}/>
                              </Box>
                          )
                      }
                  })
              }
          </Box>
          return taskDay
      })}
    </Box>
  );
};

export default TaskADay;
