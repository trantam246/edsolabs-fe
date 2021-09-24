import React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  table: {
    borderRadius: "10px",
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0 !important",
  },
}))
export default function Team(props) {
  const classes = useStyles()

  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 120 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Full Name</TableCell>
              <TableCell align="left">Rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students?.map((s, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {idx + 1}
                </TableCell>
                <TableCell align="left">{s.fullName}</TableCell>
                <TableCell align="left">{s.rank}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
