import React from 'react'

const AboutPage = () => {
  return (
    <div className = "w-full flex justify-center">
        <div className = "w-full max-w-[400px] shadow-2xl p-6 flex flex-col gap-5 rounded-md">
            <h1 className="text-3xl font-semibold">About Page</h1>

            <p className="sm:text-lg leading-relaxed">
                This project is a mock e-commerce project that I built. 
                It gave me the opportunity to plan and build a build a big project from end to end.
            </p>
        </div>    
    </div>
  )
}

export default AboutPage
