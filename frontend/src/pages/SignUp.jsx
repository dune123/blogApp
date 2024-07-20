import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react';
import axios from 'axios';

export default function SignUp(){
  const [formData,setFormData]=useState({})
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post("http://localhost:3000/api/auth/signup",
        formData
      )

      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <div className="mt" style={{marginTop:"5rem"}}>
      <div className='flex p-3 max-w-3xl justify-center flex-col md:flex-row md:items-center' style={{gap:"1.2rem"}}>
        {/* left side */}
        <div className='flex-1 ml-3'>
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white">Sameer's</span>
            Blog
          </Link>
          <p className='text-sm' style={{marginTop:"1.2rem"}}>
            This is a demo project. You can sign up with your email and password or with Google
          </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col' style={{gap:"1rem"}}>
            <div className=''>
              <Label value="Your username"/>
              <TextInput type="text" placeholder='Username' id="username" onChange={handleChange}/>
            </div>
            <div className=''>
              <Label value="Your email"/>
              <TextInput type="email" placeholder='name@company.com' id="email" onChange={handleChange}/>
            </div>
            <div className=''>
              <Label value="Your password"/>
              <TextInput type="password" placeholder='Password' id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" onClick={handleSubmit}>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm' style={{marginTop:"1.2rem"}}>
            <span>Have an account?</span>
            <Link to="/sign-in" className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

