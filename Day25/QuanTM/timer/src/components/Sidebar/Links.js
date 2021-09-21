import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../ContextProvider";

const links = [
  { text: "Timer", icon: <QueryBuilderIcon />, path: "/" },
  { text: "Report", icon: <BarChartIcon />, path: "/report" },
  { text: "Log Out", icon: <ExitToAppIcon />, path: "/login" },
];

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
  listItem: {
    "&:hover": {
      backgroundColor: "#1d1b1b",
    },
  },
  textColor: {
    color: "#d5d7db",
  },
}));

export default function Links() {
  const classes = useStyles();
  const { setUser } = useGlobalContext();

  const handleLogOut = () => {
    setUser(null);
  };

  return (
    <List className={classes.list}>
      {links.map(({ text, icon, path }) => {
        return (
          <ListItem
            key={text}
            component={Link}
            to={path}
            className={classes.listItem}
            onClick={text === "Log Out" ? handleLogOut : undefined}
          >
            <ListItemIcon className={classes.textColor}>{icon}</ListItemIcon>
            <ListItemText className={classes.textColor}>{text}</ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
}

export { drawerWidth };
