import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import Suggestions from "../components/Suggestions";
import TopContributorUser from "../components/TopContributorUser";
import TopContributer from "../components/TopContributer";
import { FaCalendarAlt, FaImage, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import HomePostButtons from "../components/HomePostButtons";
import HomePostInput from "../components/HomePostInput";
import PostMaterial from "../components/PostMaterial";
import Post from "../components/Post";
import { Carousel } from "flowbite-react";
import Loader from "../components/Loader";
import { login, clearErrors } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const SkillTags = ({ selectedSkills, onSkillSelect }) => {
  const skills = [
    "Python",
    "Java",
    "JavaScript",
    "C++",
    "HTML",
    "CSS",
    "Kotlin",
    "TypeScript",
    "CDS",
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {skills.map((skill) => (
        <button
          key={skill}
          onClick={() => onSkillSelect(skill)}
          className={`px-4 py-1 border rounded-full text-sm font-semibold ${
            selectedSkills.includes(skill)
              ? "bg-#6D77FF text-white"
              : "border-blue-500 text-black bg-#EEEFFD"
          }`}
          type="button"
        >
          {skill}
        </button>
      ))}
    </div>
  );
};

const PostQuestionForm = ({ onSubmit, showQuestion }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, skills });
  };
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the file
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mt-[30%] md:mt-[10%]">
      <div className="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-5 flex items-center">
          Post a Question
          <svg
            className="ml-2"
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
          >
            <path
              d="M15.2558 0.744141C12.2385 0.744141 9.28895 1.63888 6.78014 3.31521C4.27134 4.99154 2.31596 7.37417 1.16129 10.1618C0.00661011 12.9494 -0.295506 16.0169 0.293143 18.9762C0.881792 21.9356 2.33477 24.6539 4.46833 26.7874C6.60189 28.921 9.32022 30.374 12.2796 30.9626C15.2389 31.5513 18.3063 31.2492 21.094 30.0945C23.8816 28.9398 26.2642 26.9844 27.9406 24.4756C29.6169 21.9668 30.5116 19.0173 30.5116 16C30.5074 11.9552 28.8987 8.07728 26.0386 5.21718C23.1785 2.35709 19.3006 0.748412 15.2558 0.744141ZM15.2558 25.3881C14.9077 25.3881 14.5673 25.2849 14.2779 25.0915C13.9884 24.8981 13.7628 24.6231 13.6295 24.3015C13.4963 23.9798 13.4614 23.6259 13.5294 23.2844C13.5973 22.943 13.7649 22.6293 14.0111 22.3831C14.2573 22.137 14.5709 21.9693 14.9124 21.9014C15.2539 21.8335 15.6078 21.8683 15.9294 22.0016C16.2511 22.1348 16.526 22.3604 16.7194 22.6499C16.9129 22.9394 17.0161 23.2797 17.0161 23.6279C17.0161 24.0947 16.8306 24.5424 16.5005 24.8726C16.1704 25.2027 15.7227 25.3881 15.2558 25.3881ZM16.4293 18.2414V18.347C16.4293 18.6582 16.3057 18.9567 16.0856 19.1768C15.8655 19.3969 15.5671 19.5205 15.2558 19.5205C14.9446 19.5205 14.6461 19.3969 14.426 19.1768C14.2059 18.9567 14.0823 18.6582 14.0823 18.347V17.1735C14.0823 16.8622 14.2059 16.5637 14.426 16.3437C14.6461 16.1236 14.9446 16 15.2558 16C17.1965 16 18.7764 14.6797 18.7764 13.0661C18.7764 11.4525 17.1965 10.1323 15.2558 10.1323C13.3151 10.1323 11.7352 11.4525 11.7352 13.0661V13.6529C11.7352 13.9641 11.6116 14.2626 11.3915 14.4827C11.1714 14.7028 10.873 14.8264 10.5617 14.8264C10.2505 14.8264 9.95199 14.7028 9.73192 14.4827C9.51184 14.2626 9.3882 13.9641 9.3882 13.6529V13.0661C9.3882 10.1543 12.0198 7.78528 15.2558 7.78528C18.4918 7.78528 21.1234 10.1543 21.1234 13.0661C21.1234 15.6156 19.105 17.75 16.4293 18.2414Z"
              fill="#525CEB"
            />
          </svg>
        </h2>
        <button
          onClick={() => {
            showQuestion(false);
          }}
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="text-lg font-bold text-gray-700 block"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title of Question"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-lg font-bold text-gray-700 block"
          >
            Description
          </label>
          <textarea
            type="text"
            id="title"
            placeholder="Describe your question"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-lg font-bold mb-2">
            Related skills
          </label>
          <input
            type="text"
            id="skills"
            placeholder="Add related skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-3 border border-#CCCCCC rounded-lg mt-1 mb-2"
          />

          <SkillTags
            selectedSkills={selectedSkills}
            onSkillSelect={handleSkillSelect}
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="text-lg font-bold text-gray-700 block"
          >
            Image
          </label>
          <div className=" relative w-full  border border-#CCCCCC rounded-lg mt-1 mb-2 flex justify-center items-center h-36">
            {/* Styled file input container */}
            <input
              type="file"
              id="image"
              accept="image/*" // Accept only image files
              className="hidden" // Hide the default file input
              onChange={handleImageChange} // Handle file selection
            />
            {/* Custom file selection button */}

            {/* Image preview */}
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="h-full w-full object-cover"
              />
            ) : (
              <label
                htmlFor="image"
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <FaImage className="h-5 w-5" />
                <span className="text-gray-500">Upload Image</span>
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
        >
          <h2 className="font-bold text-white text-lg">Submit</h2>
        </button>
      </form>
    </div>
  );
};

