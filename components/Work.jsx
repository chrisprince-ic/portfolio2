import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Work = () => {
  return (
    <div id="work" className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg'>My Portfolio</h4>
        <h2 className='text-center text-5xl'>My Latest work</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>Lorem ipsum dolor similique mollitia enim 
            repudiandae nulla voluptates, quas corporis voluptatem dolorum quaerat ex consequatur atque deleniti rem ullam?</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10'>
            {workData.map((project, index)=>(
                <div key={index} style={{backgroundImage: `url(${project.bgImage})`}} 
                className=' aspect-square bg-no-repeat w-full h-[400px] bg-cover bg-center rounded-lg mb-8 relative group cursor-pointer'>
                    <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                      <div>
                        <h2 className='font-semibold'>{project.title}</h2>
                        <p className='text-sm text-gray-500'>{project.description}</p>
                      </div>
                      <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_black] group-hover:bg-orange-300 duration-500'>
                        <Image src={assets.send_icon} alt="send icon" className='w-6 ' />
                      </div> 
                    </div>
                
                </div>
            ))}
        
       
         <Link href="/Projects" className='w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto hover:bg-amber-100 duration-500'>
         
         Show more 
         <Image src={assets.right_arrow_bold} alt="right arrow" className='w-4'/>
        </Link>


        
            
        </div>

    </div>
  )
}

export default Work