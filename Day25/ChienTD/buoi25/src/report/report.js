import React from "react";
import { Box } from "@mui/system";
import { Doughnut, Bar } from "react-chartjs-2";
const data = {
  labels: ["Online", "Meeting", "Training", "Coding"],
  datasets: [
    {
      label: "Time Activity",
      data: [300, 50, 100, 20],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(100, 0, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const config = {
  type: "pie",
  data: data,
};
const Report = () => {
  return (
    <Box>
      <Box component="h2" textAlign="left" borderBottom={2} p={3} m={0}>
        Productivity report
      </Box>
      <Box m={5} display="flex">
        <Box width="500px">
          <Doughnut
            data={data}
            options={{ maintainAspectRatio: true }}
            width={200}
          />
        </Box>
        <Box width="700px" pt={10} pl={5}>
            <Bar data={data}  options={{ indexAxis: 'y' }}/>
        </Box>
      </Box>
    </Box>
  );
};
export default Report;
