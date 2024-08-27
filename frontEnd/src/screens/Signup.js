import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, Fragment } from "react";
import logo from "../Logo.png";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useAlert } from "react-alert";
import axios from "axios";
import {
  register,
  updateUser,
  clearErrors,
  logout,
  emailVerification,
} from "../actions/userActions";

const CreateAccountForm = ({ onSubmit }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    // Call the onSubmit prop with the form data
    const result = await onSubmit(formData);
    // Check the result of onSubmit for errors before proceeding
    // if (!result.success) {
    //   alert.error(result.message);
    // }
    // Check the result of onSubmit for errors before proceeding
    // if (result && !result.success) {
    //   alert.error(result.message);
    // }
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="flex justify-center flex-grow items-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12">
              <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
                Create Account
              </h2>
              <p className="text-gray-500 mb-5">
                Sign up as a student to access exclusive resources, engage with
                educational content, and connect with a vibrant learning
                community.
              </p>
              <form
                onSubmit={submitHandler}
                encType="multipart/form-data"
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="text-lg font-bold text-gray-700 block"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    placeholder="Name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                    name="name"
                    value={name}
                    onChange={onChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-lg font-bold text-gray-700 block"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="xyz@gmail.com"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                    name="email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-lg font-bold text-gray-700 block"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="************"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg mt-1"
                    name="password"
                    value={password}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="avatar_upload"
                    className="text-lg font-bold text-gray-700 block"
                  >
                    Avatar
                  </label>
                  <div className="d-flex align-items-center">
                    <div>
                      <figure className="avatar mr-3 item-rtl">
                        <img
                          src={avatarPreview}
                          className="rounded-circle"
                          alt="Avatar preview"
                        />
                      </figure>
                    </div>
                    <div className="custom-file">
                      <input
                        type="file"
                        name="avatar"
                        className="custom-file-input"
                        id="customFile"
                        accept="images/*"
                        onChange={onChange}
                      />
                      <label className="custom-file-label" htmlFor="customFile">
                        Choose Avatar
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  id="register_button"
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-md text-white text-sm"
                  disabled={loading ? true : false}
                >
                  <h2 className="font-bold text-white text-lg">Signup</h2>
                </button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
const RecentJobTitleForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title });
  };
  return (
    <div className="flex justify-center flex-grow items-center  ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12 ">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
          Recent Job Title
        </h2>
        <p className="text-#B0B0B0 mb-5">
          Please provide your personal details to enhance your experience. Your
          information is secure with us and will be used solely for personalized
          interactions. Thank you for sharing!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="text-lg font-bold text-gray-700 block"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Student, Ex CEO of company etc"
              required
              className="w-full p-3 border border-#CCCCCC rounded-lg mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
          >
            <h2 className="font-bold text-white text-lg">Next</h2>
          </button>
        </form>
      </div>
    </div>
  );
};
const LookingForJobForm = ({ onSubmit }) => {
  const [status, setStatus] = useState("no");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ status });
  };
  return (
    <div className="flex justify-center flex-grow items-center  ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12 ">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
          Are you looking for job
        </h2>
        <p className="text-#B0B0B0 mb-5">
          Please provide your personal details to enhance your experience. Your
          information is secure with us and will be used solely for personalized
          interactions. Thank you for sharing!
        </p>
        <div className="mb-4">
          <span className="text-lg font-bold text-gray-700">Status:</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="yes"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "yes"}
                className="form-radio"
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="role"
                value="no"
                onChange={(e) => setStatus(e.target.value)}
                checked={status === "no"}
                className="form-radio"
              />
              <span className="ml-2">No</span>
            </label>
          </div>
        </div>

        <button
          className="w-full py-3 px-4 rounded-full text-md font-semibold border border-#525CEB mt-5"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const VerifyStatusForm = ({ onSubmit }) => {
  const [role, setRole] = useState("Student");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ role });
  };
  return (
    <div className="flex justify-center flex-grow items-center  ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12 ">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
          Choose Your Role
        </h2>
        <p className="text-#B0B0B0 mb-5">
          Welcome to DevConnect! To better tailor your experience, we'd like to
          know if you're a student. Please select the option that best describes
          you:
        </p>
        <div className="mb-4">
          <span className="text-lg font-bold text-gray-700">Choose:</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="Student"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "Student"}
                className="form-radio"
              />
              <span className="ml-2">Student</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="role"
                value="Recruiter"
                onChange={(e) => setRole(e.target.value)}
                checked={role === "Recruiter"}
                className="form-radio"
              />
              <span className="ml-2">Not a Student</span>
            </label>
          </div>
        </div>
        <button
          className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-full text-white text-md font-semibold"
          onClick={(e) => handleSubmit(e)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const PersonalDetailsForm = ({ onSubmit }) => {
  const [degrees, setDegrees] = useState([]);
  const [degreeInput, setDegreeInput] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const fetchAuthToken = async () => {
    try {
      const response = await fetch(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        {
          headers: {
            Accept: "application/json",
            "api-token":
              "wPSV636_9r1eVA_3uWTphqBDNWWHziwBJIGgN9y5KaKM0BxpTfwJSPlFT9HsetxRSBQ",
            "user-email": "gmsiddiquie@gmail.com",
          },
        }
      );
      const data = await response.json();
      return data.auth_token;
    } catch (error) {
      console.error("Error fetching auth token:", error);
      return null;
    }
  };

  const fetchCountries = async () => {
    const authToken = await fetchAuthToken();
    if (!authToken) return;

    try {
      const response = await fetch(
        "https://www.universal-tutorial.com/api/countries",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setCountries(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    const authToken = await fetchAuthToken();
    if (!authToken) return;

    try {
      const response = await fetch(
        `https://www.universal-tutorial.com/api/states/${country}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error fetching states:", response.statusText);
        return;
      }
      const data = await response.json();
      setStates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (state) => {
    const authToken = await fetchAuthToken();
    if (!authToken) return;

    try {
      const response = await fetch(
        `https://www.universal-tutorial.com/api/cities/${state}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error fetching cities:", response.statusText);
        return;
      }
      const data = await response.json();
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDegreeInputChange = (e) => {
    setDegreeInput(e.target.value);
  };

  const handleDegreeSubmit = (e) => {
    e.preventDefault();
    if (degreeInput.trim() !== "") {
      setDegrees([...degrees, degreeInput]);
      setDegreeInput("");
    }
  };

  const handleDegreeRemove = (index) => {
    const updatedDegrees = [...degrees];
    updatedDegrees.splice(index, 1);
    setDegrees(updatedDegrees);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDateOfBirth = new Date(dateOfBirth);
    onSubmit({
      degrees,
      gender,
      dateOfBirth: formattedDateOfBirth,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStates([]);
    setCities([]);
    fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities([]);
    fetchCities(state);
  };

  return (
    <div className="flex justify-center flex-grow items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
          Personal Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="degrees"
              className="text-lg font-bold text-gray-700 block"
            >
              Degrees
            </label>
            <input
              type="text"
              id="degrees"
              className="w-full p-3 border text-#9ca3af border-#CCCCCC rounded-lg mt-1"
              value={degreeInput}
              onChange={handleDegreeInputChange}
              placeholder="Enter degrees (e.g., Bachelor of Science)"
            />
            <button
              type="button"
              onClick={handleDegreeSubmit}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
            >
              Add Degree
            </button>
            <div className="flex flex-wrap mt-2">
              {degrees.map((degree, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
                >
                  <span className="mr-2">{degree}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDegreeRemove(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <span className="text-lg font-bold text-gray-700">Gender</span>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "male"}
                  className="form-radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "female"}
                  className="form-radio"
                />
                <span className="ml-2">Female</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === "other"}
                  className="form-radio"
                />
                <span className="ml-2">Other</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="dob"
              className="text-lg font-bold text-gray-700 block"
            >
              DOB
            </label>
            <input
              type="date"
              id="dob"
              required
              className="w-full p-3 border text-#9ca3af border-#CCCCCC rounded-lg mt-1"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="text-lg font-bold text-gray-700 block"
            >
              Country
            </label>
            <select
              id="country"
              className="w-full p-3 border text-#9ca3af border-#CCCCCC rounded-lg mt-1"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {Array.isArray(countries) &&
                countries.map((country) => (
                  <option
                    key={country.country_name}
                    value={country.country_name}
                  >
                    {country.country_name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="state"
              className="text-lg font-bold text-gray-700 block"
            >
              State
            </label>
            <select
              id="state"
              className="w-full p-3 border text-#9ca3af border-#CCCCCC rounded-lg mt-1"
              value={selectedState}
              onChange={handleStateChange}
              disabled={!selectedCountry}
            >
              <option value="">Select State</option>
              {Array.isArray(states) &&
                states.map((state) => (
                  <option key={state.state_name} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="city"
              className="text-lg font-bold text-gray-700 block"
            >
              City
            </label>
            <select
              id="city"
              className="w-full p-3 border text-#9ca3af border-#CCCCCC rounded-lg mt-1"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select City</option>
              {Array.isArray(cities) &&
                cities.map((city) => (
                  <option key={city.city_name} value={city.city_name}>
                    {city.city_name}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
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

const SkillSelector = ({ onSubmit }) => {
  const [newSkill, setNewSkill] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [suggestedSkills, setSuggestedSkills] = useState([]);

  const [newInterestedSkill, setNewInterestedSkill] = useState("");
  const [selectedInterestedSkills, setSelectedInterestedSkills] = useState([]);
  const [suggestedInterestedSkills, setSuggestedInterestedSkills] = useState(
    []
  );

  const fetchSkills = async (query) => {
    if (query.length === 0) {
      setSuggestedSkills([]);
      setSuggestedInterestedSkills([]);
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
          // Determine which suggestion list to update based on current input
          if (query === newSkill) {
            setSuggestedSkills(result);
          } else if (query === newInterestedSkill) {
            setSuggestedInterestedSkills(result);
          }
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

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleInterestedSkillSelect = (skill) => {
    if (!selectedInterestedSkills.includes(skill)) {
      setSelectedInterestedSkills([...selectedInterestedSkills, skill]);
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleInterestedSkillRemove = (skillToRemove) => {
    setSelectedInterestedSkills(
      selectedInterestedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      skills: selectedSkills,
      userInterests: selectedInterestedSkills,
    });
  };

  useEffect(() => {
    fetchSkills(newSkill);
  }, [newSkill]);

  useEffect(() => {
    fetchSkills(newInterestedSkill);
  }, [newInterestedSkill]);

  return (
    <div className="flex justify-center flex-grow items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">
          Related Skills
        </h2>
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

          <div className="mb-4">
            <label
              htmlFor="interestedSkills"
              className="text-lg font-bold text-gray-700 block"
            >
              Interested Skills
            </label>
            <input
              type="text"
              id="interestedSkills"
              placeholder="Add interested skills"
              value={newInterestedSkill}
              onChange={(e) => setNewInterestedSkill(e.target.value)}
              className="w-full p-3 border text-gray-700 border-#CCCCCC rounded-lg mt-1"
            />

            <ul className="suggestions-list mt-2 bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
              {suggestedInterestedSkills.map((skill, index) => (
                <li
                  key={index}
                  onClick={() => handleInterestedSkillSelect(skill)}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap mt-2">
              {selectedInterestedSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 rounded-full px-3 py-1 m-1"
                >
                  <span className="mr-2">{skill}</span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleInterestedSkillRemove(skill)}
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
            <h2 className="font-bold text-white text-lg">Next</h2>
          </button>
        </form>
      </div>
    </div>
  );
};
const OTPForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ otp });
  };
  return (
    <div className="flex justify-center flex-grow items-center  ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl md:w-1/4 md:min-w-96 w-11/12 ">
        <h2 className="text-3xl font-bold mb-5 text-gray-800 text-left">OTP</h2>
        <p className="text-#B0B0B0 mb-5">
          To ensure the security of your account, we've sent a One-Time Password
          (OTP) to the email address you provided.{" "}
          <span className="text-black underline">
            Please check your inbox and enter the OTP below to verify your
            email.
          </span>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="text"
              className="text-lg font-bold text-gray-700 block"
            >
              One-Time Password
            </label>
            <input
              type="text"
              id="text"
              placeholder="Enter OTP"
              required
              className="w-full p-3 border  border-#CCCCCC rounded-lg mt-1"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-br from-#525CEB via-#6D77FF to-#6B74F5EB rounded-md text-white text-sm"
          >
            <h2 className="font-bold text-white text-lg">Verify</h2>
          </button>
        </form>
      </div>
    </div>
  );
};

function Signup() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/home");
  //   }
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, alert, isAuthenticated, error, navigate]);

  const handleCreateAccountSubmit = async (data) => {
    console.log("Create Account Form Data: ", data);
    const result = await dispatch(register(data));
    //const emailCheck = await dispatch(emailVerification(email));
    console.log(result);
    // Check if registration was successful before moving to the next step

    if (result.success) {
      setStep(2);
    } else {
      alert.error(result?.message || "An unexpected error occurred.");
      return {
        success: false,
      };
    }
  };

  const handlePersonalDetailSubmit = (data) => {
    console.log(data);
    console.log("Personal Detail Form Data: ", data);
    dispatch(updateUser(data));
    setStep(3);
  };

  const handleVerifyStatusSubmit = (data) => {
    console.log("Verify Status Form Data: ", data);
    dispatch(updateUser(data));
    setStep(4);
  };

  const handleRecentJobTitleSubmit = (data) => {
    console.log("Recent Job Title Form Data: ", data);
    dispatch(updateUser(data));
    setStep(5);
  };

  const handleLookingForJobSubmit = (data) => {
    console.log("Looking For Job Form Data: ", data);
    dispatch(updateUser(data));
    setStep(6);
  };

  const handleSkillsLocationSubmit = (data) => {
    console.log("Skills Location Form Data: ", data);
    dispatch(updateUser(data));
    dispatch(logout());
    alert.show("Thanks for registering. now you can sign in");
    navigate("/");

    // setStep(7);
  };

  const handleOTPSubmit = (data) => {
    console.log("OTP Form Data: ", data);
    // navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col  items-center  bg-radial-gradient">
      <div className="w-screen flex justify-center  ">
        <img
          src={logo}
          alt="Logo"
          className="w-auto md:h-20 h-14 md:pt-8 py-4  object-contain"
        />
      </div>
      {(() => {
        switch (step) {
          case 1:
            return <CreateAccountForm onSubmit={handleCreateAccountSubmit} />;
          case 2:
            return (
              <PersonalDetailsForm onSubmit={handlePersonalDetailSubmit} />
            );
          case 3:
            return <VerifyStatusForm onSubmit={handleVerifyStatusSubmit} />;
          case 4:
            return <RecentJobTitleForm onSubmit={handleRecentJobTitleSubmit} />;
          case 5:
            return <LookingForJobForm onSubmit={handleLookingForJobSubmit} />;
          case 6:
            return <SkillSelector onSubmit={handleSkillsLocationSubmit} />;
          case 7:
            return <OTPForm onSubmit={handleOTPSubmit} />;
          default:
            return <div>Unknown step</div>;
        }
      })()}
    </div>
  );
}
export default Signup;
