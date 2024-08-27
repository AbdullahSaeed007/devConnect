import React from "react";

const TopContributorUser = ({ imageURL, name, specialty }) => {
  return (
    <div className=" flex items-center justify-center flex-col bg-gradient-to-b from-#7177D3 to-#7177D300 w-1/4 rounded-xl py-2">
      {/* Image */}
      <img
        src={imageURL}
        alt="Profile"
        className="md:w-24 md:h-24 h-16 w-16 rounded-full object-cover"
      />

      {/* Name */}
      <div className="mt-4 text-base md:text-lg font-bold text-white text-center">
        {name}
      </div>
      <div className="text-base text-white text-center">{specialty}</div>
    </div>
  );
};

export default TopContributorUser;
