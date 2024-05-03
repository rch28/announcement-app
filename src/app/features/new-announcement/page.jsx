import React from "react";

const newAnnouncement = () => {
  return (
    <div className="min-h-96">
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            New Announcement
          </h2>
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <form action="#" method="POST">
              <div className="mb-4">
                <label
                  for="announcement_title"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="announcement_title"
                  name="announcement_title"
                  className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  for="announcement_content"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Content
                </label>
                <textarea
                  id="announcement_content"
                  name="announcement_content"
                  className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  rows="6"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600"
                >
                  Post Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default newAnnouncement;
