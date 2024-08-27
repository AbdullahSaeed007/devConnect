import React from "react";
import { FaCalendarAlt, FaImage } from "react-icons/fa";

function HomePostInput({ showUser }) {
  return (
    <div className="border border-#CCCCCC rounded-xl w-11/12 md:w-3/4 h-14 my-3 flex items-center justify-between px-3">
      {/* Start a Post Text */}
      <div
        className="z-10 rounded-xl w-3/4 h-[90%] bg-transparent outline-none px-3 -z-10 flex items-center"
        onClick={() => showUser(true)}
      >
        <p className="text-#B0B0B0">Start a Post</p>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-3">
        {/* Calendar Icon */}
        <FaCalendarAlt className="text-gray-500 cursor-pointer" />

        {/* Image Icon */}
        <FaImage className="text-gray-500 cursor-pointer" />
      </div>

      {/* Input Field (Hidden for now) */}
    </div>
  );
}

export default HomePostInput;
