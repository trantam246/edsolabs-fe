import React, {useState, useEffect} from "react";
import { Box } from "@mui/system";
import TagMenu from "./tags";
import Clock from "./clock";
import DataTask from "./dataTask";
import "./time.css";
import TasksApi from "../API/tasksApi";

function Time(props) {
  // Khởi tạo useState
  const [description, SetDescription] = useState();
  const [tag, setTag] = useState([]);
  const [time, setTime] = useState();
  const [newTask, setNewTask] = useState({description: "", end_time: "", id: "", start_time: "", status: "", tags: [], time_spent: ""});

  // Sự kiện nhận dữ liệu
  const changeDescription = (e) => {
    SetDescription(e.target.value)
  }

  const valueTag = (props) => {
    setTag(props); 
  }

  const valueTime = (props) => {
    setTime(props);
  }

  useEffect(() => {
    const oldValueTask = {...newTask};
    return {
      oldValueTask,
      description: description,
      start_time: time,
      tags: tag
    }
  }, [description, time, tag, newTask]);  

  return (
    <Box>
      <Box display="flex" p={2} borderBottom={2} mt={0} mb={0}>
        <Box width="70%" textAlign="left">
          <input
            style={{
              border: "none",
              outline: "none",
              height: "40px",
              fontSize: "20px",
              fontWeight: "bold",
              width: "100%",
            }}
            placeholder="This is my task ?"
            onChange={changeDescription}
          />
        </Box>
        <Box width="30%" display="flex" textAlign="right" alignItems="center">
          <TagMenu valueTag={valueTag}/>
          <Clock valueDes={description} valueTime={valueTime} valueTag={tag} />
        </Box>
      </Box>
      <Box p={5}>
        <Box className="filter-date" textAlign="left" fontWeight="bold">
          Data Filter: <Box component="input" type="date" />
        </Box>
        <DataTask />
      </Box>
    </Box>
  );
}

export default Time;
