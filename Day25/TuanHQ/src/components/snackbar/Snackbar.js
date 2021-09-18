import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useTagContext } from 'contexts/TagContext';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars() {
  const classes = useStyles();
  const { snackbar, contentSnackbat, setSnackbar, statusSnackbar } =
    useTagContext();

  const handleClose = () => {
    setSnackbar(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={snackbar} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={statusSnackbar}>
          {contentSnackbat ? contentSnackbat : 'Have a nice day!'}
        </Alert>
      </Snackbar>
    </div>
  );
}
