import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

export default function BarCh({ stats = [] }: { stats: { id: string; value: number; color: string }[] }) {
  return (
    <div className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] 
                    px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12 pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <Bar
        data={{
          labels: stats.map((item) => item.id),
          datasets: [
            {
              data: stats.map((item) => item.value),
              backgroundColor: stats.map((item) => item.color),
              borderColor: stats.map((item) => item.color),
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                autoSkip: false,
                maxRotation: 30,
                minRotation: 30,
                font: { size: 12 },
              },
            },
            y: {
              grid: { display: true },
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
          plugins: {
            legend: { display: false },
          },
        }}
      />
    </div>
  );
}
