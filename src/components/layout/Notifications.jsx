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
          const date = parseDate(notification.created_at);
          return (
            <div
              key={notification._id}
              className={`capitalize p-2 ${
                !notification.read &&
                "bg-slate-200 dark:bg-gray-700 rounded-md my-1 text-sm"
              }`}
            >
              <Link
                href={`/notifications/${notification._id}`}
                className="flex items-start justify-between gap-4 font-medium"
              >
                <h1>{notification.message}</h1>
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
