import { useState, useEffect } from 'react';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/getorders', {
        method: 'GET',
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePaymentToggle = async (orderId, paid) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paid }),
      });
      if (response.ok) {
        // Update the order list after successful update
        fetchOrders();
      } else {
        console.error('Failed to update payment status');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <div>
              Table: {order.tableNumber}, Total: ${order.totalBill}
              <ul>
                {order.cartItems.map(item => (
                  <li key={item._id}>
                    {item.quantity}x {item.name} (${item.price})
                  </li>
                ))}
              </ul>
            </div>
            {/* Button to toggle payment status */}
            <button
              onClick={() => handlePaymentToggle(order._id, !order.paid)}
              style={{ backgroundColor: order.paid ? 'green' : 'red' }}
            >
              {order.paid ? 'Paid' : 'Unpaid'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOrder;
