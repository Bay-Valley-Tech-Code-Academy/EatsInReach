'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';
import Image from 'next/image';

export default function VendorPage() {
    // Initialize state with default items
    const [arrayItems, setArrayItems] = useState([
        {
            itemName: 'Apples',
            itemDesc: 'Delicious apples',
            itemPrice: '$3.00',
            image: ''
        },
        {
            itemName: 'Banana',
            itemDesc: 'Delicious bananas',
            itemPrice:'$4.00',
            image: ''
        }
    ]);

    // State to manage form inputs
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    // Function to add a new item to the list based on user input
    const addItem = () => {
        if (newItemName && newItemDesc && newItemPrice) { // Ensure fields are not empty
            const newItem = {
                itemName: newItemName,
                itemDesc: newItemDesc,
                itemPrice: newItemPrice,
                image: '' // You can add image functionality later if needed
            };
            setArrayItems([...arrayItems, newItem]); // Add new item to the array
            setNewItemName(''); // Clear the input fields after adding
            setNewItemDesc('');
            setNewItemPrice('')
        }
    };

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
                    {arrayItems.map((item, index) => (
                        <div key={index} className="-mt-2 p-2 mr-2 lg:mt-0 gap-x-6 grid lg:grid-flow-col grid-flow-row auto-cols-max justify-center gap-4 bg-slate-600 rounded-2xl">
                            <div className="rounded-2xl bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5">
                                <div className="flex flex-col justify-center">
                                    {item.image ? (
                                        <img src={item.image} alt="User" className="w-[80px] h-[80px] rounded-full object-cover" />
                                    ) : (
                                        <Image src="/images/food-bg-images.jpg" alt="Food background" width={500} height={200} />
                                    )}
                                    <p className="text-black font-bold py-2">{item.itemName}</p>
                                    <p className="text-black py-2">{item.itemDesc}</p>
                                    <p className="text-black py-2">{item.itemPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
