import React from "react";
import TaskPerDay from "./taskPerDay";
import { groupDay } from "../common/common";
import { useTaskContext } from "../common/taskContext";
import moment from "moment";

export default function Showtask(props) {
  const { task, limit } = props;
  const { value } = useTaskContext();
  console.log(moment(`${value}`).format("DD/MM/YYYY"));
  return (
    <>
      {groupDay(task)
        .slice(0, limit)
        .map((d, index) => {
          const tasksInDay = task.filter(
            (task) => moment(task.start_time).format("DD/MM/YYYY") === d
          );
          return (
            <div key={index}>
              <p>{d === moment().format("DD/MM/YYYY") ? "Today" : d}</p>
              <TaskPerDay tasksInDay={tasksInDay} />
            </div>
          );
        })}
    </>
  );
}
