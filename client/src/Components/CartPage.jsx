// frontend/components/CartPage.jsx

import React, { useState, useEffect } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState('');

  // Function to fetch items from the cart
  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
  
      // Convert price to number and set default quantity to 1
      const cartItemsWithNumberPrice = data.map(item => ({
        ...item,
        price: parseFloat(item.price),
        quantity: 1 // Default quantity set to 1
      }));
  
      console.log('Fetched cart items:', cartItemsWithNumberPrice); // Log fetched cart items
      setCartItems(cartItemsWithNumberPrice); // Update the state with items from the cart
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  

  // Calculate total bill when cart items change
  useEffect(() => {
    let total = 0;
    cartItems.forEach(item => {
      if (!isNaN(item.price) && !isNaN(item.quantity)) {
        total += item.price * item.quantity;
      }
    });
    console.log('Total bill:', total); // Log total bill
    setTotalBill(total);
  }, [cartItems]);

  // Function to handle quantity change
  const handleQuantityChange = (event, index) => {
    const newQuantity = parseInt(event.target.value);
    setCartItems(prevCartItems => {
      const updatedItems = [...prevCartItems];
      updatedItems[index].quantity = newQuantity;
      return updatedItems;
    });
  };

  // Function to handle remove item from cart
  const handleRemoveItem = (index) => {
    setCartItems(prevCartItems => {
      const updatedItems = [...prevCartItems];
      updatedItems.splice(index, 1); // Remove the item at the specified index
      return updatedItems;
    });
  };

  // Function to handle order now button click
  const handleOrderNowClick = () => {
    setIsOrderModalOpen(true);
  };

  // Function to handle order confirmation
  // Function to handle order confirmation
const handleOrderConfirmation = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          tableNumber,
          cartItems,
          totalBill
        })
      });
      if (response.ok) {
        // Order successfully submitted
        setIsOrderModalOpen(false);
        setCartItems([]);
        setTotalBill(0);
        alert(`Order confirmed for table ${tableNumber}.`);
      } else {
        // Handle error response
        alert('Failed to confirm order. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert('Failed to confirm order. Please try again.');
    }
  };
  
  // Function to handle order cancellation
  const handleOrderCancel = () => {
    setIsOrderModalOpen(false);
  };

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item, index) => (
          <div key={item._id} className="border p-4 flex flex-col items-center relative">
          <button onClick={() => handleRemoveItem(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center">X</button>
          <img src={item.image} alt={item.name} className="w-20 h-20 mb-4" />
          <div className="text-center space-y-2">
            <p className="font-semibold">{item.name}</p>
            <div className="flex items-center">
              <p className="text-gray-500 mr-2">${item.price}</p>
              <select
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, index)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-xl font-bold">Total Bill: ${totalBill}</p>
        <button onClick={handleOrderNowClick} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Order Now
        </button>
      </div>
      {/* Order Confirmation Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Order</h2>
            <input
              type="text"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              placeholder="Table Number"
              className="border border-gray-400 px-3 py-2 rounded mb-4 w-full"
            />
            <p>Total Bill: ${totalBill}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={handleOrderCancel} className="text-red-500 mr-4">Cancel</button>
              <button onClick={handleOrderConfirmation} className="bg-blue-500 text-white px-4 py-2 rounded">Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default CartPage;
