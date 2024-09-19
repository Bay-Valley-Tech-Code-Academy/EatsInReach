"use client";
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/Components/Navbar';

export default function VendorSubmission() {
    const [foodTypes, setFoodTypes] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);
    const [photoTypes, setPhotoTypes] = useState([]);
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
    const [imageFiles, setImageFiles] = useState([]);
    const [photoTypeSelections, setPhotoTypeSelections] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Fetch available food types, price ranges, and photo types when the component loads
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

        async function fetchPhotoTypes() {
          try {
              const response = await fetch('/api/photo-types');
              if (!response.ok) {
                  throw new Error('Failed to fetch photo types');
              }
              const data = await response.json();
              setPhotoTypes(data);
          } catch (error) {
              console.error('Error fetching photo types:', error);
          }
      }

        fetchFoodTypes();
        fetchPriceRanges();
        fetchPhotoTypes();
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

    const handleFileChange = (e, index) => {
      const files = Array.from(e.target.files);
      const updatedSelections = [...photoTypeSelections];
      updatedSelections[index].images = files;
      setPhotoTypeSelections(updatedSelections);
  };

    const handlePhotoTypeChange = (e, index) => {
        const updatedSelections = [...photoTypeSelections];
        updatedSelections[index] = {
            ...updatedSelections[index],
            photo_type_id: e.target.value
        };
        setPhotoTypeSelections(updatedSelections);
    };

    const handleAltTextChange = (e, index) => {
        const updatedSelections = [...photoTypeSelections];
        updatedSelections[index] = {
            ...updatedSelections[index],
            alt_text: e.target.value
        };
        setPhotoTypeSelections(updatedSelections);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const imageUploadPromises = imageFiles.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const imageUrls = await Promise.all(imageUploadPromises);

            const response = await fetch('/api/vendor-submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    photo_types: photoTypeSelections.map((photo, index) => ({
                        photo_type_id: photo.photo_type_id,
                        image_url: imageUrls[index],
                        alt_text: photo.alt_text
                    }))
                })
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
                setImageFiles([]);
                setPhotoTypeSelections([]);
            } else {
                setSubmitStatus('There was an error with your submission. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting vendor:', error);
            setSubmitStatus('There was an error with your submission. Please try again.');
        }
    };

    const addPhotoTypeSelection = () => {
        setPhotoTypeSelections([...photoTypeSelections, { photo_type_id: '', alt_text: '' }]);
    };
    const removePhotoTypeSelection = (index) => {
      setPhotoTypeSelections(photoTypeSelections.filter((_, i) => i !== index));
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
                <div className="mb-4">
                    <label className="block text-gray-700">Price Range</label>
                    <select 
                        name="price_range_id" 
                        value={formData.price_range_id} 
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
                        value={formData.food_type_id} 
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
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input 
                        type="text" 
                        name="phone_number" 
                        value={formData.phone_number} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                  <button 
                      type="button" 
                      onClick={addPhotoTypeSelection} 
                      className="bg-blue-500 text-white p-2 rounded"
                  >
                      Add Photo Type
                  </button>
                  {photoTypeSelections.map((photo, index) => (
                      <div key={index} className="mb-4">
                          <label className="block text-gray-700">Photo Type</label>
                          <select 
                              value={photo.photo_type_id} 
                              onChange={(e) => handlePhotoTypeChange(e, index)} 
                              className="w-full p-2 border border-gray-300 rounded"
                          >
                              <option value="">Select Photo Type</option>
                              {photoTypes.map(pt => (
                                  <option key={pt.photo_type_id} value={pt.photo_type_id}>
                                      {pt.type_name}
                                  </option>
                              ))}
                          </select>
                          <label className="block text-gray-700 mt-2">Alt Text</label>
                          <input 
                              type="text" 
                              value={photo.alt_text} 
                              onChange={(e) => handleAltTextChange(e, index)} 
                              className="w-full p-2 border border-gray-300 rounded"
                          />
                          <label className="block text-gray-700 mt-2">Upload Images</label>
                            <input 
                                type="file" 
                                multiple 
                                onChange={(e) => handleFileChange(e, index)} 
                                className="w-full p-2 border border-gray-300 rounded"
                          />
                          <button
                              type="button"
                              onClick={() => removePhotoTypeSelection(index)}
                              className="mt-2 bg-red-500 text-white p-2 rounded"
                          >
                              Remove
                          </button>
                      </div>
                  ))}
              </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Submit
                </button>
            </form>
            {submitStatus && <p className="mt-4 text-green-500">{submitStatus}</p>}
        </div>
    );
}
