import React from "react";

function PostMaterial({ Tagline, Body, Tags, ImageURL }) {
  console.log(ImageURL);
  return (
    <div className="gap-y-8 flex flex-col mb-10">
      <div className="gap-y-2 flex flex-col text-justify">
        <p>{Tagline}</p>
        <p>{Body}</p>
        <p>{Tags}</p>
      </div>
      <img
        src={ImageURL}
        alt="Profile"
        className="w-full h-auto rounded object-cover"
      />
    </div>
  );
}

export default PostMaterial;
