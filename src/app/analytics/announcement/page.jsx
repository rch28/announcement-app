'use client';

import LikeDislikeChart from "@/components/analytics/LikeDislikeChart";
import CommentChart from "@/components/analytics/CommentChart";
import AnnouncementImpression from "@/components/analytics/AnnouncementImpression";

const AnnouncementAnalyticsPage = ()=>{
    return(
        <div className="my-10">
            <div>
                <AnnouncementImpression />
            </div>
            <div className="my-20 grid grid-cols-2 gap-10">
                <LikeDislikeChart />
                <CommentChart />
            </div>
        </div>
    )
}


export default AnnouncementAnalyticsPage;
