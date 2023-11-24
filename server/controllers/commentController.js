import { Comment } from '../models/comment.js'
import { Video } from '../models/videoModel.js'


// Add comment
export const addComment = async (req, res) => {
    const newComment = new Comment({ userId: req.user.id, videoId: req.params.videoId, ...req.body });
    try {
        const savedComment = await newComment.save();
        res.status(201).json({
            success: true,
            message: "Comment successfull",
            savedComment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while commenting",
            error
        })
    }
}


// delete comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id);
            res.status(201).json({
                success: true,
                message: "Comment has been deleted",
                comment
            });
        } else {
            res.status(404).json("You can only delete your comments!")
        }
        res.sta
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while deleting the comment",
            error
        })
    }
}


// get comment
export const getComment = async (req, res) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(201).json({
            commentCount: comments.length,
            success: true,
            message: "Getting the comments",
            comments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the comments",
            error
        })
    }
}