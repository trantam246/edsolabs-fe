import './Tag.css'
import { IconButton, Popper, Checkbox, Card, FormGroup, FormControlLabel } from '@material-ui/core'
import { LocalOffer } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';

export default function Tag(props) {

    //props
    const { getTags } = props;

    // button toggle
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const tagsClick = () => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((val) => !val);
    }

    // load data
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tags')
            .then(res => res.json())
            .then((data) => {
                data.slice().map(item => item.checked = false);
                setTags([...data]);
            });
    }, []);

    // list check
    const handleChange = (event) => {
        for (const tag of tags) {
            if (tag.id == event.target.value) {
                tag.checked = event.target.checked;
            }
        }
        setTags([...tags]);
    };

    useEffect(() => {
        var final = [];
        for (const tag of tags) {
            if (tag.checked === true) {
                final.push(tag.id);
            }
        }
        getTags(final);
    }, [tags])

    return (
        <>
            <IconButton component="span" onClick={tagsClick()} className="tagButton">
                <LocalOffer color="primary" />
            </IconButton>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition >
                <Card className="tagPopper">
                    <FormGroup>
                        {
                            tags.map((tag, index) => {
                                return (
                                    <FormControlLabel key={index}
                                        control={<Checkbox checked={tag.checked} onChange={handleChange} value={tag.id} color="primary" />}
                                        label={tag.name}
                                    />
                                )
                            })
                        }
                    </FormGroup>
                </Card>
            </Popper>
        </>
    )
}
