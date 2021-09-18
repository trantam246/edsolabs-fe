import {
  Box,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import StopIcon from '@material-ui/icons/Stop';
import Tag from 'components/tag/Tag';
import { useTaskContext } from 'contexts/TaskContext';
import { useTagContext } from 'contexts/TagContext';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    '& .MuiInput-underline::before': {
      content: 'none',
    },
    '& .MuiFormLabel-root': {
      color: 'inherit',
    },
  },
  box: {
    height: '60px',
    // border: '1px solid black',
  },
}));

const AddTask = () => {
  const classes = useStyles();

  /** seconds */
  const [timer, setTimer] = useState(0);

  const [taskDoing, setTaskDoing] = useState('');
  const [tagsDoing, setTagsDoing] = useState([]);

  const {
    handlePlaying,
    playing,
    handleStoping,
    stopInSingleTask,
    taskRestarted,
  } = useTaskContext();

  const { callSnackbar } = useTagContext();

  const countRef = useRef(null);

  /** play timer */
  const handlePlay = () => {
    // Check thông tin nhập vào
    if (taskDoing.trim() === '') {
      callSnackbar('Enter your task! :D', 'info');
    } else if (tagsDoing.length === 0) {
      callSnackbar('Hmm, Choose at least one card...', 'info');
    } else {
      // tạo giữ liệu để gọi api
      const task = {
        description: taskDoing,
        start_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        end_time: null,
        time_spent: null,
        tags: tagsDoing,
        status: 0,
      };

      // set trạng thái đồng hồ là đang chạy, truyền dữ liệu, gọi api
      handlePlaying(task).then((res) => {
        // post api thanh cong
        if (res >= 200 && res < 400) {
          // gọi snack thông báo
          callSnackbar('OK! Time to try hard.', 'success');
          // bắt đầu đếm thời gian
          countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
          }, 1000);
        } else {
          // gọi snack thông báo
          callSnackbar('Add task fail, time to games :D', 'error');
        }
      });
    }
  };

  /** stop timer */
  const handleStop = () => {
    // Check thông tin nhập vào
    if (taskDoing.trim() === '') {
      callSnackbar('Enter your task! :D', 'info');
    } else if (tagsDoing.length === 0) {
      callSnackbar('Hmm, Choose at least one card...', 'info');
    } else {
      // tạo giữ liệu để gọi api
      const task = {
        end_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        time_spent: timer,
        status: 1,
      };

      // gọi api patch dữ liệu của task
      handleStoping(task).then((res) => {
        // update dữ liệu thanh công
        if (res >= 200 && res < 400) {
          // tắt đếm thời gian, set thời gian về 0
          clearInterval(countRef.current);
          setTimer(0);

          // đưa input về rỗng
          setTaskDoing('');
          setTagsDoing([]);

          // gọi snack thông báo
          callSnackbar('Stop! Done task!', 'success');
        } else {
          // gọi snack thông báo
          callSnackbar('Fail stop :D', 'error');
        }
      });
    }
  };

  useEffect(() => {
    if (stopInSingleTask) {
      handleStop();
    }
  }, [stopInSingleTask]);

  useEffect(() => {
    if (Object.keys(taskRestarted).length > 0) {
      setTagsDoing(taskRestarted.tags);
      setTaskDoing(taskRestarted.description);

      // handlePlay();
      callSnackbar('Click PLAY button to do the task :D', 'info');
    }
  }, [taskRestarted]);

  const getTagsDoing = (tags) => {
    if (tags.length === 0) {
      callSnackbar('Hmm, Choose at least one card...', 'info');
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
            px={2}
          >
            <TextField
              id="input-with-icon-grid"
              label="What are you working on?"
              fullWidth
              value={taskDoing}
              disabled={playing}
              color="secondary"
              onChange={(e) => setTaskDoing(e.target.value)}
              onBlur={() => {
                if (taskDoing.trim() === '') {
                  callSnackbar('Enter your task! :D', 'info');
                }
              }}
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
            {/* tag */}
            <Tag getTagsDoing={getTagsDoing} tagsDoing={tagsDoing} />
            {/* timer */}
            <Typography variant="h5" align="center" gutterBottom>
              {moment.utc(timer * 1000).format('HH:mm:ss')}
            </Typography>

            {/* play */}
            {!playing && (
              <IconButton
                size="medium"
                color="secondary"
                aria-label="add an alarm"
                onClick={handlePlay}
              >
                <PlayCircleFilledIcon />
              </IconButton>
            )}

            {/* stop */}
            {playing && (
              <IconButton
                size="medium"
                color="secondary"
                aria-label="add an alarm"
                onClick={handleStop}
              >
                <StopIcon />
              </IconButton>
            )}
          </Box>
          {playing && <LinearProgress color="secondary" />}
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
};

export default AddTask;
