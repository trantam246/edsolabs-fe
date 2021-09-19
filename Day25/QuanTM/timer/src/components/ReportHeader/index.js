import React from "react";
import { Box, Typography } from "@material-ui/core";

import ReportMenu from "./ReportMenu";
import { useReportContext } from "../../pages/Report";
import { formatDate } from "../../utils";

export default function ReportHeader() {
  const { selected, dateRange } = useReportContext();

  const renderLabel = () => {
    if (selected !== "Date range") {
      return selected;
    }
    if (!dateRange) {
      return "Total";
    }
    const { startDate, endDate } = dateRange;
    if (!endDate) {
      return `Since ${formatDate(startDate)}`;
    }
    if (!startDate) {
      return `Till ${formatDate(endDate)}`;
    }
    return `From ${formatDate(startDate)} to ${formatDate(endDate)}`;
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" component="h2">
        {renderLabel()}: 36.64 hours
      </Typography>
      <ReportMenu />
    </Box>
  );
}
