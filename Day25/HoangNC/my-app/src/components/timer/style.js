import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles((theme) => ({
  dateFilter: {
    display: "flex",
    alignItems: "center",
    marginBottom: "40px",
    marginTop: "16px",
  },
  datePicker: {
    margin: "0 8px",
  },
  filter: {
    borderTop: "4px solid",
  },
  input: {
    margin: "24px",
    flex: 1,
    minWidth: 400,
  },
  header: {
    display: "flex",
  },
  countTimer: {
    display: "flex",
    alignItems: "center",
  },
  formatTime: {
    margin: "0 16px",
    lineHeight: "100%",
  },
  tasks: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "16px",
    padding: "8px",
    textAlign: "center",
    borderBottom: "1px solid",
  },
  tasksInfo: {
    display: "flex",
    alignItems: "center",
    lineHeight: "28px",
  },
  timeSpent: {
    width: "80px",
  },
  menu: {
    width: "150px",
  },
  endTime: {
    width: "80px",
  },
  startTime: {
    width: "80px",
  },
  tags: {
    marginRight: "10px",
  },
  border: {
    borderRight: "3px solid",
  },
  main: {
    marginLeft: "10px",
    marginTop: "10px",
  },
  dayGroup: {
    border: "1px solid",
    backgroundColor: "#E5E1F0",
    boxShadow: "-3px 3px",
  },
  loadmore: {
    marginTop: "50px",
    textAlign: "center",
  },
}));