const PostUserForm = ({ onSubmit, showUser }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the file
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mt-[30%] md:mt-[6%]">
      <div className="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-5 flex items-center">
          User Post
          <FaUser className="ml-3" />
        </h2>
        <button
          onClick={() => {
            showUser(false);
          }}
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="text-lg font-bold text-gray-700 block"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title of Question"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-lg font-bold text-gray-700 block"
          >
            Description
          </label>
          <textarea
            type="text"
            id="title"
            placeholder="Describe your question"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="text-lg font-bold text-gray-700 block"
          >
            Image
          </label>
          <div className=" relative w-full  border border-#CCCCCC rounded-lg mt-1 mb-2 flex justify-center items-center h-36">
            {/* Styled file input container */}
            <input
              type="file"
              id="image"
              accept="image/*" // Accept only image files
              className="hidden" // Hide the default file input
              onChange={handleImageChange} // Handle file selection
            />
            {/* Custom file selection button */}

            {/* Image preview */}
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="h-full w-full object-cover"
              />
            ) : (
              <label
                htmlFor="image"
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <FaImage className="h-5 w-5" />
                <span className="text-gray-500">Upload Image</span>
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
        >
          <h2 className="font-bold text-white text-lg">Submit</h2>
        </button>
      </form>
    </div>
  );
};
const PostJobForm = ({ onSubmit, showJob }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, skills });
  };
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader(); // FileReader to read the file
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mt-[30%] md:mt-[10%]">
      <div className="flex justify-between items-center">
        <h2 class="text-2xl font-bold mb-5 flex items-center">
          Post a Job
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            class="ml-2"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 9V7.5C9 5.01472 11.0147 3 13.5 3H16.5C18.9853 3 21 5.01472 21 7.5V9H24C25.6569 9 27 10.3431 27 12V17.3561C23.2645 18.7421 19.2223 19.4999 15 19.4999C10.7777 19.4999 6.73555 18.7421 3 17.3561V12C3 10.3431 4.34315 9 6 9H9ZM12 7.5C12 6.67157 12.6716 6 13.5 6H16.5C17.3284 6 18 6.67157 18 7.5V9H12V7.5ZM13.5 15C13.5 14.1716 14.1716 13.5 15 13.5H15.015C15.8434 13.5 16.515 14.1716 16.515 15C16.515 15.8284 15.8434 16.5 15.015 16.5H15C14.1716 16.5 13.5 15.8284 13.5 15Z"
              fill="#525CEB"
            />
            <path
              d="M3 20.5384V24C3 25.6569 4.34315 27 6 27H24C25.6569 27 27 25.6569 27 24V20.5384C23.2308 21.8107 19.1946 22.4999 15 22.4999C10.8054 22.4999 6.76919 21.8107 3 20.5384Z"
              fill="#525CEB"
            />
          </svg>
        </h2>
        <button
          onClick={() => {
            showJob(false);
          }}
        >
          <IoMdClose className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="text-lg font-bold text-gray-700 block"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title of Job"
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-lg font-bold text-gray-700 block"
          >
            Description
          </label>
          <textarea
            type="text"
            id="title"
            placeholder="Enter responsibilities, qualifications, and expectations for the role."
            required
            className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1 h-32"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ resize: "none" }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="skills" className="block text-lg font-bold mb-2">
            Related skills
          </label>
          <input
            type="text"
            id="skills"
            placeholder="Add related skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-3 border border-#CCCCCC rounded-lg mt-1 mb-2"
          />

          <SkillTags
            selectedSkills={selectedSkills}
            onSkillSelect={handleSkillSelect}
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="text-lg font-bold text-gray-700 block"
          >
            Image/Job Poster
          </label>
          <div className=" relative w-full  border border-#CCCCCC rounded-lg mt-1 mb-2 flex justify-center items-center h-36">
            {/* Styled file input container */}
            <input
              type="file"
              id="image"
              accept="image/*" // Accept only image files
              className="hidden" // Hide the default file input
              onChange={handleImageChange} // Handle file selection
            />
            {/* Custom file selection button */}

            {/* Image preview */}
            {image ? (
              <img
                src={image}
                alt="Selected"
                className="h-full w-full object-cover"
              />
            ) : (
              <label
                htmlFor="image"
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <FaImage className="h-5 w-5" />
                <span className="text-gray-500">Upload Image</span>
              </label>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
        >
          <h2 className="font-bold text-white text-lg">Submit</h2>
        </button>
      </form>
    </div>
  );
};

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);
  const [showPostQuestion, setShowPostQuestion] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState("userPosts");
  const [loading1, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // const userPosts = [
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/men/0.jpg",
  //     username: "Ayma Salis",
  //     userDec: "C++ Developer with 9 years of Experience",
  //     postTime: "1d",
  //     tagline: "Hey DevConnect community! 👋",
  //     body: "I'm thrilled to share a snippet of my C++ journey with all the amazing developers here. 🚀 Today, I delved into the intricacies of optimizing algorithms in C++, tackling a particularly challenging problem. 💡 The joy of crafting efficient and elegant code is what keeps me passionate about C++ development. Happy coding! 💻✨",
  //     tags: "#Cplusplus #DevConnect #CodingJourney #DeveloperCommunity",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/women/1.jpg",
  //     username: "Jane Doe",
  //     userDec: "Full Stack Developer and Tech Enthusiast",
  //     postTime: "2d",
  //     tagline: "Hello DevConnect! 🌟",
  //     body: "Just finished an intense coding session on my new full stack project. It's amazing to see how much you can achieve with dedication and passion. Can't wait to share more updates with you all! 🚀",
  //     tags: "#FullStack #WebDevelopment #CodingLife #DevConnect",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/men/2.jpg",
  //     username: "John Smith",
  //     userDec: "Data Scientist with a Love for Machine Learning",
  //     postTime: "3d",
  //     tagline: "Hey DevConnect! 🧠",
  //     body: "Exploring the depths of neural networks and their applications in real-world problems. The field of machine learning never ceases to amaze me. Let's innovate and create together! 💡",
  //     tags: "#MachineLearning #DataScience #AI #DevConnect",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/women/3.jpg",
  //     username: "Alice Johnson",
  //     userDec: "Frontend Developer and UI/UX Designer",
  //     postTime: "4d",
  //     tagline: "Hi DevConnect! 🎨",
  //     body: "Working on a new UI/UX design project that focuses on user accessibility. It's crucial to create inclusive designs that everyone can enjoy. Looking forward to your feedback! ✨",
  //     tags: "#Frontend #UIUX #Design #Accessibility #DevConnect",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  // ];

  // const jobPosts = [
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/men/5.jpg",
  //     username: "Robert King",
  //     userDec: "Recruiter at TechWorld",
  //     postTime: "1d",
  //     tagline: "Hiring Full Stack Developers! 🚀",
  //     body: "We are looking for talented full stack developers to join our team at TechWorld. If you have a passion for coding and want to work in a dynamic environment, apply now!",
  //     tags: "#JobOpening #FullStack #TechJobs #Hiring",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/women/6.jpg",
  //     username: "Sara Blake",
  //     userDec: "HR Manager at Innovatech",
  //     postTime: "2d",
  //     tagline: "Join Our Cybersecurity Team! 🔐",
  //     body: "Innovatech is expanding its cybersecurity team. We are in need of skilled professionals who can help secure our infrastructure. If you're interested, we'd love to hear from you!",
  //     tags: "#JobAlert #Cybersecurity #TechCareers #Hiring",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  // ];

  // const questionPosts = [
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/men/7.jpg",
  //     username: "Kevin Hart",
  //     userDec: "Junior Developer",
  //     postTime: "3d",
  //     tagline: "Need Help with React Hooks 🛠️",
  //     body: "I'm struggling to understand how React hooks work, particularly useEffect. Can someone explain it in simple terms or share some resources? Thanks in advance!",
  //     tags: "#React #JavaScript #WebDevelopment #Help",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  //   {
  //     userImageURL: "https://randomuser.me/api/portraits/women/8.jpg",
  //     username: "Linda Lee",
  //     userDec: "Data Analyst",
  //     postTime: "4d",
  //     tagline: "Best Practices for Data Cleaning? 📊",
  //     body: "I'm working on a project that requires extensive data cleaning. What are some best practices or tools that can make this process more efficient?",
  //     tags: "#DataScience #DataCleaning #Analytics #Help",
  //     imageURL:
  //       "https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg",
  //   },
  // ];

  const renderUserPosts = () => {
    // return posts.map((post) => {
    //   //const username = users[post.user_id] || "Unknown User";
    //   return (
    //     <Post
    //       key={post._id}
    //       //userImageURL={post.userImageURL}
    //       //username={username}
    //       //userDec={post.userDec}
    //       PostTime={post.timeStamp}
    //       //Tagline={post.tagline}
    //       Body={post.description}
    //       //Tags={post.tags}
    //       ImageURL={post.postImg}
    //     />
    //   );
    // });
  };

  return (
    <>
      <Header screen={"Home"} />
      {loading1 ? (
        <Loader />
      ) : (
        <div className="w-[100%] flex pt-5">
          {/* Left Column (70% width for TopContributer) */}
          <div className=" w-full md:w-2/3 lg:w-3/4 items-center flex-col flex">
            <div className="w-11/12 md:w-3/4 flex justify-evenly py-2">
              <button
                onClick={() => setSelectedPostType("userPosts")}
                className={`px-4 py-2 ${
                  selectedPostType === "userPosts"
                    ? " text-#525CEB font-bold"
                    : " text-black"
                } `}
              >
                User Posts
              </button>
              <button
                onClick={() => setSelectedPostType("jobPosts")}
                className={`px-4 py-2 ${
                  selectedPostType === "jobPosts"
                    ? " text-#525CEB font-bold"
                    : " text-black"
                } `}
              >
                Job Posts
              </button>
              <button
                onClick={() => setSelectedPostType("questionPosts")}
                className={`px-4 py-2 ${
                  selectedPostType === "questionPosts"
                    ? " text-#525CEB font-bold"
                    : " text-black"
                } `}
              >
                Question Posts
              </button>
            </div>
            {selectedPostType === "userPosts" && (
              <div className="w-11/12 md:w-3/4 h-60 md:h-72 bg-#525CEB  rounded-xl py-5">
                <Carousel>
                  <div className="flex h-full items-center justify-center bg-white">
                    <TopContributer />
                  </div>
                  <div className="flex h-full items-center justify-center bg-white">
                    <TopContributer />
                  </div>
                  <div className="flex h-full items-center justify-center bg-white">
                    <TopContributer />
                  </div>
                </Carousel>
              </div>
            )}
            {selectedPostType === "userPosts" && (
              <HomePostInput showUser={setShowUserForm} />
            )}
            {selectedPostType !== "userPosts" && (
              <>
                <div className="mt-2" />
                <HomePostButtons
                  showQuestion={setShowPostQuestion}
                  showJob={setShowJobForm}
                />
              </>
            )}
            <div className="border-b border-#CCCCCC w-11/12 md:w-3/4 py-2"></div>
            {selectedPostType === "userPosts" && renderUserPosts()}
            {/* {selectedPostType === "jobPosts" && renderPosts()}
            {selectedPostType === "questionPosts" && renderPosts()} */}
            <div className="mt-5" />
          </div>

          {/* Right Column (30% width for Suggestions) */}
          <div className="lg:w-1/4 md:w-1/3 md:pr-5 md:flex hidden">
            <Suggestions />
          </div>
          {showPostQuestion && (
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
              <PostQuestionForm
                onSubmit={(data) => {
                  console.log(data);
                }}
                showQuestion={setShowPostQuestion}
              />
            </div>
          )}

          {showJobForm && (
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
              <PostJobForm
                onSubmit={(data) => {
                  console.log(data);
                }}
                showJob={setShowJobForm}
              />
            </div>
          )}
          {showUserForm && (
            <div
              className="fixed inset-0 flex items-center justify-center overflow-y-auto"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent black background
                backdropFilter: "blur(8px)", // Apply 8px blur effect
                zIndex: 10, // Ensure the element is above other content
                maxHeight: "120vh",
                //paddingTop: "4rem", // Add top padding (adjust as needed)
                top: 0, // Ensure the overlay starts from the top
              }}
            >
              <PostUserForm
                onSubmit={(data) => {
                  console.log(data);
                }}
                showUser={setShowUserForm}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
