import React, { useState } from 'react';
import moment from 'moment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Card, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ActionMenu from './ActionMenu';
import DatePicker from './DatePicker';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
  },
  dayList: {
    display: 'block',
  },
  detail: {
    padding: theme.spacing(2),
    border: '1px solid black',
    borderRadius: '0',
  },
  loadButton: {
    marginBottom: theme.spacing(2),
    color: '#323934',
  },
  text: {
    color: '#323934',
  },
}));

export default function ListTask(props) {
  const [numPages, setNumPages] = useState(3);
  const [date, setDate] = useState();
  const classes = useStyles();
  const [taskByDay, setTaskByDay] = useState();

  const taskGroupByDays = Object.entries(
    props.task.reduce(function (r, a) {
      r[moment(a.start_time).format('YYYY-MM-DD')] =
        r[moment(a.start_time).format('YYYY-MM-DD')] || [];
      r[moment(a.start_time).format('YYYY-MM-DD')].push(a);
      return r;
    }, Object.create(null))
  ).sort(function (a, b) {
    return moment(b[0]).format('DD') - moment(a[0]).format('DD');
  });
  const handleNumPages = () => {
    if (numPages + 3 < taskGroupByDays.length) {
      setNumPages(numPages + 3);
    } else {
      setNumPages(taskGroupByDays.length);
    }
  };
  const getDate = (data) => {
    let a = moment(data).format('YYYY-MM-DD');
    setDate(a);
    setTaskByDay(taskGroupByDays.filter((e) => e[0] === a));
  };
  return (
    <>
      <DatePicker getDate={getDate} />

      {date ? (
        <List className={classes.root}>
          {taskByDay.length >= 1 ? (
            <>
              {moment().format('DD/MM/YYYY') ===
              moment(taskByDay[0][0]).format('DD/MM/YYYY') ? (
                <Typography className={classes.text} variant="h6">
                  Today
                </Typography>
              ) : (
                <Typography className={classes.text} variant="h6">
                  {moment(taskByDay[0][0]).format('DD/MM/YYYY')}
                </Typography>
              )}
              {taskByDay[0][1]
                .sort(function (a, b) {
                  return moment(b.start_time) - moment(a.start_time);
                })
                .map((e) => {
                  return (
                    <>
                      <Card className={classes.detail} key={e.id}>
                        <Grid container spacing={0}>
                          <Grid item xs={4}>
                            {e.description}
                          </Grid>
                          <Grid item xs={3}>
                            {e.tags
                              .map((t) => {
                                return props.tags[t - 1];
                              })
                              .join(', ')}
                          </Grid>
                          {e.end_time ? (
                            <Grid item xs={3}>{`${moment(e.start_time).format(
                              'HH:mm'
                            )}-${moment(e.end_time).format('HH:mm')}`}</Grid>
                          ) : (
                            <Grid item xs={3}>{`${moment(e.start_time).format(
                              'HH:mm'
                            )}-`}</Grid>
                          )}

                          <Grid item xs={1}>
                            {e.time_spent}
                          </Grid>
                          <Grid item xs={1}>
                            <ActionMenu
                              id={e.id}
                              status={e.status}
                              description={e.description}
                              start_time={e.start_time}
                              end_time={e.end_time}
                              time_spent={e.time_spent}
                              tags={e.tags}
                            />
                          </Grid>
                        </Grid>
                      </Card>
                    </>
                  );
                })}
            </>
          ) : (
            <Typography className={classes.text} variant="h4" align="center">
              Không có hoạt động trong ngày này
            </Typography>
          )}
        </List>
      ) : (
        <>
          <List className={classes.root}>
            {taskGroupByDays.slice(0, numPages).map((e) => {
              return (
                <div key={e[0]}>
                  {moment(e[0]).format('DD/MM/YYYY') ===
                  moment().format('DD/MM/YYYY') ? (
                    <Typography className={classes.text} variant="h6">
                      Today
                    </Typography>
                  ) : (
                    <Typography className={classes.text} variant="h6">
                      {moment(e[0]).format('DD/MM/YYYY')}
                    </Typography>
                  )}

                  <ListItem className={classes.dayList} key={e[0]}>
                    {e[1]
                      .sort(function (a, b) {
                        return moment(b.start_time) - moment(a.start_time);
                      })
                      .map((o) => {
                        return (
                          <>
                            <Card className={classes.detail} key={o.id}>
                              <Grid container spacing={0}>
                                <Grid item xs={4}>
                                  {o.description}
                                </Grid>
                                <Grid item xs={3}>
                                  {o.tags
                                    .map((t) => {
                                      return props.tags[t - 1];
                                    })
                                    .join(', ')}
                                </Grid>
                                {o.end_time ? (
                                  <Grid item xs={3}>{`${moment(
                                    o.start_time
                                  ).format('HH:mm')}-${moment(
                                    o.end_time
                                  ).format('HH:mm')}`}</Grid>
                                ) : (
                                  <Grid item xs={3}>{`${moment(
                                    o.start_time
                                  ).format('HH:mm')}-`}</Grid>
                                )}

                                <Grid item xs={1}>
                                  {o.time_spent}
                                </Grid>
                                <Grid item xs={1}>
                                  <ActionMenu
                                    id={o.id}
                                    status={o.status}
                                    description={o.description}
                                    start_time={o.start_time}
                                    end_time={o.end_time}
                                    time_spent={o.time_spent}
                                    tags={o.tags}
                                    update={props.update}
                                  />
                                </Grid>
                              </Grid>
                            </Card>
                          </>
                        );
                      })}
                  </ListItem>
                </div>
              );
            })}
          </List>
          <Button
            className={classes.loadButton}
            fullWidth
            onClick={handleNumPages}
          >
            load more
          </Button>
        </>
      )}
    </>
  );
}
