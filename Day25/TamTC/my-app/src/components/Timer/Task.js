import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles"
import moment from 'moment';
import Actions from './Actions';

const useStyles = makeStyles(() => ({

    task__item: {
        display: 'flex',
        alignItems: 'center !important',
        justifyContent: 'space-between',
        border: '1px gray solid'
    },
    task__tag: {
        maxWidth: '50rem',
        display: 'flex',
        alignItems: 'center'
    },
    icon__tag: {
        marginRight: '1rem'
    },
    title: {
        width: '40rem'
    },
    time: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
    },
    icon__action: {
        position: 'relative'
    }
}))

export default function Task(props) {
    const classes = useStyles()
    const formatTime = props.end ? (moment(new Date(props.start)).format("hh:mm") + " - " + moment(new Date(props.end)).format("hh:mm")) : (moment(new Date(props.start)).format("hh:mm")) + " - ..."

    const [openAction, setOpenAction] = useState(false)

    const handleClickAction = () => {
        setOpenAction(!openAction)
    }
    const handleDeleteTask = (newTasks) => {
        props.onDeleted(newTasks)
    }
    return (
        <ListItem alignItems="flex-start" className={classes.task__item}>
            <Typography className={classes.title}>{props.desc}</Typography>
            <div className={classes.time}>
                <Typography className={classes.task__tag}><LoyaltyIcon className={classes.icon__tag} />{props.tagsDesc}</Typography>
                <Typography>{formatTime}</Typography>
                <Typography>{props.spent}</Typography>
            </div>
            <MoreVertIcon className={classes.icon__action} onClick={handleClickAction} />{openAction && <Actions status={props.status} id={props.id} tasks={props.tasks} onDeleted={handleDeleteTask} />}
        </ListItem>
    );
}
