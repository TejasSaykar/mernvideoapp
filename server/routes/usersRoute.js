import express from "express"
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

// update user
router.put("/update/:id", verifyToken, updateUser);

// Delete user
router.delete("/delete/:id", verifyToken, deleteUser);

// Get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

// like a user
router.put("/like/:videoId", verifyToken, like);

// dislike a user
router.put("/dislike/:videoId", verifyToken, dislike);



export default router;
