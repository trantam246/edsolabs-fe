import './ListItem.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Menu, MenuItem } from "@material-ui/core";
import { LocalOffer } from "@material-ui/icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import { useState, useEffect, useContext } from 'react';
import { ItemContext } from '../../Context/ItemContext'; 
import { deleteItem } from '../../../service/Task';

export default function ListItem(props) {

    const { obj } = props;
    const { item, setItem, reload, getReload,  tagsItem, setTagsItem, running, setRunning } = useContext(ItemContext);

    // menu
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    //

    // Dialog
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        handleCloseMenu();
        setOpenDialog(false);
    };
    //

    const [tags, setTags] = useState([]);

    // Hiện danh sách tags
    useEffect(() => {
        fetch('http://localhost:5000/tags')
            .then(res => res.json())
            .then((data) => {
                setTags([...data]);
            })
            .catch(error => console.error('Error:', error));
    }, [])

    // Hiện thị tags
    const tagsText = () => {
        let type = [];
        obj.tags.map((o) => {
            for (const i of tags) {
                if (i.id === o) {
                    type.push(i.name);
                }
            }
        })
        return type.join(", ")
    }

    //khi bấm đồng ý xoá
    const deleteButton = () => {
        handleCloseMenu();
        deleteItem(obj.id);
        getReload();
    }

    //Bấm start tại item
    const startButton = () => {
        handleCloseMenu();
        setOpenDialog(false);
        if(running === true) {
            item.end_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //Tính khoảng thời gian
            var diffTime = moment(item.end_time).diff(item.start_time);
            item.time_spent = moment.utc(diffTime).format("HH:mm:ss");
            item.status = 1;
            setRunning(!running);
        }
        else{
            setItem({
                "id": Math.floor(Math.random()*100),
                "description": obj.description,
                "start_time": moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                "end_time": null,
                "time_spent": null,
                "tags": obj.tags,
                "status": 0
            });
            setTagsItem([...obj.tags])
            setRunning(!running);
        }
    }

    const stopButton = () => {
        handleCloseMenu();
        setOpenDialog(false);
        if(running === true) {
            item.end_time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //Tính khoảng thời gian
            var diffTime = moment(item.end_time).diff(item.start_time);
            item.time_spent = moment.utc(diffTime).format("HH:mm:ss");
            item.status = 1;
            setRunning(!running);
        }
    }
    return (
        <Grid item container alignItems="center" justifyContent="space-between" style={{ border: '1px solid black', paddingLeft: '5px' }} xs lg sm>
            <Grid item container align="left" lg xs={3} sm={12}>{obj.description}</Grid>
            <Grid item container alignItems="center" justifyContent="space-between" lg xs={9} sm={12}>
                <div className="tagText">
                    <LocalOffer color="primary" />
                    <span >{tagsText()}</span>
                </div>

                <div className="timeBox">
                    {obj.end_time != null &&
                        <div className="time">{moment(obj.start_time).format("HH:mm")} - {moment(obj.end_time).format("HH:mm")}</div>
                    }

                    {obj.end_time == null &&
                        <div className="time">{moment(obj.start_time).format("HH:mm")}</div>
                    }

                    {obj.time_spent != null && <div className="duration">{obj.time_spent}</div>}
                    {obj.time_spent == null && <div className="duration">Running...</div>}
                </div>

                <div>
                    <IconButton onClick={handleClickMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        PaperProps={{
                            style: {
                                marginTop: '50px',
                                maxHeight: 50 * 2.5,
                                width: '15ch',
                            },
                        }}
                    >
                        {obj.status == 1 && <MenuItem onClick={startButton}>Start</MenuItem>}
                        {obj.status == 0 && <MenuItem onClick={stopButton}>Stop</MenuItem>}

                        <MenuItem onClick={handleClickOpenDialog}>Delete</MenuItem>
                        <Dialog
                            open={openDialog}
                            onClose={handleCloseDialog}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Comfirmation"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure to delete this item?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={deleteButton} color="primary">
                                    Yes
                                </Button>
                                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                    No
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Menu>
                </div>
            </Grid>
        </Grid>
    )
}
