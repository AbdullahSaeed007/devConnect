import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Suggestions from "../components/Suggestions";
import ProfileBackground from "../profilebackground.jpg";
import ProfilePicture from "../profilepicture.png";
import Skill from "../components/Skill";
import { IoMdClose } from "react-icons/io";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import {
  updateProfile,
  clearErrors,
  loadUser,
  updateUser,
} from "../actions/userActions";
import { useAlert } from "react-alert";

// const SkillTags = ({ selectedSkills, onSkillSelect, userInterests }) => {
//   return (
//     <div className="flex flex-wrap gap-2 mt-2">
//       {userInterests.map((interest) => (
//         <button
//           key={interest}
//           onClick={() => onSkillSelect(interest)}
//           className={`px-4 py-1 border rounded-full text-sm font-semibold ${
//             selectedSkills.includes(interest)
//               ? "bg-#6D77FF text-white"
//               : "border-#6D77FF text-black bg-#EEEFFD"
//           }`}
//           type="button"
//         >
//           {interest}
//         </button>
//       ))}
//     </div>
//   );
// };

const LocationForm = ({ onSubmit, setShowLocationForm }) => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ country, city });
    if (country && city) {
      setShowLocationForm(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md md:w-full w-11/12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-5">Location</h2>
        <button
          onClick={() => {
            setShowLocationForm(false);
          }}
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="country"
            placeholder="Country"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            id="city"
            placeholder="City"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            id="zip"
            placeholder="Zipcode"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
        >
          <h2 className="font-bold text-white text-lg">Update</h2>
        </button>
      </form>
    </div>
  );
};
// const AddSkillForm = (onSubmit, setShowAddSkill) => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [suggestedSkills, setSuggestedSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState("");

//   // Effect to preload user skills into selectedSkills state
//   useEffect(() => {
//     if (user && user.userSkills && user.userSkills.length > 0) {
//       setSelectedSkills(user.userSkills);
//     }
//   }, [user]);

