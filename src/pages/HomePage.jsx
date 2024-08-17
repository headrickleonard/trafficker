import React from "react";
import NavBar from "../components/NavBar";
import TrafficRecords from "../components/Chart";

function HomePage() {
  return (
    <div>
      {/* <NavBar /> */}
      <div className="w-full h-[30rem] flex items-center justify-center border border-neutral-200 my-12 py-4 px-2">
        <TrafficRecords />
      </div>
    </div>
  );
}

export default HomePage;
