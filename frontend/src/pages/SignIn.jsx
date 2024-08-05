import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData,setFormData]=useState({})
  const {loading,error:errorMessage}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.email||!formData.password){
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try {
      dispatch(signInStart());
      const res=await axios.post("http://localhost:3000/api/auth/signIn",
        formData
      )

      if(res.status!==201){
        dispatch(signInFailure(res.data.message))
      }
      else{
        dispatch(signInSuccess(res.data.rest))
        window.localStorage.setItem('token',res.data.token)
        navigate("/")
      }
      
    } catch (error) {
      //this is client side error 
      dispatch((signInFailure(error.response.data.message)))
    }
  }

  return (
    <div className='mb-5' style={{marginTop:"5rem"}}>
      <div className='flex p-3 max-w-3xl justify-center flex-col md:flex-row md:items-center' style={{gap:"1.2rem"}}>
        {/* left side */}
        <div className='flex-1 ml-3'>
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white">Sameer's</span>
            Blog
          </Link>
          <p className='text-sm' style={{marginTop:"1.2rem"}}>
            This is a demo project. You can signin with your email and password or with Google
          </p>
        </div>
        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col' style={{gap:"1rem"}}>
            <div className=''>
              <Label value="Your email"/>
              <TextInput type="email" placeholder='name@company.com' id="email" onChange={handleChange}/>
            </div>
            <div className=''>
              <Label value="Your password"/>
              <TextInput type="password" placeholder='*********' id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type="submit" onClick={handleSubmit} disabled={loading}>
              {
                loading?(
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ):(
                  "Sign In"
                )
              }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm' style={{marginTop:"1.2rem"}}>
            <span>Don't Have an account?</span>
            <Link to="/sign-up" className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage&&(
              <Alert style={{marginTop:"1.2rem"}} color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn