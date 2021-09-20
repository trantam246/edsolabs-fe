import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Header from '../UI/Header';
import { makeStyles } from "@material-ui/core/styles"
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Watch from './Watch'
import TagsList from './TagsList';

const useStyles = makeStyles((theme) => ({

    input: {
        width: '22rem',
        [`& input`]: {
            fontSize: '1.6rem',
        },
        [`& label`]: {
            fontSize: '1.6rem',
            color: 'black',
        },
        [`& fieldset`]: {
            border: 'none',
        }
    },
    icon: {
        color: 'black',
        width: '20rem',
        fontSize: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    icon__tag: {
        fontSize: '3rem'
    },
    svg: {
        fontSize: '2rem'
    }
}))
export default function HeaderTimer(props) {

    const classes = useStyles()
    const [showListTag, setShowListTag] = useState(false)
    const [desc, setDesc] = useState('')
    const [post, setPost] = useState(props.newTask)
    const handleChange = (e) => {

        setDesc(e.target.value)
    }
    const handleBlur = () => {
        if (desc.trim().length === 0) {
            alert("Điền vào 'What are you working on?'")
            return
        }
        else
            setPost({ ...post, description: desc })
    }
    const handleTagIcon = () => {
        setShowListTag(!showListTag)
    }
    const handleAdd = tags => {
        setPost({ ...post, ...tags })
    }
    const handleLoadTask = (newTask) => {
        props.onLoadTask(newTask)
    }
    return (
        <Header>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label="What are you working on?"
                autoComplete="off"
                className={classes.input}
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <div className={classes.icon}>
                <LoyaltyIcon onClick={handleTagIcon} className={classes.icon__tag} />
                {showListTag && <TagsList tags={props.tags} onAdd={handleAdd} />}
                <Watch newTask={post} tasks={props.tasks} onLoadTask={handleLoadTask} />
            </div>
        </Header>
    );
}
