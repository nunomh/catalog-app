import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import { v2 as cloudinary } from 'cloudinary';

// Get feed posts
const getFeedPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const following = user.following;
        const posts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in getFeedPosts: ', error.message);
    }
};

// Get post
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in getPost: ', error.message);
    }
};

// Create post
const createPost = async (req, res) => {
    try {
        const { postedBy, text } = req.body;
        let { img } = req.body;

        if (!postedBy || !text) {
            return res.status(400).json({ error: 'postedBy and text are required' });
        }

        const user = await User.findById(postedBy);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized to create post' });
        }

        const maxLength = 500;
        if (text.length > maxLength) {
            return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img);
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            postedBy,
            text,
            img,
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in createPost: ', error.message);
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Unauthorized to delete post' });
        }

        if (post.img) {
            await cloudinary.uploader.destroy(post.img.split('/').pop().split('.')[0]);
        }

        await post.deleteOne();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in deletePost: ', error.message);
    }
};

// Like Unlike post
const likeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            // Unlike post
            await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } });
            res.status(200).json({ message: 'Post unliked successfully' });
        } else {
            // Like post
            await Post.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } });
            res.status(200).json({ message: 'Post liked successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in likeUnlikePost: ', error.message);
    }
};

// Reply to post
const replyToPost = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if (!text) {
            return res.status(400).json({ error: 'Text field is required' });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newReply = {
            userId,
            text,
            userProfilePic,
            username,
        };

        post.replies.push(newReply);
        await post.save();

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in replyToPost: ', error.message);
    }
};

// get user posts
const getUserPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in getUserPosts: ', error.message);
    }
};

export { getFeedPosts, createPost, getPost, deletePost, likeUnlikePost, replyToPost, getUserPosts };
