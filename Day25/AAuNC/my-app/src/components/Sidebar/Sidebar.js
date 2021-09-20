import { Grid, Card, CardHeader, Avatar, CardContent, MenuList, MenuItem, ListItemIcon, ListItemText, Button } from "@material-ui/core";
import ScheduleIcon from '@material-ui/icons/Schedule';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

export default function Sidebar() {
    let history = useHistory();
    let isLogged = JSON.parse(localStorage.getItem('isLogged'));
    let account = JSON.parse(localStorage.getItem('account'));

    const logOut = () => {
        // localStorage.setItem('isLogged', 'false');
        // localStorage.removeItem('account');
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            <Grid item style={{ width: '225px' }}>
                {isLogged === true &&
                    <CardHeader
                        avatar={<Avatar src={account.avatar} />}
                        title={account.fullname}
                    />
                }

                {(isLogged === false || isLogged === null) &&
                    <CardHeader
                        avatar={<Avatar>A</Avatar>}
                        title="Ngô Chung Á Âu"
                    />
                }

                <CardContent style={{ padding: '0px' }}>
                    <MenuList>
                        <MenuItem component={Link} to="/timer">
                            <ListItemIcon>
                                <ScheduleIcon />
                            </ListItemIcon>
                            <ListItemText>Timer</ListItemText>
                        </MenuItem>
                        <MenuItem component={Link} to="/report">
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText>Report</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </MenuItem>
                    </MenuList>
                </CardContent>
            </Grid>
        </>
    )
}
