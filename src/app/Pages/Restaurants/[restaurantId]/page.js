'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function VendorPage() {
    const [vendorItems, setVendorItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch vendor items on component mount
    useEffect(() => {
        async function fetchVendorItems() {
            try {
                const response = await fetch('/api/vendorItems');
                if (!response.ok) {
                    throw new Error('Failed to fetch vendor items');
                }
                const data = await response.json();
                setVendorItems(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchVendorItems();
    }, []);

    // Add a new vendor item
    const addItem = async () => {
        if (newItemName && newItemDesc && newItemPrice) {
            const newItem = {
                item_name: newItemName,
                item_desc: newItemDesc,
                item_price: parseFloat(newItemPrice.replace('$', '')),
                image_path: '', // Add image functionality if needed
                alt_text: ''
            };

            try {
                const response = await fetch('/api/vendorItems', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });

                if (!response.ok) {
                    throw new Error('Failed to add new item');
                }
                const addedItem = await response.json();
                setVendorItems([...vendorItems, addedItem]);
                setNewItemName('');
                setNewItemDesc('');
                setNewItemPrice('');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white text-lg text-black">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white text-lg text-black">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="w-full bg-white">
                <Navbar />
            </header>

            {/* Main Content Section */}
            <main className="flex-grow w-full max-w-6xl mx-auto p-4 bg-white">
                <section className="mb-4 p-2">
                    <h1 className="text-3xl font-bold text-center text-black">
                        Vendor Items
                    </h1>
                </section>

                {/* Input Form */}
                <section className="mb-6 p-2">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                        <input
                            type="text"
                            placeholder="Item Description"
                            value={newItemDesc}
                            onChange={(e) => setNewItemDesc(e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                        <input
                            type="text"
                            placeholder="Item Price"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            className="border p-2 rounded flex-grow"
                        />
                        <button
                            onClick={addItem}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Add Item
                        </button>
                    </div>
                </section>

                {/* Display the list of items */}
                <section className="grid grid-cols-2 grid-flow-row items-center justify-center gap-4">
                    {vendorItems.map((item) => (
                        <div key={item.item_id} className="-mt-2 p-2 mr-2 lg:mt-0 gap-x-6 grid lg:grid-flow-col grid-flow-row auto-cols-max justify-center gap-4 bg-slate-600 rounded-2xl">
                            <div className="rounded-2xl bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5">
                                <div className="flex flex-col justify-center">
                                    {item.image_path ? (
                                        <img src={item.image_path} alt={item.alt_text} className="w-[80px] h-[80px] rounded-full object-cover" />
                                    ) : (
                                        <img src="/images/food-bg-images.jpg" alt="Food background" className="w-full h-auto object-cover" />
                                    )}
                                    <p className="text-black font-bold py-2">{item.item_name}</p>
                                    <p className="text-black py-2">{item.item_desc}</p>
                                    <p className="text-black py-2">${item.item_price.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="w-full bg-white">
                <Footer />
            </footer>
        </div>
    );
}
