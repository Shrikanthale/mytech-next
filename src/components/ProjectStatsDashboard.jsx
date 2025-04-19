// ProjectStatsDashboard.jsx
import React from "react";
import cardoneicon from "../../src/assets/dashboardimgs/cardoneicon.svg"
import cardicontwo from "../../src/assets/dashboardimgs/cardicontwo.svg"
import cardiconthree from "../../src/assets/dashboardimgs/cardiconthree.svg"
import cardiconfour from "../../src/assets/dashboardimgs/cardiconfour.svg"
import Image from "next/image";
const ProjectStatsDashboard = () => {
  return (
    <div className="py-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Project Card */}
        <div className="bg-white rounded-lg shadow-md p-5 flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
              Total Project
            </h3>
            <p className="text-gray-800 text-3xl font-semibold mb-2">6,784</p>
            <div className="flex items-center">
              <span className="text-green-500 text-xs font-medium mr-1">
                10%
              </span>
              <svg
                className="w-3 h-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <span className="text-gray-400 text-xs ml-1">+$150 today</span>
            </div>
          </div>
          {/* <div className="rounded-full bg-blue-100 p-2">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div> */}
          <Image src={cardoneicon} alt="" height={"auto"} width={"auto"} /> 
        </div>

        {/* In Progress Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
              In Progress
            </h3>
            <p className="text-gray-800 text-3xl font-semibold mb-2">1,920</p>
            <div className="flex items-center">
              <span className="text-green-500 text-xs font-medium mr-1">
                30%
              </span>
              <svg
                className="w-3 h-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <span className="text-gray-400 text-xs ml-1">+$150 today</span>
            </div>
          </div>
          <Image src={cardicontwo} alt="" height={"auto"} width={"auto"} /> 
        </div>

        {/* Finished Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">Finished</h3>
            <p className="text-gray-800 text-3xl font-semibold mb-2">4,412</p>
            <div className="flex items-center">
              <span className="text-green-500 text-xs font-medium mr-1">
                10%
              </span>
              <svg
                className="w-3 h-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <span className="text-gray-400 text-xs ml-1">+$150 today</span>
            </div>
          </div>
          <Image src={cardiconthree} alt="" height={"auto"} width={"auto"} /> 
        </div>

        {/* Unfinished Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-start">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">
              Unfinished
            </h3>
            <p className="text-gray-800 text-3xl font-semibold mb-2">329</p>
            <div className="flex items-center">
              <span className="text-green-500 text-xs font-medium mr-1">
                10%
              </span>
              <svg
                className="w-3 h-3 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
              <span className="text-gray-400 text-xs ml-1">+$150 today</span>
            </div>
          </div>
          <Image src={cardiconfour} alt="" height={"auto"} width={"auto"} /> 
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsDashboard;
