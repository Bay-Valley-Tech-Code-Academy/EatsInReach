'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';

export default function VendorPage() {
    // Initialize state with vendor items
    const [vendorItems, setVendorItems] = useState([]);

    // Fetch vendor items when component mounts
    useEffect(() => {
        async function fetchVendorItems() {
            try {
                const res = await fetch('/api/vendor-items');
                if (res.ok) {
                    const data = await res.json();
                    setVendorItems(data);
                } else {
                    console.error('Failed to fetch vendor items');
                }
            } catch (error) {
                console.error('Error fetching vendor items:', error);
            }
        }

        fetchVendorItems();
    }, []);

    // State to manage form inputs
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemRestaurantId, setNewItemRestaurantId] = useState(1); // Replace with a valid restaurant ID

    // Function to add a new item to the list
    const addItem = async () => {
        if (newItemName && newItemDesc && newItemPrice) {
            const newItem = {
                restaurant_id: newItemRestaurantId,
                item_name: newItemName,
                item_desc: newItemDesc,
                item_price: parseFloat(newItemPrice.replace('$', '')),
                image_path: {fallbackImage}, // Set to an empty string if no image is provided
                alt_text: ''
            };

            try {
                const res = await fetch('/api/vendor-items/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });

                if (res.ok) {
                    const addedItem = await res.json();
                    setVendorItems((prevItems) => [...prevItems, addedItem]); // Add new item to the array
                    setNewItemName(''); // Clear the input fields after adding
                    setNewItemDesc('');
                    setNewItemPrice('');
                } else {
                    console.error('Failed to add item');
                }
            } catch (error) {
                console.error('Failed to add item', error);
            }
        } else {
            console.error('Validation failed: All fields are required');
        }
    };

    // Fallback image URL
    const fallbackImage = '/images/food-bg-images.jpg';

    return (
        <div>
            <Navbar />
            <div>Vendor Page</div>
            <Link href="/">Home</Link>

            <div className="flex flex-col items-center justify-center gap-4">
                <h1>Vendor Page</h1>

                {/* Input form to add new item */}
                <div className="flex flex-col items-center justify-center gap-2">
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Item Description"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Item Price"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={addItem}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Add Item
                    </button>
                </div>

                {/* Display the list of items */}
                <div className="grid grid-cols-2 grid-flow-row items-center justify-center gap-4 mt-4">
                    {vendorItems.map((item) => (
                        <div key={item.item_id} className="-mt-2 p-2 mr-2 lg:mt-0 gap-x-6 grid lg:grid-flow-col grid-flow-row auto-cols-max justify-center gap-4 bg-slate-600 rounded-2xl">
                            <div className="rounded-2xl bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5">
                                <div className="flex flex-col justify-center">
                                    <img
                                        src={item.image_path || fallbackImage}
                                        alt={item.alt_text || 'Default image'}
                                        width={500}
                                        height={200}
                                        onError={(e) => {
                                            e.currentTarget.src = fallbackImage;
                                        }}
                                    />
                                    <p className="text-black font-bold py-2">{item.item_name}</p>
                                    <p className="text-black py-2">{item.item_desc}</p>
                                    <p className="text-black py-2">${item.item_price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
