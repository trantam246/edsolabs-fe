import TimerIcon from "@mui/icons-material/Timer";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Avatar from "@mui/material/Avatar";
import { getUser } from "./common";
import { Link } from "react-router-dom";
import { useStyles } from "./style";

const onLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};
export default function Sidebar() {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      {getUser() ? (
        <div className={classes.info}>
          <Avatar
            className={classes.avt}
            src={JSON.parse(localStorage.avatar)}
          ></Avatar>
          {JSON.parse(localStorage.name)}
        </div>
      ) : (
        ""
      )}
      <div className={classes.sidebarItem}>
        <TimerIcon className={classes.sidebarIcon} />
        <Link to="/">Timer</Link>
      </div>
      <div className={classes.sidebarItem}>
        <EqualizerIcon className={classes.sidebarIcon} />
        <Link to="/report">Report</Link>
      </div>
      <div className={classes.sidebarItem}>
        <ExitToAppIcon className={classes.sidebarIcon} />
        <input
          className={classes.logoutBtn}
          type="button"
          variant="contained"
          value="Logout"
          onClick={onLogout}
        ></input>
      </div>
    </div>
  );
}
