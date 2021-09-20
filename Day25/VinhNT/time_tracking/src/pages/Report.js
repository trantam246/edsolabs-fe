import React, { useState, useEffect } from 'react';
import SideNarBar from '../components/SideNarbar';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from '../components/SideNarbar';
import ReportHeader from '../components/ReportHeader';
import action from '../services/action';
import ReportBody from '../components/ReportBody';
const useStyles = makeStyles((theme) => ({
  content: {
    // padding: theme.spacing(2),
    position: 'relative',
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
  },
}));
export default function Report() {
  const classes = useStyles();
  const [task, setTask] = useState([]);
  useEffect(() => {
    async function getTask() {
      const res = await action.getTasks();
      setTask(res.data);
    }
    getTask();
  }, []);
  return (
    <>
      <SideNarBar />
      <main className={classes.content}>
        <ReportHeader />
        <ReportBody task={task} />
      </main>
    </>
  );
}
