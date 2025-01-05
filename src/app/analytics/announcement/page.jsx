'use client';

import LikeDislikeChart from "@/components/analytics/LikeDislikeChart";
import CommentChart from "@/components/analytics/CommentChart";
import AnnouncementImpression from "@/components/analytics/AnnouncementImpression";
import AnnouncementImpressionCountry from "@/components/analytics/AnnouncementCountry";
import { useSearchParams } from 'next/navigation';

const AnnouncementAnalyticsPage = ()=>{
    const searchParams = useSearchParams();
    const ann_id = searchParams.get('ann_id');

    return(
        <div className="my-20 grid grid-cols-2 gap-10">
            {/* <div> */}
                <AnnouncementImpression ann_id={ann_id} />
                <AnnouncementImpressionCountry ann_id={ann_id} />
            {/* </div>
            <div className="my-20 grid grid-cols-2 gap-10"> */}
                <LikeDislikeChart ann_id={ann_id} />
                <CommentChart ann_id={ann_id} />
            {/* </div> */}
        </div>
    )
}


export default AnnouncementAnalyticsPage;
