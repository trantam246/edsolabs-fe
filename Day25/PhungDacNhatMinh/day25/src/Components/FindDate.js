import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { formatDay } from "./Function";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const FindDate = (props) => {
  const [startDate, setStartDate] = useState();
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        return props.filterDay(formatDay(date));
      }}
    />
  );
};
export default FindDate;
