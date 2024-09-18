import React, { useState } from "react";

const DropdownTime = ({ setTime, setAmPm }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [amPmOpen, setAmPmOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdownAmPm = () => {
        setAmPmOpen(!amPmOpen);
    };


    return (
        <div className="relative flex">
            {/* Button to open/close the dropdown */}
            <button
                onClick={toggleDropdown}
                className="inline-flex w-half rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Options
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className=" absolute left-0 mt-8 w-28 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <ul>
                            <li onClick={() => setTime("1:00")} >1:00</li>
                            <li onClick={() => setTime("2:00")} >2:00</li>
                            <li onClick={() => setTime("3:00")} >3:00</li>
                            <li onClick={() => setTime("4:00")} >4:00</li>
                            <li onClick={() => setTime("5:00")} >5:00</li>
                            <li onClick={() => setTime("6:00")} >6:00</li>
                            <li onClick={() => setTime("7:00")} >7:00</li>
                            <li onClick={() => setTime("8:00")} >8:00</li>
                            <li onClick={() => setTime("9:00")} >9:00</li>
                            <li onClick={() => setTime("10:00")} >10:00</li>
                            <li onClick={() => setTime("11:00")} >11:00</li>
                            <li onClick={() => setTime("12:00")} >12:00</li>
                        </ul>
                    </div>
                </div>
            )}

            <button
                onClick={toggleDropdownAmPm}
                className="inline-flex w-half rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Options
                <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {/* Dropdown menu */}
            {amPmOpen && (
                <div className=" absolute left-28 mt-8 w-28 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <ul>
                            <li onClick={() => setAmPm("AM")} >AM</li>
                            <li onClick={() => setAmPm("PM")} >PM</li>

                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DropdownTime;