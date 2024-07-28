import { Menu } from "../models/menu.model.js";

// const categories = async(req,res)=>
// {
//     try {
//         const allmenu = await Menu.find({});

//         const categories = await Menu.distinct('category');

//         const snacks = await Menu.find({category:"snacks"})
//         const beverages = await Menu.find({category:"beverages"})

//         // console.log(allmenu);
//         // console.log(categories);

//         res.render("category", {allmenu, categories});

//     } catch (error) {
//         console.log(error)
//     }
   
// }

// controllers/cartController.js

const carts = {};

const addToCart = (req, res) => {
    const item = req.params.item;
    const userID = req.cookies.userID;

    // Add item to the cart
    if (!carts[userID]) {
        carts[userID] = [];
    }
    carts[userID].push(item);

    res.send(`Item ${item} added to cart.`);
};

const getAllMenuItems = async (req, res) => {
    try {
        const allMenuItems = await Menu.find({});
        res.json(allMenuItems); // Return all menu items as JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCartItems = async (req, res) => {
    try {
        const userID = req.cookies.userID;
        const cartItems = carts[userID] || [];
        const items = await Menu.find({ _id: { $in: cartItems } }); // Fetch menu items corresponding to the IDs in the cart
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export { addToCart, getAllMenuItems, getCartItems}