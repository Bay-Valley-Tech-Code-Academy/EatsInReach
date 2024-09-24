"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import { UploadButton } from "../../../../libs/uploadthing";
import Navbar from "@/Components/Navbar";
import DropdownTime from "@/Components/DropDownTime";
export default function VendorSubmission() {
    const router = useRouter();
    const { currentUser, loading } = useAuth();
    const [role, setRole] = useState(null);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    const [priceRanges, setPriceRanges] = useState([]);
    const [foodTypes, setFoodTypes] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: 'Sample Restaurant',
        location: '123 Main St, Sample City',
        hours_of_operation: 'MONDAY-FRIDAY: 12:00AM - 12:00AM',
        description: 'A great place to enjoy delicious food!',
        website: 'sample.com',
        phone_number: '123-456-7890',
        email: 'sample@restaurant.com',
        price_range_id: '2',
        food_type_id: '1',
        image: '', // Single image input
        alt_text: 'Image description', // Alt text for the image
    });
    const [imageURL, setImageURL] = useState("")
    const [isImageUploaded, setIsImageUploaded] = useState(false);
    const dropdownRef = useRef(null);
    const sidebar = ["Profile", "Tbd"]

    const [open, setOpen] = useState(true)
    const [monday, setMonday] = useState("12:00");
    const [mondayAmPm, setMondayAmPm] = useState("AM");
    const [mondayClosing, setMondayClosing] = useState("12:00");
    const [mondayAmPmClosing, setMondayAmPmClosing] = useState("AM");

    const [startOfWeek, setStartOfWeek] = useState("")
    const [endOfWeek, setEndOfWeek] = useState("")

    // useEffect(() => {
    //     setFormData({
    //         ...formData,
    //         days_open: ``,
    //     });
    // }, [startOfWeek, endOfWeek]);

    useEffect(() => {
        setFormData({
            ...formData,
            hours_of_operation: `${startOfWeek.toUpperCase()} - ${endOfWeek.toUpperCase()} : ${monday}${mondayAmPm} - ${mondayClosing}${mondayAmPmClosing}`,
        });
    }, [monday, mondayAmPm, mondayClosing, mondayAmPmClosing, startOfWeek, endOfWeek]);


    // const openOrNot = (day) => {
    //     if (day == "monday") {
    //         setOpen(!open);
    //     }
    //     console.log(formData)
    // };

    useEffect(() => {
        // Redirect to the landing page if the user is not logged in
        if (!loading && !currentUser) {
            router.push("/");
        }
        if (currentUser) {
            const fetchUserData = async () => {
                const collections = ["users", "vendors", "admins"];
                let found = false;

                for (const collection of collections) {
                    if (found) break;

                    try {
                        const userDoc = await getDoc(
                            doc(firestore, collection, currentUser.uid)
                        );

                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            if (userData.role !== "vendor") {
                                router.push("/");
                            }
                            found = true;
                            setRole(userData.role);
                        }
                    } catch (error) {
                        console.error(
                            `Error fetching user data from ${collection} collection:`,
                            error
                        );
                    }
                }

                if (!found) {
                    console.log(
                        "User document does not exist in any of the collections."
                    );
                    setRole(null);
                }
                setIsRoleLoading(false);
            };

            fetchUserData();
        }
    }, [currentUser, loading, router]);

    useEffect(() => {
        async function fetchFoodTypes() {
            try {
                const response = await fetch('/api/food-types');
                if (!response.ok) {
                    throw new Error('Failed to fetch food types');
                }
                const data = await response.json();
                setFoodTypes(data);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchPriceRanges() {
            try {
                const response = await fetch('/api/price-ranges');
                if (!response.ok) {
                    throw new Error('Failed to fetch price ranges');
                }
                const data = await response.json();
                setPriceRanges(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchFoodTypes();
        fetchPriceRanges();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('/api/vendor-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    uid: currentUser.uid,
                    image: imageURL, // Include the imageURL in the submission
                    photo_type_id: 4,
                })
            });

            if (response.ok) {
                setSubmitStatus('Submission successful! Your restaurant will be reviewed soon.');
                setFormData({
                    name: '',
                    location: '',
                    hours_of_operation: '',
                    description: '',
                    website: '',
                    phone_number: '',
                    email: '',
                    price_range_id: '',
                    food_type_id: '',
                    image: '',
                    alt_text: '',
                });
                setImageURL(''); // Clear image URL after submission
            } else {
                setSubmitStatus('There was an error with your submission. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting vendor:', error);
            setSubmitStatus('There was an error with your submission. Please try again.');
        }
    };

    // Show a loading indicator while checking auth state or role
    if (loading || isRoleLoading) {
        return <div>Loading...</div>; // You can replace this with a loading spinner if needed
    }

    if (!currentUser || role !== "vendor") {
        return <div>Redirecting...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <div className="flex justify-between place-items-center">
                    <h1 className="text-2xl font-bold">Submit Your Restaurant</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Restaurant Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
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
                            value={formData.location || ''}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Dates Open</label>
                        <div className="inline-flex space-x-6 items-center">
                            <input
                                type="text"
                                name="days_open"
                                value={startOfWeek}
                                onChange={(e) => setStartOfWeek(e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded"
                            />
                            <p className="text-center w-1/6"> thru </p>
                            <input
                                type="text"
                                name="days_open"
                                value={endOfWeek}
                                onChange={(e) => setEndOfWeek(e.target.value)}
                                className="w-1/3 p-2 border border-gray-300 rounded"
                            />
                        </div>

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700"> Hours of Operation</label>

                        {/* <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer"
                                onChange={() => openOrNot("monday")}
                            ></input>
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{open ? 'Open' : 'Closed'}</span>
                        </label> */}
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
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Price Range</label>
                        <select
                            name="price_range_id"
                            value={formData.price_range_id || ''}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Price Range</option>
                            {priceRanges.map(pr => (
                                <option key={pr.price_range_id} value={pr.price_range_id}>{pr.range}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Food Type</label>
                        <select
                            name="food_type_id"
                            value={formData.food_type_id || ''}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Food Type</option>
                            {foodTypes.map(ft => (
                                <option key={ft.food_type_id} value={ft.food_type_id}>{ft.type_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        {isImageUploaded ? (
                            <div className="text-green-500">Image uploaded successfully!</div>
                        ) : (
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    console.log("Files: ", res[0].url);
                                    setImageURL(res[0].url);
                                    setIsImageUploaded(true);
                                }}
                                onUploadError={(error) => {
                                    console.log(`ERROR! ${error.message}`);
                                }}
                            />
                        )}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Submit
                    </button>
                </form>
                {submitStatus && <p className="mt-4">{submitStatus}</p>}
            </div>
        </>
    );
}



// const [open, setOpen] = useState(false)
// const [monday, setMonday] = useState("12:00");
// const [mondayAmPm, setMondayAmPm] = useState("AM");
// const [mondayClosing, setMondayClosing] = useState("12:00");
// const [mondayAmPmClosing, setMondayAmPmClosing] = useState("AM");

// const [startOfWeek, setStartOfWeek] = useState("")
// const [endOfWeek, setEndOfWeek] = useState("")

// useEffect(() => {
//     setFormData({
//         ...formData,
//         days_open: `${startOfWeek.toUpperCase()} - ${endOfWeek.toUpperCase()}`,
//     });
// }, [startOfWeek, endOfWeek]);

// useEffect(() => {
//     setFormData({
//         ...formData,
//         hours_of_operation: `${monday}${mondayAmPm} - ${mondayClosing}${mondayAmPmClosing}`,
//     });
// }, [monday, mondayAmPm, mondayClosing, mondayAmPmClosing]);


// const openOrNot = (day) => {
//     if (day == "monday") {
//         setOpen(!open);
//     }
// };

