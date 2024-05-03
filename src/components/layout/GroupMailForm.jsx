import React from 'react'

const GroupMailForm = () => {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <form action="#" method="POST">
                <div className="mb-4">
                    <label for="subject" className="block text-gray-700 font-semibold mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" required />
                </div>
                <div className="mb-4">
                    <label for="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" name="message" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" rows="6" required></textarea>
                </div>
                <div className="mb-4">
                    <label for="attachments" className="block text-gray-700 font-semibold mb-2">Attachments</label>
                    <input type="file" id="attachments" name="attachments[]" className="w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"/>
                    <p className="text-gray-500 text-sm mt-2">Attach files (optional)</p>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600">Send Email</button>
                </div>
            </form>
        </div>
  )
}

export default GroupMailForm