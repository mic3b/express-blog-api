import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
  content: {
    type: String,
    require: true,
    max: 400,
  },
  author: {
    type: String,
    require: true,
    min: 2,
    max: 50,
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
