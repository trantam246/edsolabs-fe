import {
    Box,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
  import StopIcon from "@mui/icons-material/Stop";
  import Tag from "../components/Tag";
  import { useTaskContext } from "../contexts/TaskContext";
  import { useTagContext } from "../contexts/TagContext";
  import moment from "moment";
  import React, { useRef, useState } from "react";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      "& .MuiInput-underline::before": {
        content: "none",
      },
      "& .MuiFormLabel-root": {
        color: "inherit",
      },
    },
    box: {
      height: "60px",
      // border: '1px solid black',
    },
  }));
  
  const AddTask = () => {
    const classes = useStyles();
    const [timer, setTimer] = useState(0);
    const [taskDoing, setTaskDoing] = useState("");
    const [tagsDoing, setTagsDoing] = useState([]);
  
    const { handlePlaying, playing, handleStoping } = useTaskContext();
    const { callSnackbar } = useTagContext();
  
    const countRef = useRef(null);
  
    const handlePlay = () => {
      if (taskDoing.trim() === "") {
        callSnackbar("Please enter value your task!", "warning");
      } else if (tagsDoing.length === 0) {
        callSnackbar("Please choose card !", "warning");
      } else {
        callSnackbar("OK! ", "success");
        countRef.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
  
        const task = {
          description: taskDoing,
          start_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          end_time: null,
          time_spent: null,
          tags: tagsDoing,
          status: 0,
        };
        handlePlaying(task);
      }
    };
  
    const handleStop = () => {
      clearInterval(countRef.current);
      setTimer(0);
      const task = {
        end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        time_spent: timer,
        status: 1,
      };
  
      handleStoping(task);
      callSnackbar("Stop!", "warning");
    };
  
    const getTagsDoing = (tags) => {
      if (tags.length === 0) {
        callSnackbar("Plese choose card !!!", "info");
      } else {
        const listTag = tags.map((tag) => tag.id);
        setTagsDoing(listTag);
      }
    };
  
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <Box
              className={classes.box}
              display="flex"
              alignItems="center"
              px={3}
            >
              <TextField
                placeholder="Placeholder"
                variant="standard"
                label="What are you working on?"
                value={taskDoing}
                onChange={(e) => setTaskDoing(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Box
              className={classes.box}
              display="flex"
              justifyContent="space-around"
              alignItems="flex-end"
            >
              <Tag getTagsDoing={getTagsDoing} />
              <Typography variant="h5" align="center" gutterBottom>
                {moment.utc(timer * 1000).format("HH:mm:ss")}
              </Typography>
  
              {playing ? (
                <IconButton color="primary" size="medium" onClick={handleStop}>
                  <StopIcon />
                </IconButton>
              ) : (
                <IconButton size="medium" color="primary" onClick={handlePlay}>
                  <PlayCircleFilledIcon />
                </IconButton>
              )}
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  };
  
  export default AddTask;