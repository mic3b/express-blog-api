import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  insertPost,
  getPosts,
  getUserPosts,
  UpdatePost,
  getPost,
  DeletePost,
} from "../controllers/Posts.js";

const router = express.Router();

// Example url for page 1:localhost:3001/posts?page=1&limit=10
// Example url for page 2:localhost:3001/posts?page=2&limit=10
router.get("/", verifyToken, getPosts);

router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/get/:id", verifyToken, getPost);
router.post("/add", verifyToken, insertPost);
router.post("/:id", verifyToken, UpdatePost);
router.delete("/:id", verifyToken, DeletePost);

export default router;
