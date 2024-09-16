"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';

export default function VendorSubmission() {
    const [foodTypes, setFoodTypes] = useState([]);
    const [filteredFoodTypes, setFilteredFoodTypes] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price_range_id: '', 
        food_type_id: '', 
        hours_of_operation: '',
        description: '',
        phone_number: '',
        email: '',
        image_url: ''
    });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch available food types and price ranges when the component loads
    useEffect(() => {
        async function fetchFoodTypes() {
            try {
                const response = await fetch('/api/food-types');
                if (!response.ok) {
                    throw new Error('Failed to fetch food types');
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
        // Close dropdown when clicking outside of it
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

        const response = await fetch('/api/vendor-submissions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setSubmitStatus('Submission successful! Your restaurant will be reviewed soon.');
            setFormData({
                name: '',
                location: '',
                price_range_id: '',
                food_type_id: '',
                hours_of_operation: '',
                description: '',
                phone_number: '',
                email: '',
                image_url: ''
            });
            setSearchTerm(''); // Clear search term on successful submission
        } else {
            setSubmitStatus('There was an error with your submission. Please try again.');
        }
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        setFilteredFoodTypes(foodTypes.filter((type) =>
            type.type_name.toLowerCase().includes(searchTerm)
        ));
    };

    const handleSelectFoodType = (type) => {
        setFormData({ ...formData, food_type_id: type.food_type_id });
        setSearchTerm(type.type_name); // Set search term to selected food type name
        setDropdownVisible(false);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <Navbar />
            <h1 className="text-2xl font-bold mb-6">Submit Your Restaurant</h1>
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
                        <div id="food-type-dropdown" className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-60 overflow-auto" >
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
                    <select name="price_range_id" value={formData.price_range_id} onChange={handleChange} required>
                        <option value="">Select a price range</option>
                        {priceRanges.map((range) => (
                            <option key={range.price_range_id} value={range.price_range_id}>
                                {range.range}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Hours of Operation</label>
                    <input 
                        type="text" 
                        name="hours_of_operation" 
                        value={formData.hours_of_operation} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
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
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
            {submitStatus && <p className="mt-4">{submitStatus}</p>}
        </div>
    );
}
