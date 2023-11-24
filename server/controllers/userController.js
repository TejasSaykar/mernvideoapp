import { User } from '../models/userModel.js'
import { Video } from '../models/videoModel.js'

export const updateUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });
            res.status(201).json({
                success: true,
                message: "User updated successfully",
                updateUser
            })
        } catch (error) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: "Error while updating the user",
                error
            })
        }
    } else {
        return res.status(500).json({
            success: false,
            message: "You can update only your account!",
        })
    }
}
export const deleteUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.status(201).json({
                success: true,
                message: "User deleted succssfully",
                deletedUser
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({
                success: false,
                message: "Error while deleting the user",
                error
            })
        }
    } else {
        res.status(500).json("You can delete only your account!");
    }
}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(402).json("User not found!");
        res.status(201).json({
            success: true,
            message: "User get successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the user",
            error
        })
    }
}
export const subscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(201).json({
            success: true,
            message: "Subscription successfull"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while subscribe",
            error
        })
    }
}
export const unsubscribe = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(201).json({
            success: true,
            message: "Unsubscription successfull"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while unsubscribe",
            error
        })
    }
}
export const like = async (req, res) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id }
        });
        res.status(201).json({
            success: true,
            message: "Video liked success",
            video
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while like the video",
            error
        })
    }
}
export const dislike = async (req, res) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        const video = await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        res.status(201).json({
            success: true,
            message: "Video dislike success",
            video
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while dislike the video",
            error
        })
    }
}