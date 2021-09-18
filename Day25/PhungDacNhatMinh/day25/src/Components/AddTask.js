import React, { useState, useEffect } from "react";
import MyTasks from "./MyTasks";
import { getTasks, getTags, createTasks, updateTasks } from "../api/api";
import {
  PROCESS_DAY_GROUP,
  chooseTag,
  handleClickTimeFormat,
} from "./Function";
AddTask.propTypes = {};
function AddTask(props) {
  let time = 0;
  const [checkO, setCheckO] = useState(false);
  const [checkM, setCheckM] = useState(false);
  const [checkT, setCheckT] = useState(false);
  const [checkR, setCheckR] = useState(false);
  const [timer, setTimer] = useState(time);
  const [timerOn, setTimerOn] = useState(false);
  const [tag, setTag] = useState("");
  const [task, setTask] = useState("");
  const [job, setJob] = useState("");

  // O'clock
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTimer((e) => e + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      setTimer(0);
      clearInterval(interval);
    };
  }, [timerOn]);
  //Tag
  useEffect(() => {
    getTags()
      .then((e) => e.data)
      .then((data) => setTag(data))
      .catch((err) => err)
      .finally((done) => done);
  }, []);

  //Tasks
  useEffect(() => {
    getTasks()
      .then((e) => e.data)
      .then((data) => {
        return setTask(data);
      })
      .catch((err) => err)
      .finally((done) => done);
  }, []);
  return (
    <>
      <header className="job__Title border-bottom border-dark">
        <div className="header d-flex justify-content-between">
          <div className="header__left col-6">
            <h4>
              <input
                className="job__Name border-0"
                type="text"
                placeholder="What are you working on?"
                onChange={(e) => setJob(e.target.value)}
                value={job}
              />
            </h4>
          </div>
          <div className="header__right col-6 d-flex justify-content-end align-items-center">
            <div className="job__Icon mx-2">
              <i
                className="fas fa-tags"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              {typeof tag === "object" && (
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li
                    className="dropdown-item border-bottom "
                    onClick={() => setCheckO(!checkO)}
                  >
                    {checkO && <i className="fas fa-check me-2"></i>}
                    {tag[0].name}
                  </li>
                  <li
                    className="dropdown-item border-bottom "
                    onClick={() => setCheckM(!checkM)}
                  >
                    {checkM && <i className="fas fa-check me-2"></i>}
                    {tag[1].name}
                  </li>
                  <li
                    className="dropdown-item border-bottom"
                    onClick={() => setCheckT(!checkT)}
                  >
                    {checkT && <i className="fas fa-check me-2"></i>}
                    {tag[2].name}
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => setCheckR(!checkR)}
                  >
                    {checkR && <i className="fas fa-check me-2"></i>}
                    {tag[3].name}
                  </li>
                </ul>
              )}
            </div>
            <div className="mx-2">
              {
                <>
                  <span>
                    {("0" + Math.floor((timer / 3600000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((timer / 60000) % 60)).slice(-2)}:
                  </span>
                  <span>
                    {("0" + Math.floor((timer / 1000) % 60)).slice(-2)}
                  </span>
                </>
              }
            </div>
            <div className="mx-2">
              {!timerOn ? (
                <button
                  onClick={() => {
                    if (!checkO && !checkM && !checkT && !checkR) {
                      alert("please choose 1 tag!");
                      return;
                    }
                    setCheckO(false);
                    setCheckM(false);
                    setCheckT(false);
                    setCheckR(false);
                    createTasks({
                      description: job,
                      start_time: handleClickTimeFormat(),
                      end_time: null,
                      time_spent: null,
                      tags: chooseTag(checkO, checkM, checkT, checkR),
                      status: 0,
                    })
                      .then(() => {
                        getTasks()
                          .then((e) => e.data)
                          .then((data) => {
                            return setTask(data);
                          });
                      })
                      .catch((error) => console.error(error));
                    setTimerOn(true);
                    setJob("");
                  }}
                >
                  <i type="button" className="fas fa-play-circle fa-2x"></i>
                </button>
              ) : (
                <button
                  onClick={() => {
                    updateTasks(task.length, {
                      end_time: handleClickTimeFormat(),
                      time_spent: `${
                        Math.floor((timer / 60000) * 100) / 100
                      } mins`,
                      status: 1,
                    })
                      .then(() => {
                        getTasks()
                          .then((e) => e.data)
                          .then((data) => {
                            return setTask(data);
                          });
                      })
                      .catch((error) => console.error(error));
                    setTimerOn(false);
                  }}
                >
                  <i type="button" className="fas fa-stop-circle fa-2x"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <section>
        {typeof task === "object" && (
          <MyTasks task={PROCESS_DAY_GROUP(task).reverse()} />
        )}
      </section>
    </>
  );
}

export default AddTask;
