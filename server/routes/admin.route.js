import express from "express";
import { add_menu, admin_login, admin_menu, admin_registration, edit_menu, delete_menu, createOrder, getAllOrders, togglePaymentStatus} from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { uploadToCloudinary } from '../middleware/cloudinary.middleware.js';
 
const admin_route = express.Router();

admin_route.route("/adreg").post(admin_registration);
admin_route.route("/adlogin").post(admin_login);
admin_route.post('/addmenu', upload.single('image'), uploadToCloudinary, add_menu);
admin_route.route("/admin_menu").get(admin_menu);

admin_route.route('/admin_menu/:id').put(edit_menu);
admin_route.route('/admin_menu/:id').delete(delete_menu);

admin_route.post('/orders', createOrder);
admin_route.get('/getorders', getAllOrders);
admin_route.put('/orders/:orderId', togglePaymentStatus);

export {admin_route}