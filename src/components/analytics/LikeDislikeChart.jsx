import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const LikeDislikeChart = () => {
  const data = {
    labels: ["Like", "Dislike"],
    datasets: [
      {
        data: [12, 29],
        backgroundColor: [
            'rgba(126, 34, 206)',
            'rgba(177, 156, 217, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='w-[500px] h-fit shadow-2xl p-10 rounded-lg'>
      <h1 className='text-center font-bold text-xl'>Like/Dislike Ratio</h1>
      <Pie data={data} />
    </div>
  )
}

export default LikeDislikeChart;