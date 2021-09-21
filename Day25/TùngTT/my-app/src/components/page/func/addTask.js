import React, {useState} from 'react';
import dataFunction from './dataFunction';
import moment from 'moment';

const Add = () => {
  const tasks = {
    id: null,
    description: "",
    start_time: "",
    end_time: "",
    time_spent: "30 mins",
    tags: [],
    status: null
  };
  const [getTask, setTask] = useState(tasks);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...getTask, [name]: value });
  };

  const saveTask = () => {
    var data = {
      description: getTask.description,
      tags: getTask.tags,
      start_time: moment().format('YYYY-MM-DD HH:mm:s')
    };

    dataFunction.create(data)
      .then(response => {
        setTask({
          id: response.data.id,
          description: response.data.description,
          start_time: response.data.start_time,
          end_time: response.data.end_time,
          time_spent: response.data.time_spent,
          tags: response.data.tags,
          status: response.data.status
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTask = () => {
    setTask(tasks);
    setSubmitted(false);
  };
  return (
    submitted,
    getTask,
    saveTask,
    handleInputChange,
    newTask
  )
};

export default Add;