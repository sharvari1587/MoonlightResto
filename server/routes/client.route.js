// client.route.js
import express from "express";
import { addToCart, getAllMenuItems, getCartItems } from "../controllers/client.controller.js"


const client_route = express.Router();

const setUserIDCookie = (req, res, next) => {
    if (!req.cookies.userID) {
        const uniqueID = Math.random() * 16; // Function to generate a unique identifier
        res.cookie('userID', uniqueID, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // Set cookie to expire in 30 days
    }
    next();
};

client_route.get('/add_to_cart', setUserIDCookie, getAllMenuItems);
client_route.post('/add-to-cart/:item', setUserIDCookie, addToCart);
client_route.get('/cart', getCartItems);

export {client_route };
