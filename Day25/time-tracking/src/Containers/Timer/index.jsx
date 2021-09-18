import { Grid } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import dataApi from '../../api/dataApi';
import { DetailTimerComponent } from '../../Components/DetailTimerComponent';
import { HeaderComponent } from '../../Components/HeaderComponent';
import { PROCESS_DAY_GROUP } from '../../constants';

export const Timer = () => {
  const [showTaskAction, setShowTaskAction] = useState(false);
  const [tagAction, setTagAction] = useState([]);
  const [dayGroupTask, setDayGroupTask] = useState([]);
  const [appPlay, setAppPlay] = useState(false);
  const [valueDescription, setValueDescription] = useState(
    'What are you working on ?',
  );
  const [taskValue, setTaskValue] = useState({
    description: 'What are you working on ?',
    start_time: '',
    end_time: '',
    time_spent: '',
    tags: [],
    status: 0,
  });
  const [moreTaskStatus, setMoreTaskStatus] = useState(false);
  const [dateFilter, setDateFilter] = useState('');

  const handleShowTask = () => {
    setShowTaskAction(true);
  };

  const handlePlayApp = () => {
    if (taskValue.tags.length <= 0) {
      alert('Bạn cần chọn ít nhất 1 tag làm việc !');
    } else {
      setAppPlay(!appPlay);
      setTaskValue({
        ...taskValue,
        start_time: moment().format('YYYY-MM-DD h:mm:ss'),
        status: 0,
      });

      // add task to api to reRender

      dataApi
        .addTask({
          ...taskValue,
          start_time: moment().format('YYYY-MM-DD h:mm:ss'),
        })
        .then((res) => {
          dataApi
            .getTasks()
            .then((res) => setDayGroupTask(PROCESS_DAY_GROUP(res.data)));
        });
    }
  };

  const handleStop = () => {
    setAppPlay(!appPlay);
    setShowTaskAction(false);
    setTaskValue({
      ...taskValue,
      tags: [],
      end_time: moment().format('YYYY-MM-DD h:mm:ss'),
      status: 1,
    });

    dataApi.getTasks().then((res) => {
      dataApi.deleteTask(res.data.length).then((res) => {
        dataApi
          .addTask({
            ...taskValue,
            end_time: moment().format('YYYY-MM-DD h:mm:ss'),
            status: 1,
          })
          .then((res) => {
            dataApi.getTasks().then((res) => {
              setDayGroupTask(PROCESS_DAY_GROUP(res.data));
            });
          });
      });
    });
  };

  const handleAddTag = (tagId) => {
    if (taskValue.tags.includes(tagId) === false) {
      setTaskValue({
        ...taskValue,
        tags: [...taskValue.tags, tagId],
      });
    }
  };

  const handleChangeInputValue = (e) => {
    setValueDescription(e.target.value);
    setTaskValue({ ...taskValue, description: e.target.value });
  };

  const handleTimeSpend = (minutes) => {
    setTaskValue({ ...taskValue, time_spent: `${minutes} mins` });
  };

  const handleLoadMore = () => {
    setMoreTaskStatus(!moreTaskStatus);
  };

  const handleDateFilter = (e) => {
    setDateFilter(e.target.value);
  };

  const handleOnChooseYesDeleteTask = (idDelete) => {
    dataApi.deleteTask(idDelete).then((res) => {
      dataApi
        .getTasks()
        .then((res) => setDayGroupTask(PROCESS_DAY_GROUP(res.data)));
    });
  };

  useEffect(() => {
    dataApi.getTags().then((res) => {
      setTagAction(res.data);
    });
  }, []);

  useEffect(() => {
    // call API list task
    dataApi.getTasks().then((res) => {
      const dataArr = res.data;
      setDayGroupTask(PROCESS_DAY_GROUP(dataArr));
    });
  }, []);

  dayGroupTask.sort((a, b) => {
    a = new Date(a.date);
    b = new Date(b.date);
    return b - a;
  });

  return (
    <Grid item xs={10}>
      <HeaderComponent
        showTaskAction={showTaskAction}
        onShowTask={handleShowTask}
        taskAction={tagAction}
        appPlay={appPlay}
        onPlayApp={handlePlayApp}
        onStop={handleStop}
        valueDescription={valueDescription}
        onChangeInput={handleChangeInputValue}
        onHandleTimeSpend={handleTimeSpend}
        onAddTag={handleAddTag}
      />

      <DetailTimerComponent
        dayGroupTask={dayGroupTask}
        tagAction={tagAction}
        onLoadMore={handleLoadMore}
        moreTaskStatus={moreTaskStatus}
        onFilter={handleDateFilter}
        dateFilter={dateFilter}
        onChooseYes={handleOnChooseYesDeleteTask}
      />
    </Grid>
  );
};
