import React from "react";

function HirePoster({ imageUrl, name, exp }) {
  return (
    <div className="shadow-xl border border-#CCCCCC rounded-xl py-2 items-center flex flex-col">
      {/* Image */}
      <img
        src={imageUrl}
        alt="Profile"
        className="w-24 h-24 my-2 rounded-full object-cover"
      />
      <div className="gap-y-3 items-center flex flex-col">
        <div className=" text-lg text-black text-center ">{name}</div>
        <div className=" text-base text-black text-center w-2/3 ">{exp}</div>
        <button className="border rounded-full py-2 text-center w-4/5">
          Message
        </button>
      </div>
    </div>
  );
}

export default HirePoster;
