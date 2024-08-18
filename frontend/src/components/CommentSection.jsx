import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";
import { Textarea, Button, Alert,Modal } from "flowbite-react";
import axios from "axios";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal,setShowModal]=useState(false);
  const [commentError, setCommentError] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/comment/create",
        { content: comment, postId, userId: currentUser._id },
        {
          headers: {
            Authorization: `Beared ${token}`,
          },
        }
      );
      
      if (res.status === 200) {
        setComment("");
        setCommentError(null);
        setComments([res.data,...comments])
      } else {
        setCommentError(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/comment/getComments/${postId}`
        );
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLikes=async(commentId)=>{

    try {
        
        const res=await axios.put(`http://localhost:3000/api/comment/likecomment/${commentId}`,{},{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        
        if(res.status===200){
          const data=res.data;
          setComments(
            comments.map((comment) =>
              comment._id === commentId
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                  }
                : comment
            )
          )  
        }
    } catch (error) {
        console.log(error.message);
    }
  }
  
  const handleEdit = async (comment,editedComponent) => {
    setComments(
        comments.map((c)=>
          c._id===comment._id?{...comment,content:editedComponent}:c
        )
    )
  };

  const handleDelete=async(commentId)=>{
    setShowModal(false);
    try {
      if(!currentUser){
        navigate('/sign-in');
        return;
      }
      const res=await axios.delete(`http://localhost:3000/api/comment/deleteComment/${commentId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

      if(res.status==200){
        setComments(comments.filter((comment)=>comment._id!==commentId))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture || "/user.png"}
            alt=""
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
            style={{ color: "rgb(8 145 178)" }}
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div
          className="text-sm text-teal-500 my-5 flex gap-1"
          style={{ color: "#00bcd4" }}
        >
          You must be signed in to Comment
          <Link
            to={"/sign-in"}
            className="text-blue-500 hover:underline"
            style={{ color: "#2196F3" }}
          >
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "2rem", border: "1px solid #00bcd4" }}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs" style={{ color: "#71717A" }}>
              {200 - comment.length} charecters remaining
            </p>
            <Button outline gradientDueTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert
              color="failure"
              className="mt-5"
              style={{ marginTop: "1rem" }}
            >
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments && comments.length > 0 ? (
        <>
          <div
            className="text-sm my-5 flex items-center gap-1"
            style={{ marginTop: "1rem", gap: "0.25rem" }}
          >
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {
            comments.map((data, index) => (
            <Comment key={index} data={data} onLike={handleLikes} onEdit={handleEdit} onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}/>
          ))
          }
        </>
      ) : (
        <p className="text-sm" style={{ margin: "1rem" }}>
          No comments yet
        </p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
