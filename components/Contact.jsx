import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "340751ab-717d-4e80-b1db-1e23e9e4afbf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div id ="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-no-repeat bg-[length:90%_auto] bg-center"  style={{ backgroundImage: "url('/footer-bg-color.png')" }}>
        <h4 className='text-center mb-2 text-lg'>Connect with me</h4>
        <h2 className='text-center text-5xl'>Get in touch</h2>
        <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>Lorem ipsum dolor similique mollitia enim 
            repudiandae nulla voluptates, quas corporis voluptatem dolorum quaerat ex consequatur atque deleniti rem ullam?</p>

        <form onSubmit={onSubmit} className='w-full max-w-2xl mx-auto flex flex-col gap-6' autoComplete="off">
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <input type="text" placeholder='Enter you name' name='name' required
                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
                <input type="email" placeholder='Enter your email' name='email' required 
                className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500'
                />
            
            </div>
            <textarea rows='6' placeholder='Enter your message' name='message' required 
            className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none'
            ></textarea>
            <button className="py-3 px-8 w-max flex items-center justify-between rounded-full
            gap-2 text-white bg-black hover:bg-gray-700 transition-colors duration-300 mx-auto
            " type='submit'>Submit now <Image src={assets.right_arrow_white} className='w-4'alt="" /></button>
            <p className='mt-4'>{result}</p>
        </form>
    </div>
  )
}

export default Contact