import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-20 px-[12%] bg-amber-100'>
<div className="flex w-full flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-10 py-6 ">

  <div>
    <h1 className="text-3xl font-bold flex items-center">
      Christian <span className="text-orange-500 ml-1">.</span>
    </h1>
  </div>
  <div className="flex items-center gap-2">
    <Image src={assets.mail_icon} alt="Mail Icon" className="w-6" />
    <p className="text-base">christianikirezi@gmail.com</p>
  </div>
</div>


       <div className='flex flex-col items-center justify-center gap-4 mt-5 mx-auto'>
        <p> © 2025 Christian Ikirezi. All rights reserved</p>
         <ul className={`text-center md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 mb-5 
      `}>
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About me</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">My work</a></li>
            <li><a href="#contact">Contact me</a></li>
        </ul>
       </div>
    </div>
  )
}

export default Footer
