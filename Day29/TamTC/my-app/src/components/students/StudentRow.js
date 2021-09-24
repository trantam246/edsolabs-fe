import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"

const StudentRow = (props) => {
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {props.stt}
      </TableCell>
      <TableCell align="left">{props.firstName}</TableCell>
      <TableCell align="left">{props.lastName}</TableCell>
      <TableCell align="left">{props.gender}</TableCell>
      <TableCell align="left">{props.age}</TableCell>
      <TableCell align="left">{props.rank}</TableCell>
    </TableRow>
  )
}
export default StudentRow
