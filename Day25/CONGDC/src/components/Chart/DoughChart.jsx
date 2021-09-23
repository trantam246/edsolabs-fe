import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chartData = [
  {
    label: "Online",
    value: "290",
  },
  {
    label: "Meeting",
    value: "260",
  },
  {
    label: "Training",
    value: "180",
  },
  {
    label: "Coding",
    value: "140",
  },

];

const chartConfigs = {
  type: "doughnut2d", 
  width: "100%", 
  height: "400",
  dataFormat: "json", 
  dataSource: {

    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      theme: "fusion",
    },
    data: chartData,
  },
};

const Donut2D = () => {
  return <ReactFC {...chartConfigs} />;
};

export default Donut2D;