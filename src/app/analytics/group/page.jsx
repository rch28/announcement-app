'use client';

import MemberChart from "@/components/analytics/MemberChart";
import RatingChart from "@/components/analytics/RatingChart";
import AnnouncementList from "@/components/analytics/AnnounementList";
import GroupImpression from "@/components/analytics/GroupImpression";
import GroupImpressionCountry from "@/components/analytics/GroupCountry";
import { useSearchParams } from 'next/navigation';

const GroupAnalyticsPage = () => {
  const searchParams = useSearchParams();
  const group_id = searchParams.get('group_id');

  return (
    <div>
      <div className="my-20 grid grid-cols-2 gap-10">
        <GroupImpression group_id={group_id} />
        <GroupImpressionCountry group_id={group_id} />
        <MemberChart group_id={group_id} />
        <RatingChart group_id={group_id} />
      </div>
      <AnnouncementList group_id={group_id} />
    </div>
  );
};

export default GroupAnalyticsPage;