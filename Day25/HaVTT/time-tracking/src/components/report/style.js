import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "4px",
    width: 100,
  },
  selectEmpty: {
    marginTop: "8px",
  },
  border: {
    borderRight: "3px solid",
  },
  header: {
    borderBottom: "4px solid",
  },
  filter: {
    display: "flex",
    justifyContent: "space-between",
    margin: "12px 48px",
  },
  totalTime: {
    width: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));