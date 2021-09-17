import React from "react";
import PropTypes from "prop-types";
import Dots from "../dots.svg";
import FindDate from "./FindDate";
import { formatDay, formatTime } from "./Function";
import { deleteTasks } from "../api/api";
MyTasks.propTypes = {
  task: PropTypes.array.isRequired,
};

function MyTasks(props) {
  const { task } = props;
  const renderTags = (i) => {
    // console.log(i);
    if (!i) return;
    const listTag = ["Online", "Meeting", "Training", "Coding"];
    const tag = i.tags.map((i) => listTag[i - 1]);
    return tag;
  };
  return (
    <>
      <div className="m-4">
        <FindDate />
      </div>
      {task.map((item, index, array) => {
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
                        {formatTime(arr[index].end_time)}
                      </div>
                      <div>
                        {arr[index].time_spent
                          ? arr[index].time_spent
                          : " mins "}
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
                              <p className="dropdown-item mb-0 border-bottom ">
                                Start
                              </p>
                            ) : (
                              <p className="dropdown-item mb-0 border-bottom ">
                                Stop
                              </p>
                            )}
                          </li>
                          <form action="/">
                            {" "}
                            <li
                              type="submit"
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
                          </form>
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default MyTasks;
