import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 20,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        padding: 15, 
      },
    },
    title: {
      display: true,
      text: "Holdings",
      padding: {
        top: 10,
        bottom: 20, 
      },
    },
  },
};
export function VerticalGraph({ data }) {
  return <Bar options={options} data={data} />;
}