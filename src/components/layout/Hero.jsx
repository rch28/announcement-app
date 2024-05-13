import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-blue-100 py-16">
    <div className="container mx-auto text-center">
        <h2 className="text-3xl text-gray-800 font-bold mb-4">Welcome to Annoucemate</h2>
        <p className="text-lg text-gray-600 mb-8">Your all-in-one solution for team collaboration and communication.</p>
        <Link href="/groups" className="bg-purple-700 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-900">Get Started</Link>
    </div>
</section>
  )
}

export default Hero