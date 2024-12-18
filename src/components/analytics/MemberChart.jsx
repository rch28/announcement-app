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
      label: 'Member Join',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(5, 155, 255, 1)',
      tension: 0.1,
    },
    {
      label: 'Member leave',
      data: [55, 49, 70, 71, 46],
      fill: false,
      borderColor: 'rgb(243, 64, 57, 1)',
      tension: 0.1,
    },
  ],
};

const MemberChart = () => {
  return (
    <div className='w-[500px] h-fit shadow-custom-all p-10 rounded-xl'>
      <h1 className='text-center font-bold text-xl'>Group Member Status</h1>
      <Line data={data} />
    </div>
  );
};

export default MemberChart; // Default export
