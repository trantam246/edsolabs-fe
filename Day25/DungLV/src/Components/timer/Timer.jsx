import { Button } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FaTags } from 'react-icons/fa';
import ButtonOption from '../task/ButtonOption';
import Calen from './Calen';
import CountTimer from './countTime.js';
import useStyles from './styleofTimer';
import Tags from './Tags';

export default function Timer() {
  const classes = useStyles();
  const [listTask, setListTask] = useState([]);
  const [listTags, setListTags] = useState([]);
  const [isOn, setIsOn] = useState(true);
  const [statusTask, setStatusTask] = useState(true);
  const [formTask, setFormTask] = useState({
    description: 'What are you working on? ',
    start_time: '',
    end_time: '',
    time_spent: '',
    tags: [],
    status: '',
  });
  const [dataSearch, setDataSearch] = useState('');
  //get API
  const url = process.env.REACT_APP_URL;
  useEffect(() => {
    fetch(`${url}tasks`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        setListTask(result);
      });
  }, []);
  useEffect(() => {
    fetch(`${url}tags`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((result) => {
        setListTags(result);
      });
  }, []);

  //
  const reListDel = (data) => {
    setListTask(data);
  };
  //Set group
  const dayGroup = () => {
    const output = [];
    listTask.forEach((item) => {
      const index = output.findIndex((_item) => {
        return (
          new Date(_item.date).toDateString() ===
          new Date(item.start_time).toDateString()
        );
      });
      if (index === -1) {
        const newItem = {
          date: item.start_time,
          tasks: [],
        };
        output.push(newItem);
        output[output.length - 1].tasks.push(item);
      } else {
        output[index].tasks.push(item);
      }
    });
    return output;
  };
  //render task
  const renderTasks = dayGroup().map((item) => {
    const dates = moment(item.date).format('MM DD YYYY').split(' ').join('/');
    const month = new Date().getMonth() + 1;
    const datesToday = `0${month}/${new Date().getDate()}/${new Date().getFullYear()}`;

    const listTasks = item.tasks.map((task, index) => {
      return (
        <div key={index} className={classes.box__task}>
          <div className={classes.element_task}>
            <div className={classes.nameDes}>{task.description}</div>
            <div className={classes.optionsTask}>
              <div className={classes.iconTask}>
                <FaTags />
              </div>
              <div className={classes.taskPick}>
                {task.tags.map((item) => {
                  return listTags.map((e, i) => {
                    if (item === e.id) {
                      return (
                        <div key={i} className={classes.tagpick}>
                          {e.name},
                        </div>
                      );
                    }
                  });
                })}
              </div>
              <div className={classes.timeCount}>
                <i>
                  {task.start_time} - {task.end_time}
                </i>
              </div>
              <div className={classes.totalTime}>{task.time_spent} mins</div>
              <div className={classes.btn}>
                <ButtonOption valueTaskDel={task} reListDel={reListDel} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {dataSearch === '' ? (
          <>
            <div className={classes.dayTasks}>
              {dates === datesToday ? 'Today' : dates}
            </div>
            {listTasks.reverse()}
          </>
        ) : null}
        {dataSearch === dates ? (
          <>
            <div>{dates === datesToday ? 'Today' : dates}</div>
            {listTasks.reverse()}
          </>
        ) : null}
      </div>
    );
  });
  //btn load more
  const show5day = () => {
    setIsOn(true);
    setStatusTask(true);
  };
  const showALLday = () => {
    setIsOn(false);
    setStatusTask(false);
  };
  //hàm lấy giá trị ô input
  const getValueDes = (valueDes) => {
    setFormTask({ ...formTask, description: valueDes.target.value });
  };
  //hàm lấy giá trị của tag
  const valueTags = (valueTags) => {
    if (formTask.tags.includes(valueTags) === false) {
      formTask.tags.push(valueTags);
    } else {
      return;
    }
    setFormTask({ ...formTask });
  };
  //hàm lấy time của task
  const valueCountTime = (valueTime) => {
    const minutes = new Date(valueTime * 1000).toISOString().substr(14, 5);
    setFormTask({ ...formTask, time_spent: minutes });
  };
  //hàm lấy Day và giờ bắt đầu
  const valueStartTime = (valueCurrentTime) => {
    setFormTask({ ...formTask, start_time: valueCurrentTime });
  };
  //hàm lấy day và giờ kết thúc
  const valueEndTime = (timeEndValue) => {
    const data = formTask;
    data.end_time = timeEndValue;
    setFormTask(data);
  };
  //hàm lấy value filter day
  const valueFilterDate = (value) => {
    setDataSearch(value);
  };

  //sau khi chạy stop sẽ re-render lại thanh header//
  const re_render = (dataRender) => {
    setFormTask(dataRender);
  };
  //thêm dữ liệu vào API khi START
  const returnData = (data) => {
    setListTask(data);
  };
  //sửa giá trị vào API khi stop
  const returnDataPut = (data) => {
    setListTask(data);
  };
  // btn render lại list khi filter
  const renderList = () => {
    setDataSearch('');
  };
  return (
    <div className={classes.timer}>
      <div className={classes.header}>
        <input
          className={classes.input}
          value={formTask.description}
          onChange={getValueDes}
          style={{
            outline: 'none',
            fontFamily: 'Glory',
            fontWeight: '600',
            fontSize: '45px',
            width: '500px',
          }}
        />
        <div className={classes.options}>
          <Tags valueTags={valueTags} />
          <div className={classes.time}>
            <CountTimer
              valueEndTime={valueEndTime}
              valueStartTime={valueStartTime}
              valueCountTime={valueCountTime}
              re_render={re_render}
              dataTask={formTask}
              returnData={returnData}
              returnDataPut={returnDataPut}
            />
          </div>
        </div>
      </div>
      <div className={classes.boxBody}>
        <div className={classes.subtitle}>
          <div className={classes.datefilter}>Date Filter</div>
          <Calen valueFilterDate={valueFilterDate} />
        </div>
        <Button className={classes.backtoTask} onClick={renderList}>
          Back to List Tasks
        </Button>

        <div>
          {statusTask
            ? renderTasks.reverse().splice(0, 5)
            : renderTasks.reverse()}
          {isOn ? (
            <div className={classes.btn}>
              <Button className={classes.btnLoad} onClick={showALLday}>
                Load MORE
              </Button>
            </div>
          ) : (
            <div className={classes.btn}>
              <Button className={classes.btnLoad} onClick={show5day}>
                Hide
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
