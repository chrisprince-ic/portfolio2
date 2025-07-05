import React from 'react'
import{assets, workData} from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  return (
    <div id="projects" className='w-full px-[12%] py-10 scroll-mt-20'>
        <Link href="/" className='w-50 px-10 py-3 border rounded-full border-gray-500 flex items-center justify-center gap-2'>Back to Home
                      
        </Link>
     <div className=' w-full max-w-5xl mx-auto'>
        <h1 className="text-6xl font-bold mt-10">Projects</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-10'>
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
        </div>
        
     </div>
     
    </div>
  )
}

export default page