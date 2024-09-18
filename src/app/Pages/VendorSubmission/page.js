"use client";
import { useState, useEffect, useRef, Component } from "react";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import DropdownTime from "@/Components/DropDownTime";

export default function VendorSubmission() {
    const router = useRouter();
    const [foodTypes, setFoodTypes] = useState([]);
    const [filteredFoodTypes, setFilteredFoodTypes] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price_range_id: "",
        food_type_id: "",
        hours_of_operation: "swapped to other hours",
        description: "",
        phone_number: "",
        email: "",
        image_url: "",
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);


    const [open, setOpen] = useState(false)
    const [monday, setMonday] = useState("12:00");
    const [mondayAmPm, setMondayAmPm] = useState("AM");
    const [mondayClosing, setMondayClosing] = useState("12:00");
    const [mondayAmPmClosing, setMondayAmPmClosing] = useState("AM");

    const [openTuesday, setOpenTuesday] = useState(false)
    const [tuesday, setTuesday] = useState("12:00");
    const [tuesdayAmPm, setTuesdayAmPm] = useState("AM");
    const [tuesdayClosing, setTuesdayClosing] = useState("12:00");
    const [tuesdayAmPmClosing, setTuesdayAmPmClosing] = useState("AM");

    const [openWednesday, setOpenWednesday] = useState(false);
    const [wednesday, setWednesday] = useState("12:00");
    const [wednesdayAmPm, setWednesdayAmPm] = useState("AM");
    const [wednesdayClosing, setWednesdayClosing] = useState("12:00");
    const [wednesdayAmPmClosing, setWednesdayAmPmClosing] = useState("AM");

    const [openThursday, setOpenThursday] = useState(false);
    const [thursday, setThursday] = useState("12:00");
    const [thursdayAmPm, setThursdayAmPm] = useState("AM");
    const [thursdayClosing, setThursdayClosing] = useState("12:00");
    const [thursdayAmPmClosing, setThursdayAmPmClosing] = useState("AM");

    const [openFriday, setOpenFriday] = useState(false);
    const [friday, setFriday] = useState("12:00");
    const [fridayAmPm, setFridayAmPm] = useState("AM");
    const [fridayClosing, setFridayClosing] = useState("12:00");
    const [fridayAmPmClosing, setFridayAmPmClosing] = useState("AM");

    const [openSaturday, setOpenSaturday] = useState(false);
    const [saturday, setSaturday] = useState("12:00");
    const [saturdayAmPm, setSaturdayAmPm] = useState("AM");
    const [saturdayClosing, setSaturdayClosing] = useState("12:00");
    const [saturdayAmPmClosing, setSaturdayAmPmClosing] = useState("AM");

    const [openSunday, setOpenSunday] = useState(false);
    const [sunday, setSunday] = useState("12:00");
    const [sundayAmPm, setSundayAmPm] = useState("AM");
    const [sundayClosing, setSundayClosing] = useState("12:00");
    const [sundayAmPmClosing, setSundayAmPmClosing] = useState("AM");

    // Fetch available food types and price ranges when the component loads
    useEffect(() => {
        async function fetchFoodTypes() {
            try {
                const response = await fetch("/api/food-types");
                if (!response.ok) {
                    throw new Error("Failed to fetch food types");
                }
                const data = await response.json();
                setFoodTypes(data);
                setFilteredFoodTypes(data); // Initialize filteredFoodTypes
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchPriceRanges() {
            try {
                const response = await fetch("/api/price-ranges");
                if (!response.ok) {
                    throw new Error("Failed to fetch price ranges");
                }
                const data = await response.json();
                setPriceRanges(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        }

        fetchFoodTypes();
        fetchPriceRanges();
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside of it
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/vendor-submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setSubmitStatus(
                "Submission successful! Your restaurant will be reviewed soon."
            );
            setFormData({
                name: "",
                location: "",
                price_range_id: "",
                food_type_id: "",
                hours_of_operation: "",
                description: "",
                phone_number: "",
                email: "",
                image_url: "",
            });
            setSearchTerm(""); // Clear search term on successful submission
        } else {
            setSubmitStatus(
                "There was an error with your submission. Please try again."
            );
        }
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredFoodTypes(
            foodTypes.filter((type) =>
                type.type_name.toLowerCase().includes(searchTerm)
            )
        );
    };

    const handleSelectFoodType = (type) => {
        setFormData({ ...formData, food_type_id: type.food_type_id });
        setSearchTerm(type.type_name); // Set search term to selected food type name
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        console.log(formData)
    };

    const handleSignOut = () => {
        signOut(auth)
            .then(() => router.push("/"))
            .catch((error) => console.error("Sign out error: ", error));
    };

    const openOrNot = (day) => {
        if (day == "monday") {
            setOpen(!open);
        }
        else if (day === "tuesday") {
            setOpenTuesday(!openTuesday);
        } else if (day === "wednesday") {
            setOpenWednesday(!openWednesday);
        } else if (day === "thursday") {
            setOpenThursday(!openThursday);
        } else if (day === "friday") {
            setOpenFriday(!openFriday);
        } else if (day === "saturday") {
            setOpenSaturday(!openSaturday);
        } else if (day === "sunday") {
            setOpenSunday(!openSunday);
        }
    };




    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between place-items-center">
                <h1 className="text-2xl font-bold">Submit Your Restaurant</h1>
                <div
                    className="hover:bg-[#bb9277] p-2 sm:p-4 cursor-pointer"
                    onClick={handleSignOut}
                >
                    <h2>Sign Out</h2>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Restaurant Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4 relative" ref={dropdownRef}>
                    <label className="block text-gray-700">Food Type:</label>
                    <input
                        type="text"
                        aria-expanded={dropdownVisible}
                        aria-controls="food-type-dropdown"
                        aria-haspopup="true"
                        value={searchTerm}
                        onClick={toggleDropdown}
                        onChange={handleSearchChange}
                        placeholder="Search for a food type"
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {dropdownVisible && (
                        <div
                            id="food-type-dropdown"
                            className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-60 overflow-auto"
                        >
                            {filteredFoodTypes.map((type) => (
                                <div
                                    key={type.food_type_id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelectFoodType(type)}
                                >
                                    {type.type_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price Range:</label>
                    <select
                        name="price_range_id"
                        value={formData.price_range_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a price range</option>
                        {priceRanges.map((range) => (
                            <option key={range.price_range_id} value={range.price_range_id}>
                                {range.range}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="mb-4">
                    <label className="block text-gray-700">Hours of Operation</label>
                    <input
                        type="text"
                        name="hours_of_operation"
                        value={formData.hours_of_operation}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div> */}

                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Monday Hours of Operation</label>

                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer"
                            onChange={() => openOrNot("monday")}
                        ></input>
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{open ? 'Open' : 'Closed'}</span>
                    </label>
                    <div>
                        {open && (
                            <div>
                                <div className="flex">
                                    <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                    <label className="block text-gray-700 w-1/2">Closing Hours</label>
                                </div>

                                <div className=" flex">
                                    <div>
                                        <div className="w-full flex">
                                            <p className="w-1/2 p-2 border border-gray-300 rounded inline-block">{monday}</p>
                                            <p className="w-1/2 p-2 border border-gray-300 rounded inline-block">{mondayAmPm}</p>

                                        </div>

                                        <DropdownTime setTime={setMonday} setAmPm={setMondayAmPm}></DropdownTime>
                                    </div>
                                    <div>


                                        <div className="w-full flex">
                                            <p className="w-1/2 p-2 border border-gray-300 rounded inline-block">{mondayClosing}</p>
                                            <p className="w-1/2 p-2 border border-gray-300 rounded inline-block">{mondayAmPmClosing}</p>

                                        </div>

                                        <DropdownTime setTime={setMondayClosing} setAmPm={setMondayAmPmClosing}></DropdownTime>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Tuesday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("tuesday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openTuesday ? "Open" : "Closed"}</span>
                    </label>

                    {openTuesday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{tuesday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{tuesdayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setTuesday} setAmPm={setTuesdayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{tuesdayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{tuesdayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setTuesdayClosing} setAmPm={setTuesdayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Wednesday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("wednesday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openWednesday ? "Open" : "Closed"}</span>
                    </label>

                    {openWednesday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{wednesday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{wednesdayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setWednesday} setAmPm={setWednesdayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{wednesdayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{wednesdayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setWednesdayClosing} setAmPm={setWednesdayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Thursday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("thursday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openThursday ? "Open" : "Closed"}</span>
                    </label>

                    {openThursday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{thursday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{thursdayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setThursday} setAmPm={setThursdayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{thursdayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{thursdayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setThursdayClosing} setAmPm={setThursdayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Friday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("friday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openFriday ? "Open" : "Closed"}</span>
                    </label>

                    {openFriday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{friday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{fridayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setFriday} setAmPm={setFridayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{fridayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{fridayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setFridayClosing} setAmPm={setFridayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Saturday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("saturday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openSaturday ? "Open" : "Closed"}</span>
                    </label>

                    {openSaturday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{saturday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{saturdayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setSaturday} setAmPm={setSaturdayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{saturdayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{saturdayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setSaturdayClosing} setAmPm={setSaturdayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Sunday Hours of Operation</label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            onChange={() => openOrNot("sunday")}
                        />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900">{openSunday ? "Open" : "Closed"}</span>
                    </label>

                    {openSunday && (
                        <div>
                            <div className="flex">
                                <label className="block text-gray-700 w-1/2">Opening Hours</label>
                                <label className="block text-gray-700 w-1/2">Closing Hours</label>
                            </div>
                            <div className="flex">
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{sunday}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{sundayAmPm}</p>
                                    </div>
                                    <DropdownTime setTime={setSunday} setAmPm={setSundayAmPm}></DropdownTime>
                                </div>
                                <div>
                                    <div className="w-full flex">
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{sundayClosing}</p>
                                        <p className="w-1/2 p-2 border border-gray-300 rounded">{sundayAmPmClosing}</p>
                                    </div>
                                    <DropdownTime setTime={setSundayClosing} setAmPm={setSundayAmPmClosing}></DropdownTime>
                                </div>
                            </div>
                        </div>
                    )}
                </div>







                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form >
            {submitStatus && <p className="mt-4">{submitStatus}</p>
            }
        </div >
    );
}
