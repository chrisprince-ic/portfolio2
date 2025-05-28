import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Services = () => {
  return (
    <div id="services"className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg'>My skills</h4>
        <h2 className='text-center text-5xl'>My Specialities</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>Lorem ipsum dolor similique mollitia enim 
            repudiandae nulla voluptates, quas corporis voluptatem dolorum quaerat ex consequatur atque deleniti rem ullam?</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10" '> 
            {serviceData.map(({icon, title, description, link}, index) => (
                <div key={index} className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-[4px_4px_0_black] hover:bg-purple-100 hover:-translate-y-1 duration-500' >
                    <Image src={icon} alt={title} className='w-10' />
                    <h3 className='text-lg my-4 font-semibold text-gray-700'>{title}</h3>
                    <p className='text-gray-600 text-sm leading-5'>{description}</p>
                    <a href={link} className='flex item-center justify-center gap-2 text-sm mt-5 bg-blue-200 p-2 rounded-full'>Read more
                        <Image src={assets.right_arrow_bold} className='w-4 h-2 ' alt=""/>
                    </a>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Services