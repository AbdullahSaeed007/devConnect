import React from "react";
import ProfileCard from "./ProfileCard";

const Suggestions = () => {
  return (
    <div>
      <span className="font-bold text-2xl">Suggestions</span>
      <div className="my-5"></div>
      <ProfileCard
        imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
        name={"Ayma salis"}
        sentence={"C++ Developer with 9 year of Experience"}
      />
      <ProfileCard
        imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
        name={"Ayma salis"}
        sentence={"C++ Developer with 9 year of Experience"}
      />
      <ProfileCard
        imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
        name={"Ayma salis"}
        sentence={"C++ Developer with 9 year of Experience"}
      />
      <ProfileCard
        imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
        name={"Ayma salis"}
        sentence={"C++ Developer with 9 year of Experience"}
      />
      <ProfileCard
        imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
        name={"Ayma salis"}
        sentence={"C++ Developer with 9 year of Experience"}
      />
    </div>
  );
};

export default Suggestions;
