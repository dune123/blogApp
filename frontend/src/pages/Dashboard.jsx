import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSideBar from '../components/DashSideBar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComponent from '../components/DashboardComponent'

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
      
      {/*posts */}
      {tab==='posts' && <DashPost/>}

      {/* users */}
      {tab==='users'&&<DashUsers/>}

      {/* comments */}
      {tab==='comments' &&<DashComments/>}

      {/*dashboard comp */}
      {tab==='dash' && <DashboardComponent/>}
    </div>
  )
}

export default Dashboard