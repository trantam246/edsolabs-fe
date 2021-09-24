import React, { useContext, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@material-ui/core/Button"
import Context from "../../context/Context"
import StudentRow from "./StudentRow"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: "40px 0",
    boxShadow: "rgb(100 100 111 / 80%) 0 7px 29px 0 !important",
  },
  table: {
    boxShadow: "rgb(100 100 111 / 40%) 0 7px 29px 0 !important",
    width: "76% !important",
    borderRadius: "10px",
    margin: "40px auto 0",
    [`@media(max-width: 1024px)`]: {
      width: "100% !important",
    },
  },
}))
export default function StudentsList() {
  const classes = useStyles()
  const ctx = useContext(Context)
  const [visible, setVisible] = useState(5)
  const nameSearch = ctx.name
  const genderSearch = ctx.gender
  const ageSearch = ctx.age
  let studentsList = ctx.students?.map((student) => {
    const fullName = student.full_name.split(" ")
    const lastName = fullName.pop()

    return {
      stt: student.id,
      firstName: fullName.join(" "),
      lastName: lastName,
      gender: student.gender === "M" ? "Male" : "Female",
      age: new Date().getFullYear() - new Date(student.dob).getFullYear(),
      rank: student.rank,
    }
  })

  let filterList = studentsList
  if (nameSearch.trim().length > 0) {
    filterList = filterList?.filter(
      (s) => s.lastName.localeCompare(nameSearch) === 0
    )
  }

  if (genderSearch.trim().length > 0)
    filterList = filterList?.filter(
      (s) => s.gender.localeCompare(genderSearch) === 0
    )
  if (ageSearch.trim().length > 0)
    filterList = filterList?.filter((s) => s.age === +ageSearch)

  if (ctx.isSearch) studentsList = filterList
  const loadMore = () => {
    setVisible((prev) => prev + 5)
  }
  return (
    <>
      <TableContainer component={Paper} className={classes.table}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Rank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList?.slice(0, visible)?.map((row, idx) => (
              <StudentRow
                key={row.stt}
                stt={idx + 1}
                firstName={row.firstName}
                lastName={row.lastName}
                gender={row.gender}
                age={row.age}
                rank={row.rank}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {studentsList?.slice(0, visible).length === visible &&
        studentsList?.slice(visible).length > 0 && (
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            type="button"
            onClick={loadMore}
          >
            Load more students
          </Button>
        )}
    </>
  )
}
