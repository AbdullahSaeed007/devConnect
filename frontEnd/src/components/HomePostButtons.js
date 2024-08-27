import React from "react";

function HomePostButtons({ showQuestion, showJob }) {
  return (
    <div className="flex items-start w-11/12 md:w-3/4">
      <button
        className=" hover:bg-blue-600 hover:text-white text-#6D77FF font-bold py-2 px-4 rounded"
        onClick={() => {
          showQuestion(true);
        }}
      >
        +Post a Question
      </button>
      <button
        className=" hover:bg-blue-600 hover:text-white text-#6D77FF font-bold py-2 px-4 rounded"
        onClick={() => {
          showJob(true);
        }}
      >
        +Post a Job
      </button>
    </div>
  );
}

export default HomePostButtons;
