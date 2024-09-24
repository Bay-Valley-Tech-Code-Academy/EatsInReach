'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/Components/Navbar';

export default function VendorPage() {
    const [vendorItems, setVendorItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemRestaurantId, setNewItemRestaurantId] = useState(1);
    const [editingItemId, setEditingItemId] = useState(null);

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

    const addItem = async () => {
        if (newItemName && newItemDesc && newItemPrice) {
            const itemData = {
                restaurant_id: newItemRestaurantId,
                item_name: newItemName,
                item_desc: newItemDesc,
                item_price: parseFloat(newItemPrice.replace('$', '')),
                image_path: fallbackImage,
                alt_text: ''
            };

            const endpoint = editingItemId ? `/api/vendor-items/update` : `/api/vendor-items/submit`;
            if (editingItemId) {
                itemData.id = editingItemId;
            }

            try {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemData),
                });

                if (res.ok) {
                    const updatedItem = await res.json();
                    if (editingItemId) {
                        setVendorItems((prevItems) =>
                            prevItems.map((item) => (item.item_id === editingItemId ? updatedItem : item))
                        );
                    } else {
                        setVendorItems((prevItems) => [...prevItems, updatedItem]);
                    }
                    resetForm();
                } else {
                    console.error('Failed to add/update item');
                }
            } catch (error) {
                console.error('Failed to add/update item', error);
            }
        } else {
            console.error('Validation failed: All fields are required');
        }
    };

    const editItem = (item) => {
        setNewItemName(item.item_name);
        setNewItemDesc(item.item_desc);
        setNewItemPrice(item.item_price);
        setEditingItemId(item.item_id);
    };

    const cancelEdit = () => {
        resetForm();
    };

    const resetForm = () => {
        setNewItemName('');
        setNewItemDesc('');
        setNewItemPrice('');
        setEditingItemId(null);
    };

    const removeItem = async (itemId) => {
        try {
            const res = await fetch('/api/vendor-items/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: itemId }),
            });

            if (res.ok) {
                setVendorItems((prevItems) => prevItems.filter(item => item.item_id !== itemId));
            } else {
                console.error('Failed to remove item');
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const fallbackImage = '/images/food-bg-images.jpg';

    return (
        <div>
            <Navbar />
            <div>Vendor Page</div>
            <Link href="/">Home</Link>

            <div className="flex flex-col items-center justify-center gap-4">
                <h1>Vendor Page</h1>

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
                        {editingItemId ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItemId && (
                        <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white p-2 rounded mt-2"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-2 grid-flow-row items-center justify-center gap-4 mt-4">
                    {vendorItems.map((item) => (
                        <div key={item.item_id} className="-mt-2 p-2 mr-2 lg:mt-0 gap-x-6 grid lg:grid-flow-col grid-flow-row auto-cols-max justify-center gap-4 bg-slate-600 rounded-2xl">
                            <div className="rounded-2xl bg-gray-50 text-center ring-1 ring-inset ring-gray-900/5">
                                <div className="flex flex-col justify-center">
                                    {editingItemId === item.item_id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={newItemName}
                                                onChange={(e) => setNewItemName(e.target.value)}
                                                className="border p-1 mb-2 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={newItemDesc}
                                                onChange={(e) => setNewItemDesc(e.target.value)}
                                                className="border p-1 mb-2 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={newItemPrice}
                                                onChange={(e) => setNewItemPrice(e.target.value)}
                                                className="border p-1 mb-2 rounded"
                                            />
                                            <button
                                                onClick={() => {
                                                    addItem();
                                                    resetForm();
                                                }}
                                                className="bg-green-500 text-white p-2 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="bg-red-500 text-white p-2 rounded mt-2"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
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
                                            <button
                                                onClick={() => editItem(item)}
                                                className="bg-yellow-500 text-white p-2 rounded mt-2"
                                            >
                                                Edit Item
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.item_id)}
                                                className="bg-red-500 text-white p-2 rounded mt-2"
                                            >
                                                Remove Item
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}