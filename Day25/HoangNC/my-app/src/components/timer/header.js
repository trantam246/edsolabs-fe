import React, { useState, useRef } from "react";
import InputBase from "@mui/material/InputBase";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import { useStyles } from "./style";
import FormatTime from "./formatTime";
import { chooseTag, StyledMenu } from "../common/common";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { updateTasks, createTasks } from "../apis/apis";

export default function HeaderTimer() {
  const classes = useStyles();
  const [timer, setTimer] = useState(0);
  const [anchorMenu, setanchorMenu] = useState(null);
  const [startTime, setStart] = useState(``);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [description, setDescription] = useState("");
  const [counting, setCounting] = useState([]);
  const countRef = useRef(null);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    setanchorMenu(null);
  };
  const handleStart = () => {
    const start = moment().format(`YYYY-MM-DD H:mm:ss`);
    setIsActive(true);
    setIsPaused(true);
    setStart(start);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    createTasks({
      description: description,
      start_time: start,
      status: 0,
      tags: chooseTag(
        state.checkedA,
        state.checkedB,
        state.checkedC,
        state.checkedD
      ),
    })
      .then((res) => {
        setCounting(res.data);
      })
      .catch((err) => {
        alert("Không thể kết nối tới server");
      });
  };
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    const end = moment().format(`YYYY-MM-DD H:mm:ss`);
    updateTasks(counting.id, {
      description: description,
      start_time: startTime,
      end_time: end,
      time_spent: `${moment(end).diff(startTime, "seconds")}`,
      tags: chooseTag(
        state.checkedA,
        state.checkedB,
        state.checkedC,
        state.checkedD
      ),
      status: 1,
    });
    setTimer(0);
  };
  return (
    <header className={classes.header}>
      <InputBase
        className={classes.input}
        placeholder="What are you working on?"
        onChange={(event) => setDescription(event.target.value)}
      />
      <div className={classes.countTimer}>
        <span>
          <LocalOfferIcon
            className={classes.selectTag}
            onClick={(e) => setanchorMenu(e.currentTarget)}
          />
          <StyledMenu
            id="simple-menu"
            anchorEl={anchorMenu}
            keepMounted
            open={Boolean(anchorMenu)}
            onClose={handleClose}
            className={classes.menu}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  value="1"
                />
              }
              label="Online"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  value="2"
                />
              }
              label="Meeting"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedC}
                  onChange={handleChange}
                  name="checkedC"
                  value="3"
                />
              }
              label="Traning"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedD}
                  onChange={handleChange}
                  name="checkedD"
                  value="4"
                />
              }
              label="Coding"
            />
          </StyledMenu>
        </span>
        <p className={classes.formatTime}>{FormatTime(timer)}</p>
        <div>
          {" "}
          {!isActive && !isPaused ? (
            <PlayCircleFilledIcon onClick={handleStart} fontSize="large" />
          ) : (
            <StopCircleIcon onClick={handleReset} fontSize="large" />
          )}
        </div>
      </div>
    </header>
  );
}
