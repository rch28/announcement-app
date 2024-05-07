import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Not Found</h2>
    <p className="text-lg text-gray-600 mb-6">Could not find the requested resource</p>
    <Link href="/" className="text-blue-500 hover:underline">
      Return Home
    </Link>
  </div>
  )
}