import React from "react";

const ProfileCard = ({ imageUrl, name, sentence }) => {
  return (
    <div className="lg:w-11/12">
      <div className="flex items-center rounded-lg py-4 space-x-4 w-full ">
        {/* Picture */}
        <img
          src={imageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* Name and Sentence */}
        <div className="flex-1">
          <div className="font-bold text-lg">{name}</div>
          <div className="text-sm text-gray-600">{sentence}</div>
        </div>

        {/* Add Button */}
        <button className=" hover:bg-blue-600 hover:text-white text-#6D77FF font-bold py-2 rounded">
          +Add
        </button>
      </div>
      <div className="border-b border-#CCCCCC" />
    </div>
  );
};

export default ProfileCard;
