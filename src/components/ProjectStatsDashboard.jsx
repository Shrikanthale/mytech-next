// ProjectStatsDashboard.jsx
import React from "react";

const ProjectStatsDashboard = () => {
  return (
    <div className="bg-gray-50 p-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Project Card */}
        <div className="bg-white rounded-lg shadow-sm p-5 flex justify-between items-start">
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
          <div className="rounded-full bg-blue-100 p-2">
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
          </div>
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
          <div className="rounded-full bg-orange-100 p-2">
            <svg
              className="w-5 h-5 text-orange-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"></path>
            </svg>
          </div>
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
          <div className="rounded-full bg-teal-100 p-2">
            <svg
              className="w-5 h-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
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
          <div className="rounded-full bg-red-100 p-2">
            <svg
              className="w-5 h-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatsDashboard;
