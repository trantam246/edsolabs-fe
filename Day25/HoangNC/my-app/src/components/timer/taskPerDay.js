import React, { useState } from "react";
import moment from "moment";
import { useStyles } from "./style";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import { renderTags, StyledMenu, StyledMenuItem } from "../common/common";
import { useTaskContext } from "../common/taskContext";

export default function TaskPerDay(props) {
  const classes = useStyles();
  const { tasksInDay } = props;
  const [iddel, setIddel] = useState("");
  const [descrip, setDescrip] = useState("");
  const [tagRe, setTagRe] = useState([]);
  const [stt, setStt] = useState("");
  const {
    handleDelete,
    handleClose,
    handleReset,
    handleRestart,
    setdotMenu,
    dotMenu,
  } = useTaskContext();
  return (
    <div className={classes.dayGroup}>
      {tasksInDay.map((e, index, arr) => {
        return (
          <React.Fragment key={e.id}>
            <div className={classes.tasks}>
              <div>{e.description}</div>
              <div className={classes.tasksInfo}>
                <div className={classes.tags}>
                  <LocalOfferIcon />
                  {renderTags(arr[index])}
                </div>
                <div className={classes.startTime}>
                  {moment(`${e.start_time}`).format(`HH:mm`)}
                </div>
                <div className={classes.endTime}>
                  {e.end_time != null
                    ? moment(`${e.end_time}`).format(`HH:mm`)
                    : ""}
                </div>
                {e.time_spent != null ? (
                  <div className={classes.timeSpent}>
                    {Math.round(e.time_spent / 60)} mins
                  </div>
                ) : (
                  <div className={classes.timeSpent}></div>
                )}
                <div>
                  <MoreVertIcon
                    onClick={(event) => {
                      setIddel(arr[index].id);
                      setDescrip(arr[index].description);
                      setTagRe(arr[index].tags);
                      setStt(arr[index].status);
                      console.log(stt);
                      setdotMenu(event.currentTarget);
                    }}
                  />
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={dotMenu}
                    keepMounted
                    open={Boolean(dotMenu)}
                    onClose={() => handleClose()}
                  >
                    <StyledMenuItem>
                      {stt === 0 ? (
                        <ListItemText onClick={() => handleReset()}>
                          Stop
                        </ListItemText>
                      ) : (
                        <ListItemText onClick={() => handleRestart(descrip)}>
                          Start
                        </ListItemText>
                      )}
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <ListItemText onClick={() => handleDelete(iddel)}>
                        Delete
                      </ListItemText>
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
