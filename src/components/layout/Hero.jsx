
import { hero } from "../../../public"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="flex flex-col  min-h-[100dvh]">
      
      <main className="flex-1">
        
        <section className="w-full py-12 grid place-items-center ">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                alt="Join or Create Groups"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src={hero}
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Join or Create Groups
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Connect with Your Community</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Easily join or create groups to stay connected with your organization, club, or team. Share
                    announcements, updates, and important information with your group members.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-full bg-purple-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#805AD5] disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]"
                    href="/groups"
                  >
                    Join a Group
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="/groups"
                  >
                    Create a Group
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-200 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Stay Informed with Announcemates
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Receive real-time updates and important announcements from your groups. Never miss a beat with our
                powerful notification system.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-full bg-purple-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#805AD5] disabled:pointer-events-none disabled:opacity-50  dark:text-white dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]"
                href="/user/profile/dashboard/manage-announcements"
              >
                Manage Announcements
              </Link>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800  dark:bg-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Manage Notifications
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t dark:border-none">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join the Community</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Stay connected with your organization, club, or team. Join or create a group to receive important
                announcements and updates.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <div className="flex space-x-2 justify-center items-center">
                <Link href={"/auth/register"}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-purple-700 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-purple-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#805AD5] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#805AD5] dark:text-white dark:hover:bg-purple-800/90 dark:focus-visible:ring-[#805AD5]"
                >
                  Join Now
                </Link>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  )
}

function BadgeAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}