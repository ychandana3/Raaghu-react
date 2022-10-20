import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RdsBubbleChart  from "./rds-bubble-chart";
import "./rds-bubble-chart.scss"

export default {
  title: "Charts/BubbleChart",
  component: RdsBubbleChart,
} as ComponentMeta<typeof RdsBubbleChart>;

const Template: ComponentStory<typeof RdsBubbleChart> = (args) => <RdsBubbleChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  ChartLabels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  chartDataSets: [
    {
      label: 'Dataset 1',
      data: [90, 97, 20, 30, 40, 50, 60, 70],
      borderColor: ['red'],
      backgroundColor: ['rgba(255, 99, 132)'],
    },
    {
      label: 'Dataset 2',
      data: [90, 80, 70, 60, 50, 40, 30, 90, 98],
      borderColor: ['orange'],
      backgroundColor: ['rgba(255, 206, 86)'],
    }
  ],


  ChartOptions: {
    responsive: true,
    radius: 10,
    maintainAspectRatio: false,
    pointStyle: 'triangle',
    plugins: {

      legend: {
        position: 'top',
        pointStyle: "line",

        labels: {

          usePointStyle: true
        }
      },
      tooltip: {
        usePointStyle: true,
      },
      title: {
        display: true,
        text: 'Bubble Chart'
      }
    },

  },
};