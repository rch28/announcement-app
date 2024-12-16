import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";
import { GetAccessToken } from "@/index";
import { useStore } from "@/stores/store";

const parseDate = (dateString) => {
  const createdAt = moment(dateString, moment.ISO_8601);

  if (!createdAt.isValid()) {
    console.error("Invalid date format:", dateString);
    return null;
  }

  return createdAt.format("MMMM Do YYYY, h:mm:ss a");
};

const Notifications = ({ notifications }) => {

  const setNotificationCount = useStore((state) => state.setNotificationCount);

  const handleReadNotification = async (notificationId)=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/notification/${notificationId}/update/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GetAccessToken()}`
        },
        body: JSON.stringify({
          read: true,
        }),
      });
      if (!response.ok) throw new Error("Something went wrong!!");

      // Update the notifications list locally
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification
        )
      );

      // Update the notification count
      setNotificationCount((prevCount) => Math.max(prevCount - 1, 0));

    } catch (error) {
      console.error('Error updating notification:', error);
    }
  }

  return (
    <div className="w-full max-h-96 overflow-auto px-2">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <ul>
        {notifications?.map((notification) => {
          let date = new Date(notification.created_at);
          // Validate the date
          if (isNaN(date.getTime())) {
            console.error("Invalid date format:", notification.created_at);
            date = null; // Or handle gracefully by setting a default value
          } else {
            const currentDate = new Date(); // Current date and time

            if (date.toISOString().split('T')[0] < currentDate.toISOString().split('T')[0]) {
              // If the date is in the future, keep the date (YYYY-MM-DD)
              date = date.toISOString().split('T')[0];
            } else {
              // If the date is today or earlier, keep the time (HH:MM:SS)
              date = date.toTimeString().split(' ')[0];
            }
          }

          let message = "";
          let link = "";
          
          switch (notification.type) {
            case "group_join":

              if(notification.group){
                message = `A member left the group: ${notification.group.name}`;
                link = `groups/${notification.group.name}?group_id=${notification.group.id}&category=${notification.group.category}`;
              } else {
                message = "A member left the group";
                link = "#"
              }
              break;

            case "group_leave":

              if(notification.group){
                message = `A member left the group: ${notification.group.name}`;
                link = `groups/${notification.group.name}?group_id=${notification.group.id}&category=${notification.group.category}`;
              } else {
                message = "A member left the group";
                link = "#"
              }

              break;

            case "announcement_create":

              if(notification.group){
                message = `New annonucement in group: ${notification.group.name}`;
                link = `groups/${notification.group.name}?group_id=${notification.group.group_id}&category=${notification.group.category}`;
              } else {
                message = "A new announcement on group";
                link = "#"
              }

              break;

            case "announcement_update":
              
              if(notification.announcement){
                message = `Annonucement: ${notification.announcement.title} Updated`;
                link = `announcements/${notification.announcement.title}?ann_id=${notification.announcement.id}`;
              } else {
                message = "Announcement updated";
                link = "#"
              }

              break;

            case "announcement_comment_create":
              
              if(notification.announcement){
                message = `New comment: ${notification.announcement.title}`;
                link = `announcements/${notification.announcement.slug}?ann_id=${notification.announcement.id}`;
              } else {
                message = "New comment on the announcement";
                link = "#"
              }

              break;

            case "announcement_like":
                
                if(notification.announcement){
                  message = `New Like: ${notification.announcement.title}`;
                  link = `announcements/${notification.announcement.slug}?ann_id=${notification.announcement.id}`;
                } else {
                  message = "New like on the announcement";
                  link = "#"
                }

                break;

            case "announcement_unlike":
              
              if(notification.announcement){
                message = `Dislike: ${notification.announcement.title}`;
                link = `announcements/${notification.announcement.slug}?ann_id=${notification.announcement.id}`;
              } else {
                message = "Dislike on the announcement";
                link = "#"
              }

              break;

            default:
              message = "Notification received.";
              break;
          }

          return (
            <div
              key={notification.id}
              className={`capitalize p-2 ${
                !notification.read &&
                "bg-slate-200 dark:bg-gray-700 rounded-md my-1 text-sm"
              }`}
            >
              <Link
                href={link}
                className="flex items-start justify-between gap-4 font-medium"
                onClick={()=>{
                  if (notification.read === false){
                    handleReadNotification(notification.id);
                  }
                }}
              >
                <h1>
                  {message}
                </h1>
                <p>
                  <DotsHorizontalIcon />
                </p>
              </Link>
              <p className="font-semibold">{date}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Notifications;
