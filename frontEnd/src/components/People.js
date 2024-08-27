import React from "react";

const People = ({ imageUrl, name, exp }) => {
  return (
    <button className="shadow-xl border border-#CCCCCC rounded-xl py-2 items-center flex flex-col my-3">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Profile"
        className="w-24 h-24 my-2 rounded-full object-cover"
      />
      <div className="gap-y-3 items-center flex flex-col">
        <div className=" text-lg text-black text-center ">{name}</div>
        <div className=" text-base text-black text-center w-2/3 ">{exp}</div>
      </div>
    </button>
  );
};
export default People;
