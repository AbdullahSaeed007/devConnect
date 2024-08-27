import React, { useState, Fragment } from "react";
import { FaBars, FaBell, FaSearch, FaTimes } from "react-icons/fa";
import logo from "../Logo2.png";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../actions/userActions";

function Header({ screen }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    alert.success("logged out successfully.");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isChangeEmailFormOpen, setIsChangeEmailFormOpen] = useState(false);
  const [isChangePasswordFormOpen, setIsChangePasswordFormOpen] =
    useState(false);

  const navigation = [
    { title: "Home", path: "/home" },
    { title: "Hire&Learn", path: "/Hire&Learn" },
    { title: "Chat", path: "/chat" },
  ];
  const notifications = [
    { text: "[User Name] viewed your profile.", time: "2 months ago" },
    { text: "Your profile was viewed by [User Name].", time: "2 months ago" },
    {
      text: "Check out who viewed your profile recently.",
      time: "2 months ago",
    },
    {
      text: "New job alert: [Job Title] at [Company Name]. Apply now!",
      time: "2 months ago",
    },
    { text: "[User Name] liked your comment.", time: "2 months ago" },
    {
      text: "Congratulations! You've been nominated as a Top Contributor.",
      time: "2 months ago",
    },
  ];

  const handleEmailChangeSubmit = (event) => {
    event.preventDefault();
    // Handle email change logic here
    setIsChangeEmailFormOpen(false);
  };

  const handlePasswordChangeSubmit = (event) => {
    event.preventDefault();
    // Handle password change logic here
    setIsChangePasswordFormOpen(false);
  };

  return (
    <>
      {user ? (
        <Fragment>
          <div className="sticky top-0 bg-white z-50 shadow-md py-2">
            <div className="flex justify-between my-1 items-center">
              {/* Logo */}
              <div className="flex gap-x-3 ml-2 lg:ml-20">
                <Link
                  to={"/home"}
                  style={{
                    display: "flex",
                    justifySelf: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-12 sm:w-16 md:w-18 lg:w-24 h-auto object-contain max-w-fit"
                  />
                </Link>
                {/* Search Bar */}
                <div className="relative sm:mr-2">
                  <input
                    className="border border-#CCCCCC h-10 w-32 md:w-60 px-5 rounded-lg pr-10"
                    type="text"
                    placeholder="Search..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <FaSearch />
                  </div>
                </div>
              </div>
              {/* Navigation Links */}
              <div className="gap-x-10 items-center hidden md:flex">
                <nav className="flex gap-x-10 font-semibold">
                  {navigation.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className={`${
                        screen === item.title ? "text-#525CEB font-bold" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                {/* Bell Icon */}
                <IconContext.Provider
                  value={{
                    color: "#525CEB",
                    className: "justify-center h-full",
                  }}
                >
                  <div
                    className="icon relative"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  >
                    <FaBell />
                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
                        <div className="py-2 px-4">
                          <h4 className="font-semibold">Notifications</h4>
                          {notifications.map((notification, index) => (
                            <div key={index} className="py-1">
                              <p>{notification.text}</p>
                              <span className="text-gray-400 text-sm">
                                {notification.time}
                              </span>
                              <div className="border-b mt-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </IconContext.Provider>

                <div
                  className="flex lg:mr-10 items-center gap-x-3"
                  onClick={() => {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                    setIsChangeEmailFormOpen(false);
                    setIsChangePasswordFormOpen(false);
                  }}
                >
                  <img
                    src={user.avatar && user.avatar.url}
                    alt="user && user.name"
                    className="rounded-full w-10 border object-cover "
                  />
                  <span>{user && user.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_124_2044)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.5624 15.7069C13.3749 15.8943 13.1206 15.9996 12.8554 15.9996C12.5903 15.9996 12.336 15.8943 12.1484 15.7069L6.49145 10.0499C6.39594 9.95761 6.31975 9.84726 6.26734 9.72526C6.21494 9.60326 6.18735 9.47204 6.18619 9.33926C6.18504 9.20648 6.21034 9.0748 6.26062 8.9519C6.3109 8.829 6.38516 8.71735 6.47905 8.62346C6.57294 8.52957 6.6846 8.45531 6.80749 8.40503C6.93039 8.35475 7.06207 8.32945 7.19485 8.3306C7.32763 8.33176 7.45885 8.35934 7.58085 8.41175C7.70285 8.46416 7.8132 8.54034 7.90545 8.63585L12.8554 13.5859L17.8054 8.63585C17.994 8.4537 18.2466 8.3529 18.5088 8.35518C18.771 8.35746 19.0219 8.46263 19.2073 8.64804C19.3927 8.83344 19.4978 9.08426 19.5001 9.34645C19.5024 9.60865 19.4016 9.86125 19.2194 10.0499L13.5624 15.7069Z"
                        fill="#525CEB"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_124_2044">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.855469)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              {isProfileDropdownOpen && (
                <div className="absolute right-5 top-14 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <div className="py-2 px-4">
                    <Link to={"/profile"} className="block py-1">
                      View Profile
                    </Link>
                    <div
                      className="block py-1"
                      onClick={() => {
                        setIsChangeEmailFormOpen(!isChangeEmailFormOpen);
                        setIsChangePasswordFormOpen(false);
                      }}
                    >
                      Change Email
                    </div>
                    <div
                      className="block py-1"
                      onClick={() => {
                        setIsChangePasswordFormOpen(!isChangePasswordFormOpen);
                        setIsChangeEmailFormOpen(false);
                      }}
                    >
                      Change Password
                    </div>
                    <Link
                      onClick={logoutHandler}
                      to={"/"}
                      className="block py-1"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              )}
              {/* Email Change Form */}
              {isChangeEmailFormOpen && (
                <div className="absolute top-20 right-5 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
                  <div className="py-2 px-4">
                    <h4 className="font-semibold">Change Email</h4>
                    <form onSubmit={handleEmailChangeSubmit}>
                      <div className="mb-2">
                        <label className="block mb-1">New Email:</label>
                        <input
                          type="email"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsChangeEmailFormOpen(false)}
                          className="mr-2 px-3 py-1 rounded bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded bg-blue-500 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* Password Change Form */}
              {isChangePasswordFormOpen && (
                <div className="absolute top-20 right-5 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
                  <div className="py-2 px-4">
                    <h4 className="font-semibold">Change Password</h4>
                    <form onSubmit={handlePasswordChangeSubmit}>
                      <div className="mb-2">
                        <label className="block mb-1">Current Password:</label>
                        <input
                          type="password"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block mb-1">New Password:</label>
                        <input
                          type="password"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="block mb-1">
                          Confirm New Password:
                        </label>
                        <input
                          type="password"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setIsChangePasswordFormOpen(false)}
                          className="mr-2 px-3 py-1 rounded bg-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded bg-blue-500 text-white"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile Navigation */}
            <div className="flex md:hidden">
              <IconContext.Provider value={{ color: "#525CEB" }}>
                <div
                  className="ml-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
              </IconContext.Provider>
              {isMenuOpen && (
                <div className="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-10">
                  <nav className="flex flex-col py-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.title}
                        to={item.path}
                        className={`py-1 px-4 ${
                          screen === item.title ? "text-#525CEB font-bold" : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="sticky top-0 bg-white z-50 shadow-md py-2">
            <div className="flex justify-between my-1 items-center">
              {/* Logo */}
              <div className="flex gap-x-3 ml-2 lg:ml-20">
                <Link
                  to={"/"}
                  style={{
                    display: "flex",
                    justifySelf: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-12 sm:w-16 md:w-18 lg:w-24 h-auto object-contain max-w-fit"
                  />
                </Link>
                {/* Search Bar */}
                <div className="relative sm:mr-2">
                  <input
                    className="border border-#CCCCCC h-10 w-32 md:w-60 px-5 rounded-lg pr-10"
                    type="text"
                    placeholder="Search..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <FaSearch />
                  </div>
                </div>
              </div>
              {/* Navigation Links */}
              <div className="gap-x-10 items-center hidden md:flex">
                <nav className="flex gap-x-10 font-semibold">
                  {navigation.map((item) => (
                    <Link
                      key={item.title}
                      to={item.path}
                      className={`${
                        screen === item.title ? "text-#525CEB font-bold" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                {/* Bell Icon */}
                <IconContext.Provider
                  value={{
                    color: "#525CEB",
                    className: "justify-center h-full",
                  }}
                >
                  <div
                    className="icon relative"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  >
                    <FaBell />
                    {isNotificationOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
                        <div className="py-2 px-4">
                          <h4 className="font-semibold">Notifications</h4>
                          {notifications.map((notification, index) => (
                            <div key={index} className="py-1">
                              <p>{notification.text}</p>
                              <span className="text-gray-400 text-sm">
                                {notification.time}
                              </span>
                              <div className="border-b mt-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </IconContext.Provider>
              </div>
              {/* Mobile Navigation */}
              <div className="flex md:hidden">
                <IconContext.Provider value={{ color: "#525CEB" }}>
                  <div
                    className="ml-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                  </div>
                </IconContext.Provider>
                {isMenuOpen && (
                  <div className="absolute top-14 left-0 w-full bg-white border rounded-lg shadow-lg z-10">
                    <nav className="flex flex-col py-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.title}
                          to={item.path}
                          className={`py-1 px-4 ${
                            screen === item.title
                              ? "text-#525CEB font-bold"
                              : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
}

export default Header;
