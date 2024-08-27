import React from "react";
import TopContributorUser from "./TopContributorUser";

function TopContributer() {
  return (
    <div className="bg-#525CEB w-full h-full ">
      <span className="text-white font-bold text-xl md:text-2xl mx-5">
        {" "}
        Top Contributer{" "}
      </span>
      <div className="flex gap-x-1 lg:gap-x-5 mx-2 lg:mx-20 md:my-5 my-1">
        <TopContributorUser
          imageURL={"https://randomuser.me/api/portraits/men/0.jpg"}
          name={"David Tervos"}
          specialty={"c++"}
        />
        <TopContributorUser
          imageURL={"https://randomuser.me/api/portraits/men/1.jpg"}
          name={"Anna Jhon"}
          specialty={"Java"}
        />
        <TopContributorUser
          imageURL={"https://randomuser.me/api/portraits/men/2.jpg"}
          name={"Adam wolf"}
          specialty={"JavaScript"}
        />
        <TopContributorUser
          imageURL={"https://randomuser.me/api/portraits/men/3.jpg"}
          name={"Ayma salis"}
          specialty={"Math"}
        />
      </div>
    </div>
  );
}

export default TopContributer;
