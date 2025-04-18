'use client';

import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ArrowDown, ArrowDownRight, ArrowUp, ArrowUpRight } from 'lucide-react';

const RevenueTargetCard = () => {
    const percentage = 75.55;

    return (
        <div className="max-w-sm w-full p-4 rounded-2xl shadow-md bg-white">
            <div className="text-sm font-medium text-gray-700">Target</div>
            <div className="text-xs text-gray-400 mb-4">Revenue Target</div>

            <div className="w-60 h-40 mx-auto mb-2">
                <CircularProgressbarWithChildren
                    value={percentage}
                    maxValue={100}
                    circleRatio={0.5}
                    styles={buildStyles({
                        rotation: 0.75,
                        strokeLinecap: 'round',
                        trailColor: '#e5e7eb',
                        pathColor: '#2086BF',
                    })}
                >
                    <div className="flex flex-col items-center -mt-4">
                        <span className="text-2xl font-semibold" style={{ color: '#1D1F2C' }}>
                            {percentage}%
                        </span>

                        <span className="text-xs mt-1 px-2 py-0.5 bg-green-100 text-green-600 rounded-md">
                            +10%
                        </span>
                    </div>
                </CircularProgressbarWithChildren>
            </div>

            <p className="text-center text-[14px] font-normal text-gray-500 my-3">
                You succeed earn <span className="font-semibold text-black">$240</span> today, it's higher than yesterday
            </p>


            <div className="flex justify-between text-sm font-medium text-gray-600 px-2">
                <div className="flex flex-col items-center">
                        <span className="ml-0.5 text-xs font-normal text-gray-500 ">Target</span>
                    <div className="flex items-center text-red-500">
                        <ArrowDown className="w-4 h-4"  color='#EB3D4D'/>
                    <span className="text-[#1D1F2C] font-semibold " >$20k</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                        <span className="ml-0.5 text-xs">Revenue</span>
                    <div className="flex items-center">
                        <ArrowUp className="w-4 h-4" />
                    <span className="text-black">$16k</span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                        <span className="ml-0.5 text-xs">Today</span>
                    <div className="flex items-center">
                        <ArrowUp className="w-4 h-4" />
                    <span className="text-black">$1.5k</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueTargetCard;
