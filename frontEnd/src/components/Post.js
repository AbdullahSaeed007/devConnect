import React, { useRef, useState } from "react";
import PostMaterial from "./PostMaterial";
import chat from "../chat.png";
import like from "../thumbup.png";
import likefull from "../thumbupfull.png";
import {
  FaImage,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaShareAlt,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import HirePoster from "./HirePoster";
import People from "./People";
import { IoMdClose } from "react-icons/io";

function Comment({ user, text, time, image, replies, onReply }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(replyText);
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2 my-4">
      <div className="flex items-start space-x-2">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 bg-white p-2 rounded-lg shadow-sm w-3/4 md:w-full">
          <div className="text-sm font-bold">{user.name}</div>
          <div
            className="text-sm text-gray-600"
            style={{ wordWrap: "break-word" }}
          >
            {text}
          </div>
          {image && (
            <img
              src={image}
              alt="Comment Image"
              className="my-2 rounded-lg max-w-full h-auto"
            />
          )}{" "}
          {/* Display the image if available */}
          <div className="text-xs text-gray-400">{time}</div>
          <div className="flex space-x-4 mt-2">
            <button className="text-blue-500 text-sm font-semibold">
              Like
            </button>
            <button className="text-blue-500 text-sm font-semibold">
              DisLike
            </button>
            {onReply && (
              <button
                className="text-blue-500 text-sm font-semibold"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
      {showReplyForm && (
        <div className="flex mt-2 pl-12">
          <input
            placeholder="Add a reply..."
            className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            onClick={handleReply}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Reply
          </button>
        </div>
      )}
      <div className="pl-12">
        {replies &&
          replies.map((reply, index) => (
            <Comment
              key={index}
              user={reply.user}
              text={reply.text}
              time={reply.time}
              onReply={null}
            />
          ))}
      </div>
    </div>
  );
}
function Post({
  userImageURL,
  username,
  userDec,
  PostTime,
  Tagline,
  Body,
  Tags,
  ImageURL,
}) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newCommentImage, setNewCommentImage] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);
  const [share, setShare] = useState(false);
  const fileInputRef = useRef(null);

  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
  };
  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleDisLike = () => {
    setDisLiked(!disLiked);
  };

  const toggleShare = () => {
    setShare(!share);
  };

  const handleAddComment = () => {
    if (newComment.trim() || newCommentImage) {
      const comment = {
        user: {
          avatar: userImageURL,
          name: username,
        },
        text: newComment,
        image: newCommentImage, // Add the image URL to the comment object
        time: new Date().toLocaleString(),
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
      setNewCommentImage(null);
    }
  };

  const handleImageChange = (e) => {
    // Handle image selection
    const file = e.target.files[0];
    if (file) {
      setNewCommentImage(URL.createObjectURL(file));
    }
  };

  const handleReply = (text, commentIndex, replyIndex = null) => {
    const newComments = [...comments];
    const newReply = {
      user: {
        avatar: userImageURL,
        name: username,
      },
      text: text,
      time: new Date().toLocaleString(),
      replies: [],
    };
    if (replyIndex === null) {
      newComments[commentIndex].replies.push(newReply);
    } else {
      newComments[commentIndex].replies[replyIndex].replies.push(newReply);
    }

    setComments(newComments);
  };

  return (
    <div className="w-11/12 md:w-3/4">
      <div className="flex items-center rounded-lg p-4 space-x-4 ">
        {/* Picture */}
        <img
          src={userImageURL}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Name and Sentence */}
        <div className="flex-1">
          <div className="font-bold text-lg">{username}</div>
          <div className="text-sm text-justify">{userDec}</div>
          <div className="text-sm ">{PostTime}</div>
        </div>

        {/* Add Button */}
        <button className=" hover:bg-blue-600 hover:text-white text-#6D77FF font-bold py-2 px-4 rounded">
          +Add
        </button>
      </div>
      <PostMaterial
        Tagline={Tagline}
        Body={Body}
        Tags={Tags}
        ImageURL={ImageURL}
      />
      <div className="w-full flex justify-end gap-x-3">
        <button
          className="flex text-#525CEB font-semibold space-x-1 items-center"
          onClick={toggleLike}
        >
          {liked ? (
            <IconContext.Provider
              value={{
                color: "#525CEB",
                className: "justify-center h-full",
              }}
            >
              <FaThumbsUp />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                color: "#525CEB",
                className: "justify-center h-full",
              }}
            >
              <FaRegThumbsUp />
            </IconContext.Provider>
          )}
          <p>404 Likes</p>
        </button>
        <button
          className="flex text-#525CEB font-semibold space-x-1 items-center"
          onClick={toggleDisLike}
        >
          {disLiked ? (
            <IconContext.Provider
              value={{
                color: "#525CEB",
                className: "justify-center h-full",
              }}
            >
              <FaThumbsDown />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider
              value={{
                color: "#525CEB",
                className: "justify-center h-full",
              }}
            >
              <FaRegThumbsDown />
            </IconContext.Provider>
          )}
          <p>200 DisLikes</p>
        </button>

        <button
          className="flex text-#525CEB font-semibold space-x-1 items-center"
          onClick={toggleShare}
        >
          <FaShareAlt />
          <p> Share</p>
        </button>
        <button
          className="flex text-#525CEB font-semibold space-x-1 items-center"
          onClick={toggleComments}
        >
          <img src={chat} />
          <p>404 Comments</p>
        </button>
      </div>

      {commentsOpen && (
        <div className="mt-4 lg:p-4 py-4 px-2 bg-gray-100 rounded-lg">
          <div className="flex mt-2">
            <img
              src={userImageURL}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <input
              placeholder="Add a comment..."
              className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 w-1/2 md:w-auto"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <input
              type="file" // Input for image selection
              accept="image/*" // Allow only image files
              onChange={handleImageChange} // Call handleImageChange on file selection
              style={{ display: "none" }} // Hide the input element
              ref={fileInputRef} // Ref for accessing input element
            />
            <button
              onClick={() => fileInputRef.current.click()} // Click the hidden input on button click
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              <FaImage className="h-5 w-5" />
            </button>
            <button
              onClick={handleAddComment}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
          <div>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                user={comment.user}
                text={comment.text}
                image={comment.image}
                time={comment.time}
                replies={comment.replies}
                onReply={(text, replyIndex) =>
                  handleReply(text, index, replyIndex)
                }
              />
            ))}
          </div>
        </div>
      )}
      {share && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent black background
            backdropFilter: "blur(8px)", // Apply 8px blur effect
            zIndex: 10, // Ensure the element is above other content
            maxHeight: "120vh",
            paddingTop: "4rem", // Add top padding (adjust as needed)
            top: 0, // Ensure the overlay starts from the top
          }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md md:w-full w-11/12 h-96 overflow-y-auto">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-row justify-between w-full items-center">
                <h2 className="text-2xl font-bold">People</h2>
                <button onClick={toggleShare}>
                  <IoMdClose />
                </button>
              </div>
              <People
                imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
                name={"David Tervos"}
                exp={"  C++ Developer with 9 year of Experience"}
              />

              <People
                imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
                name={"David Tervos"}
                exp={"  C++ Developer with 9 year of Experience"}
              />

              <People
                imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
                name={"David Tervos"}
                exp={"  C++ Developer with 9 year of Experience"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
