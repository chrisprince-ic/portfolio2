import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Header = () => {
  return (
    <div className='scroll-mt-20 w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 relative'>
        <div>
            <Image src={assets.profile_img} alt="" className='rounded-full w-32 h-32 object-cover border-6 border-orange-400'/>
            
        </div>
        <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3'>
                Hi! I'am Christian Ikirezi 
                <Image src={assets.hand_icon} alt="" className='w-6' /> 
        </h3>
        <h1 className='text-3xl sm:text-6xl lg:text-5xl font-bold'>
            A Full Stack Developer based in Toronto.
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis non repudiandae dolores similique molestiae voluptas delectus illum obcaecati sapiente fuga voluptatibus nulla 
            ad officiis temporibus impedit, quas velit cum exercitationem.</p>

        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <a href="#contact" className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2'>Conatct Me 
                <Image src={assets.right_arrow_white} alt='' className='w-4'/>
            </a>
            <a href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'>My Resume
                <Image src={assets.download_icon} alt='' className='w-4'/>
            </a>
        </div>
        <AiFillInstagram className='absolute top-40 -left-[10%] animate-bounce w-15 h-15 text-pink-600 cursor-pointer' />
        <FaGithub  className='absolute top-50 -right-[15%] animate-bounce w-15 h-15 text-black ease-in-out cursor-pointer'/>
        <FaLinkedin  className='absolute top-150 right-[10%] animate-bounce w-15 h-15 text-blue-700 ease-in-out z-50 cursor-pointer'/>
    </div>
  )
}

export default Header