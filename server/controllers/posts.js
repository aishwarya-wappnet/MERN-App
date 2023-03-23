// This file contains logic for all the requests. We do not put this logic directly in the routes file
// Each callback function is going to have a try and catch block

// The below gives us access to the model
import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find() // finding something inside of a model takes time which means it is an async action so for that reason we add await
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// with post request, you have the access to something known as a req.body
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post)
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}