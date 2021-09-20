import React, { useContext } from "react";
import { Box } from "@mui/system";
import { DataContext } from "../context/dataContent";
import TaskADay from "./taskADay";

function DataTask() {
  const dataTasks = useContext(DataContext);
  const { listTasks } = dataTasks;
  
  let filterDay = [];
  listTasks.forEach((x) => {
    if (!filterDay.includes(x.start_time)) {
        filterDay.push(x.start_time)
    }
  });
  const dataADay = {
    filterDay,
    listTasks
  }
  return (
      <Box>
         <TaskADay dataADay={dataADay}/>
      </Box>
  ) 
}

export default DataTask;
