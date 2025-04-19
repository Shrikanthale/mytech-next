"use client";
import React from "react";

import { useState } from 'react';

export default function DatePicker() {
  // Initialize with fixed dates to avoid null values
  const [selectedStartDate, setSelectedStartDate] = useState(new Date(2022, 0, 6)); // Jan 6, 2022
  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2022, 0, 13)); // Jan 13, 2022
  const [currentMonthStart, setCurrentMonthStart] = useState(new Date(2022, 0, 1)); // January 2022
  const [currentMonthEnd, setCurrentMonthEnd] = useState(new Date(2022, 1, 1)); // February 2022
  const [activeTab, setActiveTab] = useState('This week');

  // List of time period options
  const timePeriods = [
    'Today',
    'Yesterday',
    'This week',
    'Last week',
    'This month',
    'Last month',
    'This year',
    'Last year',
    'All time'
  ];

  // Generate days for a month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Adjust for Monday as first day of week
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      days.push({
        date: new Date(prevYear, prevMonth, day),
        isCurrentMonth: false,
        isSelected: isDateInRange(new Date(prevYear, prevMonth, day))
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
        isSelected: isDateInRange(new Date(year, month, i))
      });
    }
    
    // Next month days
    const daysNeeded = 42 - days.length;
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: new Date(nextYear, nextMonth, i),
        isCurrentMonth: false,
        isSelected: isDateInRange(new Date(nextYear, nextMonth, i))
      });
    }
    
    return days;
  };

  // Check if date is in the selected range
  const isDateInRange = (date) => {
    // Ensure both dates exist before comparison
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Navigate to previous month
  const goToPrevMonth = (isStartMonth) => {
    if (isStartMonth) {
      setCurrentMonthStart(new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() - 1, 1));
    } else {
      setCurrentMonthEnd(new Date(currentMonthEnd.getFullYear(), currentMonthEnd.getMonth() - 1, 1));
    }
  };

  // Navigate to next month
  const goToNextMonth = (isStartMonth) => {
    if (isStartMonth) {
      setCurrentMonthStart(new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 1));
    } else {
      setCurrentMonthEnd(new Date(currentMonthEnd.getFullYear(), currentMonthEnd.getMonth() + 1, 1));
    }
  };

  // Format date for display - with null check
  const formatDateRange = () => {
    const formatDate = (date) => {
      if (!date) return "";
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };
    return `${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`;
  };

  // Handle date selection with safe null handling
  const handleDateClick = (date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(date);
      } else {
        setSelectedEndDate(date);
      }
    }
  };

  // Set date range based on selected time period
  const selectTimePeriod = (period) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday of current week
    
    let start, end;
    
    switch(period) {
      case 'Today':
        start = end = new Date(today);
        break;
      case 'Yesterday':
        start = end = new Date(today);
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;
      case 'This week':
        start = new Date(startOfWeek);
        end = new Date(startOfWeek);
        end.setDate(startOfWeek.getDate() + 6); // Sunday of current week
        break;
      case 'Last week':
        start = new Date(startOfWeek);
        start.setDate(startOfWeek.getDate() - 7); // Monday of previous week
        end = new Date(start);
        end.setDate(start.getDate() + 6); // Sunday of previous week
        break;
      case 'This month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'Last month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'This year':
        start = new Date(today.getFullYear(), 0, 1);
        end = new Date(today.getFullYear(), 11, 31);
        break;
      case 'Last year':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case 'All time':
        start = new Date(2010, 0, 1); // Arbitrary far past date
        end = new Date(today);
        break;
      default:
        start = new Date(2022, 0, 6);
        end = new Date(2022, 0, 13);
    }
    
    setSelectedStartDate(start);
    setSelectedEndDate(end);
    setActiveTab(period);
  };

  // Generate weekday headers
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];

  // Get month names
  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get days for both months
  const daysStart = getDaysInMonth(currentMonthStart);
  const daysEnd = getDaysInMonth(currentMonthEnd);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-4 max-w-4xl mx-auto">
      <div className="flex">
        {/* Left sidebar */}
        <div className="w-32 mr-4 border-r pr-2">
          {timePeriods.map((period) => (
            <div 
              key={period} 
              className={`py-2 px-4 cursor-pointer text-sm rounded-md ${activeTab === period ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
              onClick={() => selectTimePeriod(period)}
            >
              {period}
            </div>
          ))}
        </div>

        {/* Calendar section */}
        <div className="flex-1 flex">
          {/* First Month */}
          <div className="w-1/2 pr-4">
            <div className="flex items-center justify-between mb-4">
              <button 
                className="p-1 rounded-full hover:bg-gray-200" 
                onClick={() => goToPrevMonth(true)}
              >
                &lt;
              </button>
              <div className="text-sm font-medium">{getMonthName(currentMonthStart)}</div>
              <button 
                className="p-1 rounded-full hover:bg-gray-200" 
                onClick={() => goToNextMonth(true)}
              >
                &gt;
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday headers */}
              {weekdays.map((day) => (
                <div key={day} className="text-xs text-center font-medium py-1">{day}</div>
              ))}
              
              {/* Calendar days */}
              {daysStart.map((day, index) => (
                <div 
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`text-xs h-8 w-8 flex items-center justify-center rounded-full cursor-pointer
                    ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                    ${day.isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                    ${isToday(day.date) ? 'border border-blue-500' : ''}
                  `}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>

          {/* Second Month */}
          <div className="w-1/2 pl-4">
            <div className="flex items-center justify-between mb-4">
              <button 
                className="p-1 rounded-full hover:bg-gray-200" 
                onClick={() => goToPrevMonth(false)}
              >
                &lt;
              </button>
              <div className="text-sm font-medium">{getMonthName(currentMonthEnd)}</div>
              <button 
                className="p-1 rounded-full hover:bg-gray-200" 
                onClick={() => goToNextMonth(false)}
              >
                &gt;
              </button>
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {/* Weekday headers */}
              {weekdays.map((day) => (
                <div key={day} className="text-xs text-center font-medium py-1">{day}</div>
              ))}
              
              {/* Calendar days */}
              {daysEnd.map((day, index) => (
                <div 
                  key={index}
                  onClick={() => handleDateClick(day.date)}
                  className={`text-xs h-8 w-8 flex items-center justify-center rounded-full cursor-pointer
                    ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                    ${day.isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                    ${isToday(day.date) ? 'border border-blue-500' : ''}
                  `}
                >
                  {day.date.getDate()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-4 pt-4 border-t flex justify-between items-center">
        <div className="text-sm">{formatDateRange()}</div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">Cancel</button>
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">Apply</button>
        </div>
      </div>
    </div>
  );
}