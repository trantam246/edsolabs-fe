import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import CssBaseline from "@material-ui/core/CssBaseline"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import userApi from "../../apis/userApi"


const drawerWidth = '20rem'
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        width: drawerWidth,
        textAlign: "center",
        [`& a`]: {
            textDecoration: 'none',
            fontSize: '2rem',
            color: 'black'
        },
        [`& svg`]: {
            fontSize: '3rem'
        }
    },
    appBar: {
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,

    },
    toolbar: {
        // theme.mixins.toolbar,
        display: "flex",
        alignItems: 'center',
        padding: '2rem 1rem',
    },
    avatar: {
        width: '4rem',
        height: '4rem',
        backgroundSize: 'cover',
        borderRadius: '50%',
        marginRight: '2rem'
    },
    menu: {
        [`& span`]: {
            fontSize: '1.6rem'

        }
    },
    name__admin: {
        fontSize:'2rem'
    }

}))

export default function Sidebar(props) {
    const classes = useStyles()
    const [user, setUser] = useState()

    const fetchUser = () => {
        try {
            userApi.getUser().then((res) => setUser(res))
        } catch (error) { }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <div className={classes.toolbar} > <img
                    className={classes.avatar}
                    src={user && user[0].avatar}
                    // image="./user.jpg"
                    alt="avatar" />
                    <Typography variant="h6" noWrap className={classes.name__admin}>
                        {user && user[0].fullname}
                    </Typography>
                </div>
                <List >
                    <Link to='/'>
                        <ListItem button>
                            <ListItemIcon >
                                <AccessTimeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Timer" className={classes.menu} />
                        </ListItem>
                    </Link>
                    <Link to='/report'>
                        <ListItem button>
                            <ListItemIcon>
                                <EqualizerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Report" className={classes.menu} />
                        </ListItem>
                    </Link>
                    <Link to='/login'>
                        <ListItem button onClick={props.onLogout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" className={classes.menu} />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </div>
    )
}
