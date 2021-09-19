import 'date-fns';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import DateFilter from './DateFilter';
import TasksList from './TasksList';
import Button from "@material-ui/core/Button"


const drawerWidth = '20rem'
const useStyles = makeStyles(() => ({
    main: {
        marginLeft: drawerWidth,
        marginTop: '6rem',
        padding: '2rem'
    },
    btn: {
        margin: '10rem auto',
        display: 'flex'
    }
}))

export default function MainTimer(props) {
    const classes = useStyles()
    const handleFilterDays = (days) => {
        props.onFilterDays(days)
    }
    return (
        <div className={classes.main}>
            <DateFilter tasks={props.tasks} onFilterDays={handleFilterDays} />
            <TasksList tasks={props.tasks} />
            <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                type="submit"
            >
                Load more
            </Button>
        </div>
    );
}
