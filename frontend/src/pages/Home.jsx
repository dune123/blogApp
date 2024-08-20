import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CallToAction from './CallToAction'
import './Home.css'
import axios from 'axios'
import PostCard from '../components/PostCard'

const Home = () => {
  const [posts,setPosts]=useState([])

  useEffect(()=>{
    const fetchPosts=async()=>{
      const res=await axios.get('http://localhost:3000/api/post/getPosts')
      if(res.status===200){
        setPosts(res.data.posts)
      }
    }

    fetchPosts()
  },[])

  console.log(posts)
  return (
    <div>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl' style={{padding:"7rem"}}>
          <h1 className='text-6xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
          <p className='text-gray-500 text-xs sm:text-sm'>Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.</p>
        </div>
        <div className='p-3 bg-amber-100 dark:bg-slate-700' style={{backgroundColor:"#FFECB9"}}>
          <CallToAction/>
        </div>
        <div className='max-w-6xl mx-auto p-3 flex gap-8 py-7' >
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post}/>
              ))}
            </div>
            <Link to="/search" className='text-xs sm:text-sm text-teal-500 font-bold hover:underline' style={{color:"#22B8BA"}}>View all posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home