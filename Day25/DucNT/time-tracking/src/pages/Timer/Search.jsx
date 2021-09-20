import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { formatDay } from '../../js/FormatFunction'
import 'react-datepicker/dist/react-datepicker.css'
const Search = props => {
  const [startDate, setStartDate] = useState()
  return (
    <DatePicker
      selected={startDate}
      onChange={date => {
        setStartDate(date)
        return props.filterDay(formatDay(date))
      }}
    />
  )
}
export default Search
