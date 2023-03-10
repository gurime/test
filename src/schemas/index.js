import { Schema, model } from 'mongoose';

const postSchema = new Schema({
title: { type: String, required: true },
body: { type: String, required: true },
author: { type: String, required: true },
created_at: { type: Date, default: Date.now }
});

const userSchema = new Schema({
username: { type: String, required: true },
firstName: { type: String, required: true },
lastName: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
confirmPassword: { type: String, required: true },
created_at: { type: Date, default: Date.now }
});

const Post = model('Post', postSchema);
const User = model('User', userSchema);
export { Post, User };

