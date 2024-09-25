"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/authContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase";
import Navbar from "@/Components/Navbar";

export default function MenuItemPage() {
  const router = useRouter();
  const { currentUser, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [isRoleLoading, setIsRoleLoading] = useState(true);
  const [vendorItems, setVendorItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemRestaurantId, setNewItemRestaurantId] = useState(1);
  const [editingItemId, setEditingItemId] = useState(null);

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
    async function fetchVendorItems() {
      try {
        const res = await fetch("/api/vendor-items");
        if (res.ok) {
          const data = await res.json();
          setVendorItems(data);
        } else {
          console.error("Failed to fetch vendor items");
        }
      } catch (error) {
        console.error("Error fetching vendor items:", error);
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
        item_price: parseFloat(newItemPrice.replace("$", "")),
        image_path: fallbackImage,
        alt_text: "",
      };

      const endpoint = editingItemId
        ? `/api/vendor-items/update`
        : `/api/vendor-items/submit`;
      if (editingItemId) {
        itemData.id = editingItemId;
      }

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });

        if (res.ok) {
          const updatedItem = await res.json();
          if (editingItemId) {
            setVendorItems((prevItems) =>
              prevItems.map((item) =>
                item.item_id === editingItemId ? updatedItem : item
              )
            );
          } else {
            setVendorItems((prevItems) => [...prevItems, updatedItem]);
          }
          resetForm();
        } else {
          console.error("Failed to add/update item");
        }
      } catch (error) {
        console.error("Failed to add/update item", error);
      }
    } else {
      console.error("Validation failed: All fields are required");
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
    setNewItemName("");
    setNewItemDesc("");
    setNewItemPrice("");
    setEditingItemId(null);
  };

  const removeItem = async (itemId) => {
    try {
      const res = await fetch("/api/vendor-items/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item_id: itemId }),
      });

      if (res.ok) {
        setVendorItems((prevItems) =>
          prevItems.filter((item) => item.item_id !== itemId)
        );
      } else {
        console.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const fallbackImage = "/images/food-bg-images.jpg";

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
      <div className="flex flex-col items-center justify-center gap-4 bg-[#FDFBCE] min-h-[100vh] p-6 overflow-x-hidden">
        <h1 className="text-2xl font-bold">Modify Menu Item</h1>
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
            className="bg-blue-500 text-white p-2 rounded drop-shadow-md"
          >
            {editingItemId ? "Update Item" : "Add Item"}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {vendorItems.map((item) => (
            <div
              key={item.item_id}
              className="p-4 bg-Yellow-Green drop-shadow-md rounded-2xl flex flex-col"
            >
              <div className="rounded-2xl bg-gray-50 drop-shadow-md p-3 text-center ring-1 ring-inset ring-gray-900/5 flex flex-col justify-between h-full">
                <div className="flex flex-col justify-center items-center">
                  {editingItemId === item.item_id ? (
                    <>
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="border p-1 mb-2 rounded w-full"
                      />
                      <textarea
                        type="text"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="border p-1 mb-2 rounded w-full"
                      />
                      <input
                        type="text"
                        value={newItemPrice}
                        onChange={(e) => setNewItemPrice(e.target.value)}
                        className="border p-1 mb-2 rounded w-full"
                      />
                      <button
                        onClick={() => {
                          addItem();
                          resetForm();
                        }}
                        className="bg-green-500 text-white p-2 rounded w-full drop-shadow-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-red-500 text-white p-2 rounded mt-2 w-full drop-shadow-md"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <img
                        src={item.image_path || fallbackImage}
                        alt={item.alt_text || "Default image"}
                        className="w-full object-cover rounded-2xl drop-shadow-md"
                        onError={(e) => {
                          e.currentTarget.src = fallbackImage;
                        }}
                      />
                      <p className="text-black font-bold py-2">
                        {item.item_name}
                      </p>

                      <div className="text-black py-2 w-full h-[60px] break-words overflow-auto">
                        {item.item_desc}
                      </div>

                      <p className="text-black py-2">${item.item_price}</p>
                    </>
                  )}
                </div>
                <div className="flex flex-col w-full mt-2">
                  <button
                    onClick={() => editItem(item)}
                    className="bg-yellow-500 text-white p-2 rounded w-full flex-grow drop-shadow-md"
                  >
                    Edit Item
                  </button>
                  <button
                    onClick={() => removeItem(item.item_id)}
                    className="bg-red-500 text-white p-2 rounded w-full mt-2 flex-grow drop-shadow-md"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
