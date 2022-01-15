import React from "react";
import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
// import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);
const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: "bar2d",
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Most Forked",
        theme: "fusion",
        // theme: "candy",
        decimals: 0, // display decinal or not [ 0 or 1 (default) ]
        doughnutRadius: "45%",
        // paletteColors: "green" // // repeated color
        // numberSuffix: "%",
        showPercentValues: 0, //show value instead of percentage
        xAxisName: "Repos",
        yAxisName: "Forked",
        paletteColors:
          "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
      },
      // Chart Data
      data,
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
