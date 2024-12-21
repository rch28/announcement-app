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
      label: 'Announcement Impression Country',
      data: [65, 59, 80, 81, 56],
      fill: false,
      borderColor: 'rgb(5, 155, 255, 1)',
      tension: 0.1,
    }
  ],
};

const AnnouncementImpressionCountry = () => {
  return (
    <div className='w-[500px] h-fit shadow-custom-all p-10 rounded-xl'>
      <h1 className='text-center font-bold text-xl'>Announcement Impression Country</h1>
      <Line data={data} />
    </div>
  );
};

export default AnnouncementImpressionCountry;
