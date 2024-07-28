import React, { useState, useEffect } from 'react';

const MenuItem = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [message, setMessage] = useState('');

  // Function to fetch menu items from the backend
  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/add_to_cart', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      setMenuItems(data); // Update the state with menu items received from the server
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Fetch menu items when component mounts
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Function to add item to cart
  const handleAddToCart = async (itemID) => {
    try {
      const response = await fetch(`http://localhost:3000/add-to-cart/${itemID}`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.text();
      // setMessage(data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menuItems.map(item => (
        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden w-40">
          <img src={item.image} alt={item.name} className="w-70 h-24 object-cover object-center" />
          <div className="p-4">
            <h2 className="text-gray-800 text-base font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
            <button onClick={() => handleAddToCart(item._id)} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Add to Cart</button>
          </div>
        </div>
      ))}
      <p className="text-green-500">{message}</p>
    </div>
  );
};

export default MenuItem;
