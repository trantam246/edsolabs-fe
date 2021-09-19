import React from "react";
import moment from "moment";
import TaskPerDay from "./taskPerDay";
import { groupDay } from "../common/common";

export default function Showtask(props) {
  const { task, limit } = props;
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
