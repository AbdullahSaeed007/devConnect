import React, { useState } from "react";
import Header from "../components/Header";
import HirePoster from "../components/HirePoster";

function HireAndLearn() {
  const [showNext, setShowNext] = useState(false);
  return (
    <>
      <Header screen={"Hire&Learn"} />
      {!showNext ? (
        <div className="h-[90%] text-center w-full md:mx-0 px-3  flex flex-col items-center">
          <div></div>
          <span className="md:text-3xl text-2xl font-semibold my-5 mt-10">
            Learn from professionals in our community
          </span>
          <span className="md:text-xl text-base mb-5">
            Unlock a Wealth of Knowledge and Expertise by Learning from Seasoned
            Developers & professionals.
          </span>
          <button
            className="rounded-3xl bg-#525CEB px-5 py-2 text-white"
            onClick={() => {
              setShowNext(true);
            }}
          >
            Explore Learning Opportunities
          </button>
          <img
            src="https://www.brookings.edu/wp-content/uploads/2022/05/Digital-credentials_cover-image_reduced-size.jpg"
            alt="iu"
            className="w-11/12 h-auto rounded-3xl md:my-10 mt-10 shadow"
          />
          <div />
          <span className="text-white">about</span>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-1  gap-4 justify-center items-center mx-10 my-5">
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
            name={"David Tervos"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
            name={"Anna Jhon"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/2.jpg"}
            name={"Adam wolf"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/3.jpg"}
            name={"Ayma salis"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/4.jpg"}
            name={"Waqas Ali"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
            name={"David Tervos"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
            name={"Anna Jhon"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/2.jpg"}
            name={"Adam wolf"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/3.jpg"}
            name={"Ayma salis"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/4.jpg"}
            name={"Waqas Ali"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
            name={"David Tervos"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
            name={"Anna Jhon"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/2.jpg"}
            name={"Adam wolf"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/3.jpg"}
            name={"Ayma salis"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/4.jpg"}
            name={"Waqas Ali"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
            name={"David Tervos"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
            name={"Anna Jhon"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/2.jpg"}
            name={"Adam wolf"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/3.jpg"}
            name={"Ayma salis"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/4.jpg"}
            name={"Waqas Ali"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/0.jpg"}
            name={"David Tervos"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/1.jpg"}
            name={"Anna Jhon"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/2.jpg"}
            name={"Adam wolf"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/3.jpg"}
            name={"Ayma salis"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
          <HirePoster
            imageUrl={"https://randomuser.me/api/portraits/men/4.jpg"}
            name={"Waqas Ali"}
            exp={"  C++ Developer with 9 year of Experience"}
          />
        </div>
      )}
    </>
  );
}

export default HireAndLearn;
