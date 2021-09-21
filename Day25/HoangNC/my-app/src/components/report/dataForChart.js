import { useState, useEffect } from "react";
import { getTasks, getTags } from "../apis/apis";

export default function TimeTags() {
  const [tasks, setTask] = useState([]);
  const [tags, setTag] = useState([]);
  ///Lấy task
  useEffect(() => {
    getTasks()
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Không thể kết nối tới server");
      });
  }, []);
  // Lấy Tags
  useEffect(() => {
    getTags()
      .then((res) => {
        setTag(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Không thể kết nối tới server");
      });
  }, []);

  const tagsInTask = tasks.map((task) => ({
    tags: task.tags,
    time_spent_tag:
      Math.round((task.time_spent / 3600 / task.tags.length) * 100) / 100,
  }));
  const TimePerTask = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    time_spent: 0,
  }));

  tagsInTask.map((task) => {
    TimePerTask.map((tag) => {
      if (task.tags.includes(tag.id)) {
        tag.time_spent += task.time_spent_tag;
      }
    });
  });
  return TimePerTask;
}
