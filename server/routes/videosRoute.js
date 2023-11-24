import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { addVideo, addViews, deleteVideo, getByTag, getVideo, random, search, subscibedVideo, trending, updateVideo } from '../controllers/videoController.js';
const router = express.Router();


// add video
router.post("/create", verifyToken, addVideo);

// update video
router.put("/update/:id", verifyToken, updateVideo);

// delete video
router.delete("/delete/:id", verifyToken, deleteVideo);

// get video
router.get("/get/:id", getVideo);

// views 
router.put("/views/:id", addViews);

// trending videos
router.get("/trending", trending);

// random
router.get("/random", random);

// subscribed channel Videos
router.get("/subVideo", verifyToken, subscibedVideo);

// Get by tags
router.get("/tags", getByTag);

// Search by title
router.get("/search", search)


export default router;