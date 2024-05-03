import React from 'react'

const Features = () => {
  return (
    <section className="bg-white py-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* <!-- Feature Item --> */}
        <div className="bg-blue-200 px-6 py-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Group Mail</h3>
            <p className="text-gray-700">Send emails to your entire team with ease.</p>
        </div>
        {/* <!-- Feature Item --> */}
        <div className="bg-blue-200 px-6 py-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">User Management</h3>
            <p className="text-gray-700">Easily manage your team members and their permissions.</p>
        </div>
        {/* <!-- Feature Item --> */}
        <div className="bg-blue-200 px-6 py-8 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-4">Task Assignment</h3>
            <p className="text-gray-700">Assign tasks to team members and track their progress.</p>
        </div>
    </div>
</section>
  )
}

export default Features