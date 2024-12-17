// File: components/analytics/MemberChart.js

'use client';
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Group Rating',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(5, 155, 255, 1)',
      tension: 0.1,
    }
  ],
};

const RatingChart = () => {
  return (
    <div className='w-[500px] h-fit shadow-2xl p-10 rounded-lg'>
      <h1 className='text-center font-bold text-xl'>Group Rate Status</h1>
      <Line data={data} />
    </div>
  );
};

export default RatingChart;
