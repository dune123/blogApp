import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { HiArrowNarrowUp, HiOutlineUserGroup,HiAnnotation,HiDocumentText } from 'react-icons/hi'
import { BsFileEarmarkPost } from "react-icons/bs";
import { useSelector } from 'react-redux'
import './DashboardComponent.css'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { Table } from 'flowbite-react'

const DashboardComponent = () => {
  const [users,setUsers]=useState([])
  const [comments,setComments]=useState([])
  const [posts,setPosts]=useState([])
  const [totalUsers,setTotalUsers]=useState(0)
  const [totalPosts,setTotalPosts]=useState(0);
  const [totalComments,setTotalComments]=useState(0)
  const [lastMonthUsers,setLastMonthUsers]=useState(0)
  const [lastMonthPosts,setLastMonthPosts]=useState(0)
  const [lastMonthComments,setLastMonthComments]=useState(0)
  const {currentUser}=useSelector((state)=>state.user)

  const token=localStorage.getItem('token')


  useEffect(()=>{
    const fetchUsers=async()=>{
      try {
        const res=await axios.get('http://localhost:3000/api/user/getusers?limit=5',{
          headers: {
            Authorization: `Bearer ${token}`,
        }
        })

        if(res.status===200){
          setUsers(res.data.users)
          setTotalUsers(res.data.totalUsers)
          setLastMonthUsers(res.data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchPost=async()=>{
      try {
        const res=await axios.get('http://localhost:3000/api/post/getPosts?limit=5',
          {
            headers: {
              Authorization: `Bearer ${token}`,
          }
          }
        )

        if(res.status===200){
          setPosts(res.data.posts)
          setTotalPosts(res.data.totalPosts)
          setLastMonthPosts(res.data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchComments=async()=>{
      try {
        const res=await axios.get('http://localhost:3000/api/comment/getComments?limit=5',{
          headers: {
            Authorization: `Bearer ${token}`,
        }
        })

        if(res.status===200){
          setComments(res.data.comments)
          setTotalComments(res.data.totalComments)
          setLastMonthComments(res.data.lastMonthComments)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if(currentUser.isAdmin){
      fetchUsers()
      fetchPost()
      fetchComments()
    }

  },[currentUser])
  
  return (
    <div className='p-3 md:mx-auto' style={{padding:"0.75rem"}}>
        <div className='itemContainer'>
        <div className="flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md" style={{gap:"1rem"}}>
        <div className="flex justify-between" style={{gap:"5rem"}}>
          <div className="">
            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
            <p className='text-2xl'>{totalUsers}</p>
          </div>
          <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' style={{backgroundColor:"#00897B"}}/>
        </div>
        <div className="flex gap-2 text-sm">
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp/>
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md" style={{gap:"1rem"}}>
        <div className="flex justify-between" style={{display:"flex",width:"19vw",justifyContent:"space-between"}}>
          <div className="">
            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
            <p className='text-2xl'>{totalComments}</p>
          </div>
          <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
        </div>
        <div className="flex gap-2 text-sm">
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp/>
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
      </div>
      <div className="flex flex-col p-3 dark:bg-slate-800 md:w-72 w-full rounded-md shadow-md" style={{gap:"1rem"}}>
        <div className="flex justify-between" style={{gap:"5rem",width:"19vw"}}>
          <div className="">
            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
            <p className='text-2xl'>{totalPosts}</p>
          </div>
          <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' style={{backgroundColor:"#84cc16"}}/>
        </div>
        <div className="flex gap-2 text-sm">
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp/>
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
      </div>
        </div>
        <div className='DetailCont'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md' style={{width:"63.5vw",marginLeft:"11vw"}}>
            <div className='flex justify-between p-3 text-sm font-semibold dark:bg-gray-800'>
              <h1 className='text-center p-2'>Recent Users</h1>
              <Button className='gradient-button' outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=users"}>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              {
                users && users.map((user)=>(
                  <Table.Body key={user._id} className='divide-y'>
                     <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' style={{width:"62vw"}}>
                      <Table.Cell>
                        <img src={user.profilePicture||'./user.png'}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'/>
                      </Table.Cell>
                      <Table.Cell>
                        {user.username}
                      </Table.Cell>
                     </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </div>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md' style={{width:"63.5vw",marginLeft:"11vw"}}>
            <div className='flex justify-between p-3 text-sm font-semibold dark:bg-gray-800'>
              <h1 className='text-center p-2'>Recent Comments</h1>
              <Button className='gradient-button' outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=comments"}>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Comment Content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {
                comments && comments.map((comment)=>(
                  <Table.Body key={comment._id} className='divide-y'>
                     <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' style={{width:"62vw"}}>
                      <Table.Cell className='w-96'>
                       <p className='line-clamp-2'>{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {comment.numberOfLikes}
                      </Table.Cell>
                     </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </div>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md' style={{width:"63.5vw",marginLeft:"11vw"}}>
            <div className='flex justify-between p-3 text-sm font-semibold dark:bg-gray-800'>
              <h1 className='text-center p-2'>Recent posts</h1>
              <Button className='gradient-button' outline gradientDuoTone='purpleToPink'>
                <Link to={"/dashboard?tab=users"}>
                  See all
                </Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {
                posts && posts.map((post)=>(
                  <Table.Body key={post._id} className='divide-y'>
                     <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800' style={{width:"62vw"}}>
                      <Table.Cell>
                        <img src={post.image||'./user.png'}
                        alt='user'
                        className='w-10 h-10 rounded-md bg-gray-500'/>
                      </Table.Cell>
                      <Table.Cell className='w-96'>
                        {post.title}
                      </Table.Cell>
                      <Table.Cell className='w-5'>
                        {post.category}
                      </Table.Cell>
                     </Table.Row>
                  </Table.Body>
                ))
              }
            </Table>
          </div>
        </div>
    </div>
  )
}

export default DashboardComponent