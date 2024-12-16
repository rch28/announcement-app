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
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
    {
      label: 'Member leave',
      data: [55, 49, 70, 71, 46],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const MemberChart = () => {
  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Group Member Status</h1>
      <Line data={data} />
    </div>
  );
};

export default MemberChart; // Default export
