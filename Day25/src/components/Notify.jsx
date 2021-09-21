import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from "@material-ui/core/styles";
import { useTagContext } from "../contexts/TagContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Notify() {
  const classes = useStyles();
  const { notify, notifyTitle, setNotify, statusNotify } =
    useTagContext();

  const handleClose = () => {
    setNotify(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={notify} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusNotify}>
          {notifyTitle ? notifyTitle : null}
        </Alert>
      </Snackbar>
    </div>
  );
}