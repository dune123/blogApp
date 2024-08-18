import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Textarea,Button} from "flowbite-react";
import "./Comment.css";

const Comment = ({ data, onLike ,onEdit,onDelete}) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComponent,setEditedContent]=useState(data.content)
  const token=localStorage.getItem("token");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/user/${data.userId}`
        );
        if (res.status === 200) {
          setUser(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [data]);

  const handleSave=async()=>{
    try {
        const res=await axios.put(`http://localhost:3000/api/comment/editComment/${data._id}`,editedComponent,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        if(res.status === 200) {
            setIsEditing(false);
            onEdit(data,editedComponent)

        }
    } catch (error) {
        console.log(error.message);
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(data.content);
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture || "/user.png"}
          alt={user?.username || "anonymous"}
        />
      </div>
      <div className="flex-1">
        <div
          className="flex items-center mb-1"
          style={{ marginBottom: "0.25rem" }}
        >
          <span className="font-bold mr-1 text-xm truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-xs" style={{ color: "rgb(107 114 128)" }}>
            {moment(data?.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
            <>
          <Textarea
            className="mb-2"
            style={{marginBottom:"0.5rem"}}
            value={editedComponent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex justify-end text-xs" style={{gap:"0.5rem"}}>
            <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
            >
                Save
            </Button>
            <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={()=>setIsEditing(false)}
            >
                Cancel
            </Button>
          </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 pb-2">{data?.content}</p>
            <div
              className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2"
              style={{ gap: "0.5rem", paddingTop: "0.5rem" }}
            >
              <button
                className="text-gray-400 hover:text-blue-500"
                onClick={() => onLike(data._id)}
                style={{
                  color: data.likes.includes(currentUser._id)
                    ? "#03c9d7"
                    : "gray",
                }}
              >
                <FaThumbsUp className="like" />
              </button>
              <p>
                {data.numberOfLikes > 0 &&
                  data.numberOfLikes +
                    " " +
                    (data.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === data.userId || currentUser.isAdmin) && (
                  <>
                  <button type="button" className="edit" onClick={handleEdit}>
                    Edit
                  </button>
                  <button type="button" onClick={()=>onDelete(data._id)} className="delete">
                    Delete
                  </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
