import React from "react";

function Skill({ skill }) {
  return (
    <>
      <span className="bg-#F2F2F2 text-black px-2 py-1 mr-2 rounded-2xl">
        {skill}
      </span>
    </>
  );
}

export default Skill;
