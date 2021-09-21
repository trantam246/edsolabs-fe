import React, { useContext, useState } from "react";
import { Box } from "@mui/system";
import { DataContext } from "../context/dataContent";
import TaskADay from "./taskADay";
import moment from "moment";

function DataTask(props) {
  const dataTasks = useContext(DataContext);
  const { listTasks } = dataTasks;
  const {valueFiterDate} = props;

  let filterDay = [];
  listTasks.forEach((x) => {
    if (!filterDay.includes(x.start_time)) {
        filterDay.push(x.start_time)
    }
  });
  if (valueFiterDate) {
    filterDay = filterDay.filter(x =>  moment(x).format("DD/MM/YYYY") === moment(valueFiterDate).format("DD/MM/YYYY"))
  }
  const dataADay = {
    filterDay,
    listTasks,
    valueFiterDate
  }
  return (
      <Box>
         <TaskADay dataADay={dataADay}/>
      </Box>
  ) 
}

export default DataTask;