//   const fetchSkills = async (query) => {
//     if (query.length === 0) {
//       setSuggestedSkills([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://api.apilayer.com/skills?q=${query}`,
//         {
//           method: "GET",
//           headers: {
//             apikey: "qX3UA5iYMIcV9tjhax9Nwc0Xxp1zrJiZ",
//           },
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         if (Array.isArray(result)) {
//           setSuggestedSkills(result);
//         } else {
//           console.error("Unexpected response format:", result);
//         }
//       } else {
//         console.error(
//           "Failed to fetch skills:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching skills:", error);
//     }
//   };

//   const handleSkillSelect = (skill) => {
//     if (!selectedSkills.includes(skill)) {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//   };

//   const handleSkillRemove = (skillToRemove) => {
//     setSelectedSkills(
//       selectedSkills.filter((skill) => skill !== skillToRemove)
//     );
//   };
//   //dispatch in profile function, send data to below then dispatch
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   dispatch(updateUser(selectedSkills));
//   //   // Optionally, you can add further logic here, like showing a success message
//   //   if (setShowAddRelatedSkill) {
//   //     setShowAddRelatedSkill(false);
//   //   }
//   // };
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   onSubmit({ selectedSkills });
//   //   if (selectedSkills) {
//   //     abd0072(false);
//   //   }
//   // };
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     onSubmit({ selectedSkills });
//     if (selectedSkills !== "") {
//       setShowAddSkill(false);
//     }
//   };

//   return (
//     <div className="flex justify-center flex-grow items-center">
//       <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-bold mb-5">Update Your Skills</h2>
//           <button
//             onClick={() => {
//               setShowAddSkill(false);
//             }}
//           >
//             <IoMdClose className="h-5 w-5" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="mb-4">
//             <label
//               htmlFor="skills"
//               className="text-lg font-bold text-gray-700 block"
//             >
//               Skills
//             </label>
//             <input
//               type="text"
//               id="skills"
//               placeholder="Add related skills"
//               value={newSkill}
//               onChange={(e) => setNewSkill(e.target.value)}
//               className="w-full p-3 border text-gray-700 border-#CCCCCC rounded-lg mt-1"
//             />

//             <ul className="suggestions-list mt-2 bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
//               {suggestedSkills.map((skill, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSkillSelect(skill)}
//                   className="cursor-pointer p-2 hover:bg-gray-100"
//                 >
//                   {skill}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex flex-wrap mt-2">
//               {selectedSkills.map((skill, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
//                 >
//                   <span className="mr-2">{skill}</span>
//                   <button
//                     type="button"
//                     className="text-red-500"
//                     onClick={() => handleSkillRemove(skill)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm mt-4"
//           >
//             <h2 className="font-bold text-white text-lg">Update Skills</h2>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

//testing
const AddSkillForm = ({ onSubmit, setShowAddSkill }) => {
  const { user } = useSelector((state) => state.auth);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // Effect to preload user skills into selectedSkills state
  useEffect(() => {
    if (user && user.userSkills && user.userSkills.length > 0) {
      setSelectedSkills(user.userSkills);
    }
  }, [user]);

  const fetchSkills = async (query) => {
    if (query.length === 0) {
      setSuggestedSkills([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.apilayer.com/skills?q=${query}`,
        {
          method: "GET",
          headers: {
            apikey: "qX3UA5iYMIcV9tjhax9Nwc0Xxp1zrJiZ",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (Array.isArray(result)) {
          setSuggestedSkills(result);
        } else {
          console.error("Unexpected response format:", result);
        }
      } else {
        console.error(
          "Failed to fetch skills:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };
  useEffect(() => {
    fetchSkills(newSkill);
  }, [newSkill]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      skills: selectedSkills,
    });
    setShowAddSkill(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md md:w-full w-11/12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-5">Related Skills</h2>
        <button
          onClick={() => {
            setShowAddSkill(false);
          }}
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="skills"
            className="text-lg font-bold text-gray-700 block"
          >
            Skills
          </label>
          <input
            type="text"
            id="skills"
            placeholder="Add related skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-3 border text-gray-700 border-#CCCCCC rounded-lg mt-1"
          />

          <ul className="suggestions-list mt-2 bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
            {suggestedSkills.map((skill, index) => (
              <li
                key={index}
                onClick={() => handleSkillSelect(skill)}
                className="cursor-pointer p-2 hover:bg-gray-100"
              >
                {skill}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap mt-2">
            {selectedSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
              >
                <span className="mr-2">{skill}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleSkillRemove(skill)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm mt-4"
        >
          <h2 className="font-bold text-white text-lg">Update Skills</h2>
        </button>
      </form>
    </div>
  );
};
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setskills] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePicture);
  const [backgroundImage, setBackgroundImage] = useState(ProfileBackground);
  const [selectedPostType, setSelectedPostType] = useState("AllActivities");
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setskills(user.userSkills);
      setCountry(user.country);
      setState(user.state);
      setCity(user.city);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("user updated successfully");
      dispatch(loadUser());
      navigate("/profile");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, isUpdated]);

  const Posts = [
    {
      userImageURL: "https://randomuser.me/api/portraits/men/7.jpg",
      username: "Kevin Hart",
      userDec: "Junior Developer",
      postTime: "3d",
      tagline: "Need Help with React Hooks 🛠️",
      body: "I'm struggling to understand how React hooks work, particularly useEffect. Can someone explain it in simple terms or share some resources? Thanks in advance!",
      tags: "#React #JavaScript #WebDevelopment #Help",
      imageURL: "https://pixlr.com/images/pixlr-e-photo-editor.jpg",
    },
    {
      userImageURL: "https://randomuser.me/api/portraits/women/8.jpg",
      username: "Linda Lee",
      userDec: "Data Analyst",
      postTime: "4d",
      tagline: "Best Practices for Data Cleaning? 📊",
      body: "I'm working on a project that requires extensive data cleaning. What are some best practices or tools that can make this process more efficient?",
      tags: "#DataScience #DataCleaning #Analytics #Help",
      imageURL: "https://pixlr.com/images/pixlr-e-photo-editor.jpg",
    },
  ];
  const renderPosts = (posts) => {
    return posts.map((post) => (
      <Post
        key={post.username + post.postTime}
        userImageURL={post.userImageURL}
        username={post.username}
        userDec={post.userDec}
        PostTime={post.postTime}
        Tagline={post.tagline}
        Body={post.body}
        Tags={post.tags}
        ImageURL={post.imageURL}
      />
    ));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the file
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the file
      reader.onloadend = () => {
        setBackgroundImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };
  return (
    <>
      <Header screen={"Profile"} />
      <div className="flex h-screen">
        {/* Profile Background and Picture */}
        <div className="md:w-3/4 w-full p-2 md:ml-8  md:r-2 relative">
          {/* Profile Background */}
          <div className="relative">
            <img
              src={backgroundImage}
              alt="Profile Background"
              className="w-full h-64 rounded-t-md absolute top-0 left-0 hover:opacity-60 transition-opacity duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-64 bg-black flex items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300">
              <label>
                <input
                  type="file"
                  id="image"
                  accept="image/*" // Accept only image files
                  className="hidden" // Hide the default file input
                  onChange={handleBackgroundImageChange} // Handle file selection
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="28"
                  viewBox="0 0 32 28"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.94284 3.88571C1.79682 3.88571 0.0571289 5.62541 0.0571289 7.77143V23.3143C0.0571289 25.4603 1.79682 27.2 3.94284 27.2H27.2571C29.4032 27.2 31.1428 25.4603 31.1428 23.3143V7.77143C31.1428 5.62541 29.4032 3.88571 27.2571 3.88571H24.1762C23.6609 3.88571 23.1667 3.68102 22.8024 3.31667L20.6238 1.1381C19.8951 0.409387 18.9067 0 17.8762 0H13.3238C12.2932 0 11.3049 0.409385 10.5762 1.1381L8.39761 3.31666C8.03325 3.68102 7.53908 3.88571 7.0238 3.88571H3.94284ZM15.6 21.3714C18.819 21.3714 21.4286 18.7619 21.4286 15.5429C21.4286 12.3238 18.819 9.71429 15.6 9.71429C12.381 9.71429 9.77142 12.3238 9.77142 15.5429C9.77142 18.7619 12.381 21.3714 15.6 21.3714Z"
                    fill="#F9FAFD"
                  />
                </svg>
              </label>
            </div>
          </div>
          {/* Profile Picture */}
          <div className="relative">
            <img
              src={avatarPreview}
              alt={name}
              className="w-36 h-36 rounded-full absolute top-44 left-10 border-2 border-white hover:opacity-60 transition-opacity duration-300"
            />
            <div className="absolute top-44 left-10 w-36 h-36 flex items-center rounded-full justify-center bg-black opacity-0 hover:opacity-60 transition-opacity duration-300">
              <label>
                <input
                  type="file"
                  id="image"
                  accept="image/*" // Accept only image files
                  className="hidden" // Hide the default file input
                  onChange={handleProfileImageChange} // Handle file selection
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.7999 6.0001C3.47442 6.0001 2.3999 7.07461 2.3999 8.4001V18.0001C2.3999 19.3256 3.47442 20.4001 4.7999 20.4001H19.1999C20.5254 20.4001 21.5999 19.3256 21.5999 18.0001V8.4001C21.5999 7.07461 20.5254 6.0001 19.1999 6.0001H17.297C16.9787 6.0001 16.6735 5.87367 16.4484 5.64863L15.1028 4.30304C14.6528 3.85295 14.0423 3.6001 13.4058 3.6001H10.594C9.9575 3.6001 9.34705 3.85295 8.89696 4.30304L7.55137 5.64863C7.32633 5.87367 7.02111 6.0001 6.70285 6.0001H4.7999ZM11.9999 16.8001C13.9881 16.8001 15.5999 15.1883 15.5999 13.2001C15.5999 11.2119 13.9881 9.6001 11.9999 9.6001C10.0117 9.6001 8.3999 11.2119 8.3999 13.2001C8.3999 15.1883 10.0117 16.8001 11.9999 16.8001Z"
                    fill="#F9FAFD"
                  />
                </svg>
              </label>
            </div>
          </div>
          {/* Profile Information */}
          <div className="md:ml-10 mt-80">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-lg text-gray-600 mb-2">{email}</p>
            <p className="text-lg text-gray-600 mb-2">
              {Array.isArray(skills) ? skills.join(" | ") : skills}{" "}
              <span>
                <button
                  onClick={() => {
                    setShowAddSkill(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
                      fill="#525CEB"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
                      fill="#525CEB"
                    />
                  </svg>
                </button>
              </span>
            </p>
            <p className="text-black text-opacity-60 mb-2">
              {country}, {state}, {city}{" "}
              <span>
                <button
                  onClick={() => {
                    setShowLocationForm(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
                      fill="#525CEB"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
                      fill="#525CEB"
                    />
                  </svg>
                </button>
              </span>
            </p>
            <p className="text-#525CEB font-bold mb-4">
              519 followers. 476 connections
            </p>
            <div className="mb-4">
              {/* Skills */}

              {/* Job Recommendations */}
              <div className="bg-#EEEFFD rounded-md p-4 mt-10 mb-20 max-w-lg">
                <p className="text-black mb-3 font-bold">
                  Are you looking for jobs?{" "}
                  <span className="font-normal">
                    by clicking yes you allow us to show you job
                    recommendations.
                  </span>
                </p>
                <div className="flex justify-end">
                  <button className="bg-#525CEB text-white px-4 py-2 rounded-3xl mr-2">
                    Yes, I am open to work
                  </button>
                  <button className="px-4 py-2 rounded-3xl border-2 border-#525CEB text-#525CEB">
                    No
                  </button>
                </div>
              </div>

              <div className="w-11/12 md:w-3/4 flex justify-evenly py-2">
                <button
                  onClick={() => setSelectedPostType("AllActivities")}
                  className={`px-4 py-2 ${
                    selectedPostType === "AllActivities"
                      ? " text-#525CEB font-bold"
                      : " text-black"
                  } `}
                >
                  All Activity
                </button>
                <button
                  onClick={() => setSelectedPostType("SavedItems")}
                  className={`px-4 py-2 ${
                    selectedPostType === "SavedItems"
                      ? " text-#525CEB font-bold"
                      : " text-black"
                  } `}
                >
                  Saved Items
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold ml-3">Analytics</h1>
                <div className="flex justify-around py-5 max-w-lg">
                  <div className="flex items-center bg-white  rounded-lg shadow-sm w-2/5">
                    <div className="text-4xl mr-2">👥</div>
                    <div>
                      <h2 className="text-lg font-bold">6 profile views</h2>
                      <p className="text-gray-500 text-sm">
                        Discover who viewed your profile
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-white  rounded-lg shadow-sm w-2/5">
                    <div className="text-4xl mr-2">📊</div>
                    <div>
                      <h2 className="text-lg font-bold">
                        500 post Impressions
                      </h2>
                      <p className="text-gray-500 text-sm">
                        Start a post to increase engagement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedPostType === "AllActivities" && (
                <div>
                  <h1 className="text-2xl font-bold ml-3">All Activities</h1>
                  {renderPosts(Posts)}
                  <div className="pt-5" />
                </div>
              )}

              {selectedPostType === "SavedItems" && (
                <div>
                  <h1 className="text-2xl font-bold ml-3">Saved Items</h1>
                  {renderPosts(Posts)}
                  <div className="pt-5" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="w-1/4 hidden md:block mt-8 ml-2 justify-end">
          <Suggestions />
        </div>

        {showLocationForm && (
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
            <LocationForm
              setShowLocationForm={setShowLocationForm}
              onSubmit={(data) => {
                console.log(data);
              }}
            />
          </div>
        )}

        {showAddSkill && (
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
            <AddSkillForm
              setShowAddSkill={setShowAddSkill}
              onSubmit={(data) => {
                dispatch(updateProfile(data));
                console.log(data);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
