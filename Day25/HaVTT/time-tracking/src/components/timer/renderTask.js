import React from "react";
import moment from "moment";
import DropMenu from "./dropMenu";
import { groupDay } from "../layout/common";
import { useTaskContext } from "../layout/taskContext";

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
              <DropMenu tasksInDay={tasksInDay} />
            </div>
          );
        })}
    </>
  );
}