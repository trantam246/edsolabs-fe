import { Button, Fade, makeStyles, Menu, MenuItem } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import ColumnChart from '../chartColumn/ChartColumn';
import PieChart from '../chartPie/ChartPie';
import 'react-date-range/dist/styles.css'; //
import 'react-date-range/dist/theme/default.css';
import {
  BodyChart,
  ChartColumn,
  ChartPie,
  Header,
  Subheader,
  Subtext,
} from './styled';
const useStyles = makeStyles((theme) => ({
  popper: {
    border: '1px solid #000',
    width: '132px',
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: '4px',
    paddingTop: '4px',
    '& .MuiTypography-body1': {
      fontSize: '16px',
    },
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  boxFilter: {
    marginRight: 100,
  },
  box: {
    marginTop: 58,
  },
}));

export default function Report() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [listTask, setListTask] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [persen, setPersen] = useState({});
  const startOfWeek = moment().startOf('week').toDate();
  const endOfWeek = moment().endOf('week').toDate();
  const getDayStart = moment(startOfWeek)
    .format('MM DD YYYY')
    .split(' ')
    .join('/');
  const getDayEnd = moment(endOfWeek).format('MM DD YYYY').split(' ').join('/');
  // lấy API về để render ra tổng số h trong tuần
  const _URL = process.env.REACT_APP_URL;
  useEffect(() => {
    fetch(`${_URL}tasks`)
      .then((res) => res.json())
      .then((result) => {
        let sum = 0;
        result.map((item) => {
          if (
            new Date(getDayStart).getDate() <=
              new Date(item.start_time).getDate() &&
            new Date(item.start_time).getDate() <= new Date(getDayEnd).getDate()
          ) {
            let number = Number(item.time_spent);
            sum += number;
          }
        });
        setTotalHours((sum / 60).toFixed(2));
        setListTask(result);
      });
  }, []);

  // lấy ra phần trăm cho từng tags

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElDate, setAnchorElDate] = useState(null);

  const handleClickDateRange = (event) => {
    setAnchorElDate(event.currentTarget);
  };

  const handleCloseDate = () => {
    setAnchorElDate(null);
  };

  //hàm fillter
  const getToday = () => {
    let sum = 0;
    const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
    listTask.map((item) => {
      if (new Date(item.start_time).getDate() === moment()._d.getDate()) {
        let total = (sum += Number(item.time_spent));

        const getTime = item.time_spent;
        if (item.tags.length !== 0) {
          const getMinute = Number(getTime / item.tags.length);
          item.tags.forEach((e) => {
            if (e === 1) {
              percentTag.online += getMinute;
            }
            if (e === 2) {
              percentTag.meeting += getMinute;
            }
            if (e === 3) {
              percentTag.training += getMinute;
            }
            if (e === 4) {
              percentTag.coding += getMinute;
            }
          });
        }

        const sumTagMinute =
          percentTag.online +
          percentTag.meeting +
          percentTag.training +
          percentTag.coding;
        const percentTagsToday = {
          online: (percentTag.online / sumTagMinute) * 100,
          meeting: (percentTag.meeting / sumTagMinute) * 100,
          training: (percentTag.training / sumTagMinute) * 100,
          coding: (percentTag.coding / sumTagMinute) * 100,
        };
        setPersen(percentTagsToday);

        setTotalHours((total / 60).toFixed(2));
      }
    });
  };
  const getYesterday = () => {
    let sum = 0;
    const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
    listTask.map((item) => {
      const yesterday = moment()._d.getDate() - 1;
      if (new Date(item.start_time).getDate() === yesterday) {
        sum += Number(item.time_spent);

        const getTime = item.time_spent;
        if (item.tags.length !== 0) {
          const getMinute = Number(getTime / item.tags.length);
          item.tags.forEach((e) => {
            if (e === 1) {
              percentTag.online += getMinute;
            }
            if (e === 2) {
              percentTag.meeting += getMinute;
            }
            if (e === 3) {
              percentTag.training += getMinute;
            }
            if (e === 4) {
              percentTag.coding += getMinute;
            }
          });
        }

        const sumTagMinute =
          percentTag.online +
          percentTag.meeting +
          percentTag.training +
          percentTag.coding;
        const percentTagsYesterday = {
          online: (percentTag.online / sumTagMinute) * 100,
          meeting: (percentTag.meeting / sumTagMinute) * 100,
          training: (percentTag.training / sumTagMinute) * 100,
          coding: (percentTag.coding / sumTagMinute) * 100,
        };
        setPersen(percentTagsYesterday);
        setTotalHours((sum / 60).toFixed(2));
      }
    });
  };

  const getThisWeek = () => {
    let sum = 0;
    const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
    listTask.map((item) => {
      sum += Number(item.time_spent);
      const getTime = item.time_spent;
      if (item.tags.length !== 0) {
        const getMinute = Number(getTime / item.tags.length);
        item.tags.forEach((x) => {
          if (x === 1) {
            percentTag.online += getMinute;
          }
          if (x === 2) {
            percentTag.meeting += getMinute;
          }
          if (x === 3) {
            percentTag.training += getMinute;
          }
          if (x === 4) {
            percentTag.coding += getMinute;
          }
        });
      }
    });
    const sumTagMinute =
      percentTag.online +
      percentTag.meeting +
      percentTag.training +
      percentTag.coding;
    const percentTags = {
      online: (percentTag.online / sumTagMinute) * 100,
      meeting: (percentTag.meeting / sumTagMinute) * 100,
      training: (percentTag.training / sumTagMinute) * 100,
      coding: (percentTag.coding / sumTagMinute) * 100,
    };
    setPersen(percentTags);
    setTotalHours((sum / 60).toFixed(2));
  };

  const getLastWeek = () => {
    let sum = 0;
    var lastWeekStart = moment(
      moment().startOf('week').subtract(1, 'weeks'),
    ).format('YYYY-MM-DD');
    var days = [];

    for (var i = 0; i <= 6; i++) {
      days.push(moment(lastWeekStart).add(i, 'days').format('YYYY-MM-DD'));
    }
    const startWeek = days.shift();
    const endWeek = days.pop();
    const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
    listTask.map((item) => {
      if (
        new Date(startWeek).getDate() <= new Date(item.start_time).getDate() &&
        new Date(item.start_time).getDate() <= new Date(endWeek).getDate()
      ) {
        sum += Number(item.time_spent);
        const getTime = item.time_spent;
        if (item.tags.length !== 0) {
          const getMinute = Number(getTime / item.tags.length);
          item.tags.forEach((x) => {
            if (x === 1) {
              percentTag.online += getMinute;
            }
            if (x === 2) {
              percentTag.meeting += getMinute;
            }
            if (x === 3) {
              percentTag.training += getMinute;
            }
            if (x === 4) {
              percentTag.coding += getMinute;
            }
          });
        }
      }
    });
    const sumTagMinute =
      percentTag.online +
      percentTag.meeting +
      percentTag.training +
      percentTag.coding;
    const percentTagsLastWeek = {
      online: (percentTag.online / sumTagMinute) * 100,
      meeting: (percentTag.meeting / sumTagMinute) * 100,
      training: (percentTag.training / sumTagMinute) * 100,
      coding: (percentTag.coding / sumTagMinute) * 100,
    };
    setPersen(percentTagsLastWeek);

    setTotalHours((sum / 60).toFixed(2));
  };
  const getThisMonth = () => {
    let sum = 0;
    var thisMonthStart = moment(moment().startOf('month')).format('YYYY-MM-DD');
    var days = [];

    const dem = Number(moment(moment().endOf('month')).format('DD'));

    for (var i = 0; i < dem; i++) {
      days.push(moment(thisMonthStart).add(i, 'days').format('YYYY-MM-DD'));
    }
    days.map((day) => {
      const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
      listTask.map((item) => {
        if (new Date(item.start_time).getDate() === new Date(day).getDate()) {
          sum += Number(item.time_spent);
          const getTime = item.time_spent;
          if (item.tags.length !== 0) {
            const getMinute = Number(getTime / item.tags.length);
            item.tags.forEach((e) => {
              if (e === 1) {
                percentTag.online += getMinute;
              }
              if (e === 2) {
                percentTag.meeting += getMinute;
              }
              if (e === 3) {
                percentTag.training += getMinute;
              }
              if (e === 4) {
                percentTag.coding += getMinute;
              }
            });
          }

          const sumTagMinute =
            percentTag.online +
            percentTag.meeting +
            percentTag.training +
            percentTag.coding;
          const percentTagsThisMounth = {
            online: (percentTag.online / sumTagMinute) * 100,
            meeting: (percentTag.meeting / sumTagMinute) * 100,
            training: (percentTag.training / sumTagMinute) * 100,
            coding: (percentTag.coding / sumTagMinute) * 100,
          };

          setPersen(percentTagsThisMounth);
          setTotalHours((sum / 60).toFixed(2));
        }
      });
    });
  };
  const getLastMonth = () => {
    let sum = 0;
    setTotalHours(sum);
    setPersen({});
    var lastMonthStart = moment(
      moment().startOf('month').subtract(1, 'months'),
    ).format('YYYY-MM-DD');
    var days = [];

    const dem = Number(
      moment().subtract(1, 'months').endOf('month').format('DD'),
    );

    for (var i = 0; i < dem; i++) {
      days.push(moment(lastMonthStart).add(i, 'days').format('YYYY-MM-DD'));
    }
    days.map((item) => {
      const countDays = new Date(item).getMonth() + 1;

      const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
      listTask.map((item) => {
        if (item.start_time.split(' ')[0].split('/')[0] === countDays) {
          const getTime = item.time_spent;
          if (item.tags.length !== 0) {
            const getMinute = Number(getTime / item.tags.length);
            item.tags.forEach((e) => {
              if (e === 1) {
                percentTag.online += getMinute;
              }
              if (e === 2) {
                percentTag.meeting += getMinute;
              }
              if (e === 3) {
                percentTag.training += getMinute;
              }
              if (e === 4) {
                percentTag.coding += getMinute;
              }
            });
          }

          const sumTagMinute =
            percentTag.online +
            percentTag.meeting +
            percentTag.training +
            percentTag.coding;
          const percentTagsLastMounth = {
            online: (percentTag.online / sumTagMinute) * 100,
            meeting: (percentTag.meeting / sumTagMinute) * 100,
            training: (percentTag.training / sumTagMinute) * 100,
            coding: (percentTag.coding / sumTagMinute) * 100,
          };
          setPersen(percentTagsLastMounth);
        }
      });
    });
  };

  //date range
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const valueDateRange = (item) => {
    setState([item.selection]);
  };
  //hàm filer date range
  useEffect(() => {
    state.map((item) => {
      let dateStart = new Date(item.startDate).getDate();
      let dateEnd = new Date(item.endDate).getDate();
      let monthStart = new Date(item.startDate).getMonth() + 1;
      let monthEnd = new Date(item.endDate).getMonth() + 1;
      let sum = 0;
      const percentTag = { online: 0, meeting: 0, training: 0, coding: 0 };
      listTask.map((task) => {
        let dateTask = new Date(task.start_time).getDate();
        let monthTask = new Date(task.start_time).getMonth() + 1;
        if (
          dateStart <= dateTask &&
          dateEnd >= dateTask &&
          monthStart <= monthTask &&
          monthEnd >= monthTask
        ) {
          sum += Number(task.time_spent);
          const getTime = task.time_spent;
          if (task.tags.length !== 0) {
            const getMinute = Number(getTime / task.tags.length);
            task.tags.forEach((x) => {
              if (x === 1) {
                percentTag.online += getMinute;
              }
              if (x === 2) {
                percentTag.meeting += getMinute;
              }
              if (x === 3) {
                percentTag.training += getMinute;
              }
              if (x === 4) {
                percentTag.coding += getMinute;
              }
            });
          }
        }
      });
      const sumTagMinute =
        percentTag.online +
        percentTag.meeting +
        percentTag.training +
        percentTag.coding;
      const percentTags = {
        online: (percentTag.online / sumTagMinute) * 100,
        meeting: (percentTag.meeting / sumTagMinute) * 100,
        training: (percentTag.training / sumTagMinute) * 100,
        coding: (percentTag.coding / sumTagMinute) * 100,
      };

      setPersen(percentTags);
      setTotalHours((sum / 60).toFixed(2));
    });
  }, [state]);

  return (
    <div>
      <div className="header">
        <Header>Productivity report</Header>
        <Subheader>
          <Subtext>This week: {totalHours} Hours</Subtext>
          <div className={classes.boxFilter}>
            <Button
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              This Week
            </Button>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={handleClose}
              TransitionComponent={Fade}
              className={classes.box}
            >
              <MenuItem onClick={getToday}>Today</MenuItem>
              <MenuItem onClick={getYesterday}>Yesterday</MenuItem>
              <MenuItem onClick={getThisWeek}>This Week</MenuItem>
              <MenuItem onClick={getLastWeek}>Last Week</MenuItem>
              <MenuItem onClick={getThisMonth}>This month</MenuItem>
              <MenuItem onClick={getLastMonth}>Last month</MenuItem>
              <MenuItem>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickDateRange}
                >
                  Date Range
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorElDate}
                  keepMounted
                  open={Boolean(anchorElDate)}
                  onClose={handleCloseDate}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={valueDateRange}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </Menu>
              </MenuItem>
            </Menu>
          </div>
        </Subheader>
        <BodyChart>
          <ChartPie>
            <PieChart valuePersen={persen} />
          </ChartPie>
          <ChartColumn>
            <ColumnChart valuePersen={persen} />
          </ChartColumn>
        </BodyChart>
      </div>
    </div>
  );
}
