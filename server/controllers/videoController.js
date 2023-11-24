import { Video } from "../models/videoModel.js"
import { User } from "../models/userModel.js"


// Add videos
export const addVideo = async (req, res) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(201).json({
            success: true,
            message: "Video added successfully",
            savedVideo
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while adding video",
            error
        })
    }
}

// Update video
export const updateVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(201).json({
                success: true,
                message: "Video updated successfully",
                updatedVideo
            })
        } else {
            return res.status(401).json("You can update only your vidoes");
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while updating the video",
            error
        })
    }
}

// Delete video
export const deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json("Video not found");
        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);
            res.status(201).json({
                success: true,
                message: "Video deleted successfully",
                video
            })
        } else {
            res.status(401).json("You can delete only your video!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while deleting the video",
            error
        })
    }
}


// Get video
export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        return res.status(201).json({
            success: true,
            message: "Video get successfully",
            video
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the video",
            error
        })
    }
}


// Views of the video
export const addViews = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        }, { new: true });
        res.status(201).json({
            success: true,
            message: "Views has been increased",
            views: video.views
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while increase the view",
            error
        })
    }
}

// Get random videos
export const random = async (req, res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(201).json({
            success: true,
            message: "Videos getting successfully",
            videos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting random videos",
            error
        })
    }
}


// Get trending videos
export const trending = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(201).json({
            success: true,
            message: "Trending videos are getting",
            videos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting trending videos",
            error
        })
    }
}


// Get subscribed videos
export const subscibedVideo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const videos = await Promise.all(
            subscribedChannels.map((channelId) => {
                return Video.find({ userId: channelId });
            })
        )
        res.status(201).json({
            success: true,
            message: "Videos are getting",
            videos: videos.flat().sort((a, b) => b.createdAt - a.createdAt)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the subscribed videos",
            error
        })
    }
}

// Get by Tag
export const getByTag = async (req, res) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(201).json({
            success: true,
            message: "Videos are getting by tags",
            videos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting video",
            error
        })
    }
}


// Search by title
export const search = async (req, res) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        res.status(201).json({
            success: true,
            message: "Video getting",
            videos
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while searching the video",
            error
        })
    }
}