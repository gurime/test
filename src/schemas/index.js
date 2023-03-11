import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const postSchema = new Schema({
title: { type: String, required: true },
body: { type: String, required: true },
created_at: { type: Date, default: Date.now }
});

const userSchema = new Schema({
userName: { type: String, required: true },
firstName: { type: String, required: true },
lastName: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
created_at: { type: Date, default: Date.now }
});

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  }

const Post = model('Post', postSchema);
const User = model('User', userSchema);
export { Post, User };

