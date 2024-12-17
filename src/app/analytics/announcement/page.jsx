'use client';

import LikeDislikeChart from "@/components/analytics/LikeDislikeChart";
import CommentChart from "@/components/analytics/CommentChart";

const AnnouncementAnalyticsPage = ()=>{
    return(
        <div className="my-20 grid grid-cols-2 gap-10">
            <LikeDislikeChart />
            <CommentChart />
        </div>
    )
}


export default AnnouncementAnalyticsPage;