'use client';

import MemberChart from "@/components/analytics/MemberChart";
import RatingChart from "@/components/analytics/RatingChart";
import AnnouncementList from "@/components/analytics/AnnounementList";

const GroupAnalyticsPage = () => {
  return (
    <div>
      <div className="my-20 grid grid-cols-2 gap-10">
        <MemberChart />
        <RatingChart />
      </div>
      <AnnouncementList />
    </div>
  );
};

export default GroupAnalyticsPage;