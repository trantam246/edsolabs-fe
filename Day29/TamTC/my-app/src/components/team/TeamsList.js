import React, { useContext } from "react"
import Team from "./Team"
import { makeStyles } from "@material-ui/core/styles"
import Context from "../../context/Context"

const useStyles = makeStyles((theme) => ({
  tables__list: {
    display: "flex",
    flexWrap: "wrap",
  },
  table: {
    width: "46%",
    margin: "20px",
  },
  title: {
    float: "left",
    marginBottom: "10px",
  },
}))
export default function TeamsList() {
  const classes = useStyles()
  const ctx = useContext(Context)
  const studentsList = ctx.students.map((s) => ({
    fullName: s.full_name,
    rank: s.rank,
  }))
  const result = []
  const groups = []
  const ranks = [...new Set(studentsList.map((s) => s.rank))]

  ranks.forEach((g, idx) => {
    const group = []
    studentsList.forEach((s) => s.rank === idx + 1 && group.push(s))
    groups.push(group)
  })

  ranks.forEach((r) => {
    const allStudentsByGroup = []
    groups.map((o) => allStudentsByGroup.push(o.shift()))
    result.push(allStudentsByGroup)
  })
  return (
    <div className={classes.tables__list}>
      {result.map((o, idx) => (
        <div key={idx} className={classes.table}>
          <span className={classes.title}>Team {idx + 1}</span>
          <Team students={o} />
        </div>
      ))}
    </div>
  )
}
