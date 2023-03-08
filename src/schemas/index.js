import { Schema, model } from 'mongoose';

const postSchema = new Schema({
title: { type: String, required: true },
body: { type: String, required: true },
author: { type: String, required: true },
created_at: { type: Date, default: Date.now }
});

const Post = model('Post', postSchema);

export default Post;
