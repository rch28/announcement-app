import React from 'react'

const Testimonial = () => {
  return (
    <section className="bg-pink-200 py-16 ">
    <div className="container mx-auto text-center">
        <h2 className="text-3xl text-gray-800 font-bold mb-4">What Our Users Say</h2>
        <p className="text-lg text-gray-600 mb-8">See what our users have to say about their experience with Team App.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-3">
            {/* <!-- Testimonial Item --> */}
            <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">"Team App has transformed the way we collaborate. It's incredibly intuitive and user-friendly."</p>
                <p className="text-gray-600">- John Doe, Team Leader</p>
            </div>
            {/* <!-- Testimonial Item --> */}
            <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">"I love how easy it is to communicate with my team members using Group Mail. It saves me so much time!"</p>
                <p className="text-gray-600">- Jane Smith, Project Manager</p>
            </div>
            {/* <!-- Testimonial Item --> */}
            <div className="bg-white px-6 py-8 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4">"Task Assignment feature has helped us streamline our workflow and ensure that nothing falls through the cracks."</p>
                <p className="text-gray-600">- Michael Johnson, Developer</p>
            </div>
        </div>
    </div>
</section>
  )
}

export default Testimonial