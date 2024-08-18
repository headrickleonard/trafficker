import React from "react";
import NavBar from "../components/NavBar";
import TrafficRecords from "../components/Chart";

function HomePage() {
  return (
    <div>
      {/* <NavBar /> */}
      <h1 className="text-center text-2xl font-semibold  top-0 my-2">
        Traffic Frequency Graph
      </h1>
      <div className="w-full h-[32rem] flex flex-col items-center justify-center border border-neutral-200  px-2">
        <TrafficRecords />
      </div>
    </div>
  );
}

export default HomePage;
