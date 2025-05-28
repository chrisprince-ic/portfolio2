

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {

    const [isScroll, setIsScroll] = useState(false);
    const sideMenuRef = useRef();
    const openMenu = () => {
        sideMenuRef.current.style.display = 'block';
    }
    const closeMenu = () => {
        sideMenuRef.current.style.display= 'none';
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
               setIsScroll(true);
            }
            else{
                setIsScroll(false);

            }
        })

    },[])

  return (
    <>
    <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
        <Image src={assets.header_bg_color} className='w-full ' alt='background' />
    </div>
    <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? 'bg-white bg-opacity-50 backdrop-blur-3xl shadow-sm ' : ''}`}> 
        <a href="#top">
            <h1 className='text-[30px] font-bold flex'>Christian <p className='text-orange-500'>.</p></h1>
        </a>

        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 
    ${!isScroll ? 'bg-white bg-opacity-50 shadow-sm' : 'bg-transparent shadow-none border-none'}`}>
            <li><a href="#top">Home</a></li>
            <li><a href="#about">About me</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#work">My work</a></li>
            <li><a href="#contact">Contact me</a></li>
        </ul>

        <div className='flex items-center gap-4'>
            <button>
                <Image src={assets.moon_icon} className='w-6' alt='moon' />
            </button>
            <a href="#contact" className='hidden lg:flex items-center gap-3 py-2.5 px-10 border border-gray-500 rounded-full ml-4'>Contact <Image src={assets.arrow_icon} className='w-3' alt='img'/></a>
            <button  onClick={openMenu}className='block md:hidden ml-3 cursor-pointer'>
                <Image src={assets.menu_black} className='w-6' alt='menu' />
            </button>
        </div>

        {/*--------- Mobile Menu ---------*/}
        <div  ref={sideMenuRef} className='md:hidden absolute top-16 right-5 bg-white shadow-lg rounded-lg p-4 w-48 hidden'>
            <ul className='flex flex-col items-start gap-4'>
                <div className='relative w-full'>
                    <button onClick={closeMenu} className='absolute top-2 right-2'>
                        <Image src={assets.close_black} className='w-4 cursor-pointer' alt='close' />
                    </button>
                </div>
                <li><a href="#top" onClick={closeMenu}>Home</a></li>
                <li><a href="#about" onClick={closeMenu}>About me</a></li>
                <li><a href="#services"onClick={closeMenu}>Services</a></li>
                <li><a href="#work" onClick={closeMenu}>My work</a></li>
                <li><a href="#contact" onClick={closeMenu}>Contact me</a></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar