import axios from 'axios'
import { Button, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PostPage.css'
import CallToAction from './CallToAction'
import CommentSection from '../components/CommentSection'

const PostPage = () => {
  const postSlug=useParams()
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(false)
  const [post,setPost]=useState(null)
  const [recentPosts,setRecentPosts] = useState(null)


  useEffect(()=>{
    const fetchPost=async()=>{
      try {
        setLoading(true);
        const res=await axios.get(`http://localhost:3000/api/post/getPosts?slug=${postSlug.postSlug}`)

        if(res.status!==200){
          setError(true);
          setLoading(false);
          return;
        }
        else{
          setPost(res.data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    }
    fetchPost();
  },[postSlug])

  if(loading){
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl'/>
      </div>
    )
  }
  console.log(post)
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post&&post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button className='gray' pill size='xs'>
          {post && post.category}
        </Button>
      </Link>
      <img src={post && post.image} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
      <div className='flex justify-between p-3 border-b w-full border-slate-500 mx-auto ' style={{maxWidth: "42rem"}}>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{post && (post.content.length/1000).toFixed(0)} mins read</span>
      </div>
      <div className='postContent' dangerouslySetInnerHTML={{__html:post && post.content}} >

      </div>
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction/>
      </div>
      <CommentSection postId={post._id}/>
    </main>
  )
}

export default PostPage