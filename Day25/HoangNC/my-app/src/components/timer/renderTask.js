import { useStyles } from "./style";
import React, { useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import moment from "moment";
import { deleteTasks } from "../apis/apis";
import {
  formatDay,
  renderTags,
  StyledMenu,
  StyledMenuItem,
} from "../common/common";

export default function Showtask(props) {
  const { task } = props;
  const classes = useStyles();
  const [iddel, setIddel] = useState("");
  const [stt, setStt] = useState("");
  const [dotMenu, setdotMenu] = useState(null);
  const handleClose = () => {
    setdotMenu(null);
  };
  const handleStop = () => {
    setdotMenu(null);
  };
  function handleDelete(id) {
    if (window.confirm("Delete this file?")) {
      deleteTasks(id)
        .then(() => {
          setdotMenu(null);
        })
        .catch(() => {
          alert("Lỗi");
        });
    }
  }
  return (
    <>
      {task.map((event, index) => {
        return (
          <div key={index}>
            <p>{formatDay(event.date)}</p>
            <div className={classes.dayGroup}>
              {event.tasks.map((e, index, arr) => {
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
                              setIddel(e.id);
                              setStt(e.status);
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
                                <ListItemText onClick={() => handleStop()}>
                                  Stop
                                </ListItemText>
                              ) : (
                                <ListItemText onClick={() => handleClose()}>
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
          </div>
        );
      })}
    </>
  );
}
