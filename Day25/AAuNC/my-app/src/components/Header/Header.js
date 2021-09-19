import './Header.css'
import Tag from '../Tag/Tag';
import Timer from '../Timer/Timer';
import { Grid, Input } from '@material-ui/core'
import React, { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../Context/ItemContext';

export default function Header() {
    //use context
    const { item, tagsItem } = useContext(ItemContext);
    const [taskName, setTaskName] = useState('What are you working on?');
    const [tags, setTags] = useState([]);
    //set tags state
    const getTags = (value) => setTags(value);
    //set description, tags cho item
    if (tagsItem.length !== 0) {
        item.tags = tagsItem;
    }
    else {
        item.tags = tags;
        item.description = taskName;
    }
    

    const changeInput = (e) => {
        e.preventDefault();
        setTaskName(e.target.value);
    }

    return (
        <>
            <Grid container justifyContent="space-between" className="headerReport">
                <Grid item component={Input} type="text" value={taskName} disableUnderline onChange={changeInput} xs />
                <Grid item container justifyContent="flex-end" xs>
                    <Grid item component={Tag} getTags={getTags} />
                    <Grid item component={Timer} />
                </Grid>
            </Grid>
        </>
    )
}
