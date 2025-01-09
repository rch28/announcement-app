import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const LikeDislikeChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Like',
        data: [12, 19, 23, 31, 45],
        borderColor: 'rgba(126, 34, 206, 1)',
        backgroundColor: 'rgba(126, 34, 206, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Dislike',
        data: [29, 25, 30, 28, 22],
        borderColor: 'rgba(177, 156, 217, 1)',
        backgroundColor: 'rgba(177, 156, 217, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className='w-full h-fit shadow-custom-all p-10 rounded-xl'>
      <h1 className='text-center font-bold text-xl'>Like/Dislike Trend</h1>
      <Line data={data} />
    </div>
  );
}

export default LikeDislikeChart;
