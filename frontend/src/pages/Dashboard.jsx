import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'

const Dashboard = () => {
  const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search)
    const tabFromUrl=urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location])
  return (
    <div className='flex flex-col md:flex-row' style={{minHeight:"100vh"}}>
      <div className='md:w-66'>
        {/* sideBar */}
        <DashSideBar/>
      </div>
      {/* profile */}
      {tab==="profile"&&<DashProfile/>}
    </div>
  )
}

export default Dashboard