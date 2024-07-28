import { Admininfo } from "../models/admin.model.js";
import { Menu } from "../models/menu.model.js";
import {Order} from "../models/order.model.js"
import { uploadToCloudinary } from "../middleware/cloudinary.middleware.js"

const admin_registration = async (req, res) => {

    try {
        const { name, password, email, phone } = req.body;


        const userExist = await Admininfo.findOne({ name: name });
        console.log(userExist)

        if (userExist) {
            res.status(401).json({ msg: "User Already Exist" });
        }
        else {

            const register = await Admininfo.create({ name, password, email, phone })
            res.status(201).json({ msg: "Registered successfully" })
        }
    }
    catch (error) {
        console.log(error);
    }

}

const admin_login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const userExist = await Admininfo.findOne({ name: name })

        if (userExist) {
            const verifyPass = await userExist.isPassowrdCorrect(password)

            if (verifyPass) {
                res.status(200).json({ msg: "Successfully Logged In", token: await userExist.generatetoken(), userid: userExist._id.toString() })

            }
            else {
                res.status(401).json({ msg: "Invalid Credentials " })
            }
        }
        else {
            res.status(401).json({ msg: "Invalid Credentials " })
        }

    } catch (error) {
        console.log(error);
    }
}

const add_menu = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        // Access the Cloudinary URL from the request object
        const image = req.cloudinaryUrl;

        // Create menu item in the database
        const menu = await Menu.create({ name, price, category, image});
        
        res.status(201).json({ msg: "Menu item added successfully" });

    } catch (error) {
        console.error("Error adding menu item:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const admin_menu = async (req, res) => {
    try {

        const menus = await Menu.find({});
        res.status(200).json({ msg: menus });

    } catch (error) {
        console.log(error)
    }
}

const edit_menu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenuData = req.body;
        // Update menu item with the specified ID in the database
        await Menu.findByIdAndUpdate(id, updatedMenuData);
        res.status(200).json({ success: true, message: "Menu item updated successfully" });
    } catch (error) {
        console.error("Error updating menu item:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const delete_menu = async (req, res) => {
    try {
        const { id } = req.params;

        await Menu.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// controllers/order.controller.js

const createOrder = async (req, res) => {
    try {
      // Extract order details from the request body
      const { tableNumber, cartItems, totalBill } = req.body;
  
      // Example: Saving the order to a database (assuming you have a Order model)
      const order = new Order({
        tableNumber,
        cartItems,
        totalBill,
        createdAt: new Date()
      });
  
      // Save the order to the database
      await order.save();
  
      // Send admin notification (This part depends on your notification mechanism)
  
      // Return success response
      res.status(201).json({ message: 'Order received successfully.', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order.' });
    }
  };

  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }); // Retrieve orders sorted by creation date (newest first)
      res.json(orders);
      
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders.' });
    }
  };

  const togglePaymentStatus = async (req, res) => {
    const { orderId } = req.params;
    const { paid } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, { paid }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ message: 'Failed to update payment status' });
    }
  };
  
  
export { admin_registration, admin_login, add_menu, admin_menu, edit_menu, delete_menu, createOrder, getAllOrders, togglePaymentStatus}