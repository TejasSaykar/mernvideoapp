import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { addComment, deleteComment, getComment } from '../controllers/commentController.js';

const router = express.Router();

// Add comment
router.post("/add-comment/:videoId", verifyToken, addComment);

// delete comment
router.delete("/delete/:id", verifyToken, deleteComment);

// get comment
router.get("/get/:videoId", verifyToken, getComment)

export default router;