import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import moment from "moment";
import Link from "next/link";

const parseDate = (dateString) => {
  const createdAt = moment(dateString, moment.ISO_8601);

  if (!createdAt.isValid()) {
    console.error("Invalid date format:", dateString);
    return null;
  }

  return createdAt.format("MMMM Do YYYY, h:mm:ss a");
};

const Notifications = ({ notifications }) => {
  return (
    <div className="w-full max-h-96 overflow-auto px-2">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <ul>
        {notifications?.map((notification) => {
          let date = new Date(notification.created_at);
          const currentDate = new Date(); // Current date and time
          
          if (date.toISOString().split('T')[0] > currentDate.toISOString().split('T')[0]) {
            // If the date is in the future, keep the date (YYYY-MM-DD)
            date = date.toISOString().split('T')[0];
          } else {
            // If the date is today or earlier, keep the time (HH:MM:SS)
            date = date.toTimeString().split(' ')[0];
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
                href={`/notifications/${notification.id}`}
                className="flex items-start justify-between gap-4 font-medium"
              >
                <h1>
                  {(() => {
                    switch (notification.type) {
                      case "group_join":
                        return "New member joined the group!";
                      case "group_leave":
                        return "A member left the group.";
                      case "announcement_create":
                        return "New annonucement";
                      case "announcement_update":
                        return "Announcement updated";
                      case "announcement_comment_create":
                        return "New comment on the announcement";
                      case "announcement_like":
                          return "New like on the announcement";
                      case "announcement_dislike":
                        return "Dislike on the announcement";
                      default:
                        return "Notification received.";
                    }
                  })()}
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
