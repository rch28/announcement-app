'use client';

import MemberChart from "@/components/analytics/MemberChart";
import RatingChart from "@/components/analytics/RatingChart";

const GroupAnalyticsPage = () => {
  return (
    <div className="my-20 grid grid-cols-2 gap-10">
      <MemberChart />
      <RatingChart />
    </div>
  );
};

export default GroupAnalyticsPage;