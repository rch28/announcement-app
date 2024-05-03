import React from 'react'

const Wrapper = ({title,children}) => {
  return (
    <section className="bg-gray-200 py-16">
         
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            {title}
          </h2>
        {children}
        </div>
      
    </section>
  )
}

export default Wrapper