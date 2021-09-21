import React, { useState } from "react";
import PropTypes from "prop-types";
import Dots from "../dots.svg";
import FindDate from "./FindDate";
import {
  formatDay,
  formatTime,
  formatTimeSpent,
  renderTags,
  handleClickTimeFormat,
  durationMins,
} from "./Function";
import { deleteTasks, updateTasks, createTasks } from "../api/api";
import moment from "moment";
MyTasks.propTypes = {
  task: PropTypes.array.isRequired,
};

function MyTasks(props) {
  const { task } = props;
  const [filterDay, setFilterDay] = useState(null);
  return (
    <>
      <div className="m-4">
        <FindDate filterDay={(e) => setFilterDay(e)} />
      </div>
      {!filterDay
        ? task.map((item, index, array) => {
            return (
              <div key={index} className="myTask ms-4 mt-4">
                <p>{formatDay(item.date)}</p>
                <ul className="list-group col-11 ">
                  {item.tasks.map((e, index, arr) => {
                    return (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <div className="col-4">{arr[index].description}</div>
                        <div className="d-flex col-8 justify-content-between">
                          <div>
                            <i className="fas fa-tags me-2"></i>
                            {renderTags(arr[index])}
                          </div>
                          <div>
                            {formatTime(arr[index].start_time)}-
                            {arr[index].end_time
                              ? formatTime(arr[index].end_time)
                              : " loading"}
                          </div>
                          <div>
                            {arr[index].time_spent
                              ? arr[index].time_spent
                              : " loading "}
                          </div>
                          <div className="dropdown">
                            <img
                              src={Dots}
                              className=""
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              alt=""
                            />
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuButton1"
                            >
                              <li>
                                {arr[index].end_time ? (
                                  <p
                                    className="dropdown-item mb-0 border-bottom "
                                    onClick={() => {
                                      createTasks({
                                        description: arr[index].description,
                                        start_time: handleClickTimeFormat(),
                                        end_time: null,
                                        time_spent: null,
                                        tags: arr[index].tags,
                                        status: 0,
                                      });
                                    }}
                                  >
                                    Start
                                  </p>
                                ) : (
                                  <p
                                    className="dropdown-item mb-0 border-bottom "
                                    onClick={() => {
                                      let now = moment(arr[index].start_time);
                                      let end = moment(new Date());
                                      let duration = moment.duration(
                                        end.diff(now)
                                      );
                                      let days = duration.asDays();
                                      let mins = days * 1440;
                                      updateTasks(arr[index].id, {
                                        end_time: moment(
                                          new Date(),
                                          "MM-DD-YYYY HH:mm:ss",
                                          true
                                        ).format("YYYY-MM-DD HH:mm:ss"),
                                        time_spent: formatTimeSpent(mins),
                                        status: 1,
                                      });
                                    }}
                                  >
                                    Stop
                                  </p>
                                )}
                              </li>{" "}
                              <li
                                onClick={() => {
                                  // eslint-disable-next-line no-restricted-globals
                                  const quest = confirm(
                                    "Are you sure delete the Tasks deleted?"
                                  );
                                  quest && deleteTasks(arr[index].id);
                                }}
                              >
                                <p className="dropdown-item mb-0">Delete</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })
        : // eslint-disable-next-line array-callback-return
          task.map((item, id) => {
            if (formatDay(item.date) === filterDay) {
              return (
                <div key={id} className="myTask ms-4 mt-4">
                  <p>{filterDay}</p>
                  <ul className="list-group col-11 ">
                    {item.tasks.map((e, index, arr) => {
                      return (
                        <li
                          key={index}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <div className="col-4">{arr[index].description}</div>
                          <div className="d-flex col-8 justify-content-between">
                            <div>
                              <i className="fas fa-tags me-2"></i>
                              {renderTags(arr[index])}
                            </div>
                            <div>
                              {formatTime(arr[index].start_time)}-
                              {arr[index].end_time
                                ? formatTime(arr[index].end_time)
                                : " loading"}
                            </div>
                            <div>
                              {arr[index].time_spent
                                ? arr[index].time_spent
                                : " loading "}
                            </div>
                            <div className="dropdown">
                              <img
                                src={Dots}
                                className=""
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                alt=""
                              />
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton1"
                              >
                                <li>
                                  {arr[index].end_time ? (
                                    <p
                                      className="dropdown-item mb-0 border-bottom "
                                      onClick={() => {
                                        createTasks({
                                          description: arr[index].description,
                                          start_time: handleClickTimeFormat(),
                                          end_time: null,
                                          time_spent: null,
                                          tags: arr[index].tags,
                                          status: 0,
                                        });
                                      }}
                                    >
                                      Start
                                    </p>
                                  ) : (
                                    <p
                                      className="dropdown-item mb-0 border-bottom "
                                      onClick={() => {
                                        let mins = durationMins(
                                          arr[index].start_time
                                        );
                                        updateTasks(arr[index].id, {
                                          end_time: moment(
                                            new Date(),
                                            "MM-DD-YYYY HH:mm:ss",
                                            true
                                          ).format("YYYY-MM-DD HH:mm:ss"),
                                          time_spent: formatTimeSpent(mins),
                                          status: 1,
                                        });
                                      }}
                                    >
                                      Stop
                                    </p>
                                  )}
                                </li>{" "}
                                <li
                                  onClick={() => {
                                    // eslint-disable-next-line no-restricted-globals
                                    const quest = confirm(
                                      "Are you sure delete the Tasks deleted?"
                                    );
                                    quest && deleteTasks(arr[index].id);
                                  }}
                                >
                                  <p className="dropdown-item mb-0">Delete</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })}
    </>
  );
}

export default MyTasks;
