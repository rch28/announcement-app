'use client';

import MemberChart from "@/components/analytics/MemberChart";
import RatingChart from "@/components/analytics/RatingChart";
import AnnouncementList from "@/components/analytics/AnnounementList";
import GroupImpression from "@/components/analytics/GroupImpression";
import GroupImpressionCountry from "@/components/analytics/GroupCountry";

const GroupAnalyticsPage = () => {
  return (
    <div>
      <div className="my-20 grid grid-cols-2 gap-10">
        <MemberChart />
        <RatingChart />
        <GroupImpression />
        <GroupImpressionCountry />
      </div>
      <AnnouncementList />
    </div>
  );
};

export default GroupAnalyticsPage;