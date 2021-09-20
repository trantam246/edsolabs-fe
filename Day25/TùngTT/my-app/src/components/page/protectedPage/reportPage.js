import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import dataFunction from '../func/dataFunction';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { Chart } from './barChart';
const useStyles = makeStyles((theme) => ({
  modGrid: {
    backgroundColor: 'none',
    alignItems: 'center'
  },
  btnPos: {
    textAlign: 'end'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column'
  },
}));

export const ReportPage = (props) => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: "",
      key: 'selection'
    }
  ]);
  
  useEffect(() => {
    retrieveTutorials();
  },[]);
  const retrieveTutorials = () => {
    dataFunction.getAll()
      .then(response => {
        setData(response.data.reverse());
      })
      .catch(e => {
        console.log(e);
      });
  };
  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [showPicker, setPicker] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handelClickDateRange = e => {
    setPicker(e.currentTarget);
  }
  const handleCloseDateRange = () => {
    setPicker(null)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  //-------------
  //Open Date Range
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const splitDay =  (value) => {
    if(value != null) {
      const [d,t] = value.split(/ /g)
      return `${d}`
    } else {
      return ""
    }
  }
  const arrDate = Object.entries(
    data.reduce((r, a) => {
    r[splitDay(a.start_time)] = [...r[splitDay(a.start_time)] || [], a];
    return r;
  }, {}));
  const secToHour = (sec) => { 
    let a = sec.split(':'); 
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
    let hour = (Math.round((seconds/3600) * 100)/100).toFixed(2);
    return Number(hour)
  }
  const [text, setText] = useState("");
  const [totalTime, setTotal] = useState(0);
  const [showTotal, setShow ] = useState(false)

  // Set data chart
  const [ online, setOnline] = useState(0);
  const [ meet, setMeet ] = useState(0);
  const [ training, setTraining ] = useState(0);
  const [ coding , setCoding] = useState(0);
  var numOnline = 0;
  var numMeeting = 0;
  var numTraining = 0;
  var numCoding = 0
  const customDay = () => {
    let now = moment(state[0].startDate);
    let end = moment(state[0].endDate); 
    var day = end.diff(now, 'days')
    let days = [];
    for (let i = 0; i <= day; i++) {
      days.push(moment(now).add(i, 'days').format("YYYY-MM-DD"));
    }
    return days
  }
  const getTag = index => {
    index.tags.map(tag => {
      if(tag === 1) {
        numOnline +=1;
      } else if(tag === 2) {
        numMeeting+=1;
      } else if(tag === 3){
        numTraining+=1;
      } else if(tag === 4){
        numCoding+=1;
      } 
    })
    setOnline(numOnline)
    setMeet(numMeeting)
    setTraining(numTraining)
    setCoding(numCoding)
  }
  const handleCustomDate = () => {
    setOpen(false);
    let sum = 0;
    setTotal(sum)
    customDay().forEach(day => {
      arrDate.forEach(item => {
        if(item[0] = day) {
          item[1].map(index => {
            sum += secToHour(index.time_spent)
            getTag(index)
          })
        } else {
          setOnline(0)
          setMeet(0)
          setTraining(0)
          setCoding(0)
        }
      })
    })
    setAnchorEl(null);
    setText(`From : ${moment(state[0].startDate).format("YYYY-DD-MM")} to: ${moment(state[0].endDate).format("YYYY-DD-MM")}:`)
    setTotal(sum);
    setShow(true)
  }
  const lastMonth = () => {
    let currentDate = moment().subtract(1, 'months');
    let weekStart = currentDate.clone().startOf('month');
    let weekEnd = currentDate.clone().endOf('month');
    let dayInMonth = moment(moment(), "YYYY-MM").daysInMonth()
    let days = [];

    for (let i = 0; i <= dayInMonth; i++) {
      days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
    }
    return days
  }
  const thisMonth = () => {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('month');
    let weekEnd = currentDate.clone().endOf('month');
    let dayInMonth = moment(moment(), "YYYY-MM").daysInMonth()
    let days = [];

    for (let i = 1; i < dayInMonth; i++) {
      days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
    }
    return days
  }
  const lastWeek = () => {
    let weekStart = moment().subtract(1, 'weeks').startOf('week');
    let weekEnd = moment().subtract(1, 'weeks').endOf('week');
    let days = [];
    for (let i = 1; i <= 7; i++) {
      days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
    }
    return days
  }
  
  const currentWeek = () => {
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf('isoWeek');
    let weekEnd = currentDate.clone().endOf('isoWeek');
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(moment(weekStart).add(i, 'days').format("YYYY-MM-DD"));
    }
    return days
  }
  const handleGetLastMonth = () => {
    let sum = 0
    lastMonth().map(day => {
      arrDate.map(item => {
        if(item[0] === day) {
          item[1].map(index => {
            sum += secToHour(index.time_spent)
            getTag(index)
          })
        } else {
          setOnline(0)
          setMeet(0)
          setTraining(0)
          setCoding(0)
        }
      })
    })
    setAnchorEl(null);
    setText("Last month: ")
    setTotal(sum);
    setShow(true)
  }
  const handleGetThisMonth = () => {
    let sum = 0
    thisMonth().map(day => {
      arrDate.map(item => {
        if(item[0] === day) {
          item[1].map(index => {
          sum += secToHour(index.time_spent)
          getTag(index)
          })
        }
      })
    })
    setAnchorEl(null);
    setText("This month: ")
    setTotal(sum);
    setShow(true)
  }
  const handleGetLastWeek = () => {
    let sum = 0
    lastWeek().map(day => {
      arrDate.map(item => {
        if(item[0] === day) {
          item[1].map(index => {
          sum += secToHour(index.time_spent)
          getTag(index)
          })
        } else {
          setOnline(0)
          setMeet(0)
          setTraining(0)
          setCoding(0)
        }
      })
    })
    console.log(lastWeek())
    setAnchorEl(null);
    setText("Last week: ")
    setTotal(sum);
    setShow(true)
  }
  // Total this week
  const handleGetThisWeek = () => {
    let sum = 0
    currentWeek().map(day => {
      arrDate.map(item => {
        if(item[0] === day) {
          item[1].map(index => {
          sum += secToHour(index.time_spent)
          getTag(index)
          })
        }
      })
    })
    console.log(currentWeek())
    setAnchorEl(null);
    setText("This week: ")
    setTotal(sum);
    setShow(true)
  }
  //Total yesterday
  const handleGetYesterday = () => {
    setAnchorEl(null);
    setText("Yesterday: ")
    let sum = 0;
    const yesterday = moment().subtract(1, 'day').format("YYYY-MM-DD")
    arrDate.map(item => {
      if(item[0] === yesterday) {
        item[1].map(index => {
          sum += secToHour(index.time_spent)
          getTag(index)
        })
      }
    })
    setTotal(sum);
    setShow(true)
  }
  // Total today
  const handleToday = () => {
    let sum = 0;
    setAnchorEl(null);  
    setText("Today: ")
    arrDate.map(item => {
      if(item[0] === moment().utc().format("YYYY-MM-DD")) {
        item[1].map(index => {
          sum += secToHour(index.time_spent)
          getTag(index)
        })
      }
    })
    setTotal(sum);
    setShow(true);

  }
  return (
    <React.Fragment>
       <Grid container spacing={4}>
        <Grid item xs={6} className={classes.modGrid}>
        {
          showTotal === true ? (
            <Typography variant="h4">
              {text} {totalTime} hours
            </Typography>
          ) : (
            <Typography variant="h4">
              Total time
            </Typography>
          )
        }
        </Grid>
        <Grid item xs={6}  className={classes.modGrid} className={classes.btnPos}>
          <Button variant="contained" 
                  color="primary" 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  endIcon={<ArrowDropDownIcon/>}>
            <Typography variant="h5">
              Choose Date Range
            </Typography>
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
          <MenuItem onClick={handleToday}>Today</MenuItem>
          <MenuItem onClick={handleGetYesterday}>Yesterday</MenuItem>
          <MenuItem onClick={handleGetThisWeek}>This week</MenuItem>
          <MenuItem onClick={handleGetLastWeek}>Last week</MenuItem>
          <MenuItem onClick={handleGetThisMonth}>This month</MenuItem>
          <MenuItem onClick={handleGetLastMonth}>Last month</MenuItem>
          <MenuItem onClick={handleOpenModal}>
            Date Range
          </MenuItem>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}>
            <Fade in={open}>
              <div className={classes.paper}>
                <DateRange
                  editableDateInputs={true}
                  onChange={item => setState([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  />
                <Button variant="contained" 
                  color="primary"
                  onClick={handleCustomDate}>
                  Get
                </Button>
              </div>
            </Fade>
          </Modal>
          </Menu>
        </Grid>
      </Grid>
      <Chart 
        online={online}
        train={training}
        meet = {meet}
        code={coding}
        label={text}
      />
    </React.Fragment>
  )
}