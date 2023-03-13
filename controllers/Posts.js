import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const insertPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const _userId = new mongoose.Types.ObjectId(userId);

    const user = await User.findById(_userId);
    const newPost = new Post({
      userId,
      title,
      content,
      author: user.name,
    });
    await newPost.save();

    res.status(201).json({ post: newPost });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const skip = (page - 1) * limit;

    const post = await Post.find().skip(skip).limit(limit);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new mongoose.Types.ObjectId(id);
    const post = await Post.findById({ _id });

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const UpdatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { title: title, content: content }
    );
    res.status(200).json({ message: "Changed" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE
export const DeletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
