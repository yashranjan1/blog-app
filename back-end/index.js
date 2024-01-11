const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const BlogPostModel = require('./models/BlogPost')
require('dotenv').config()

// Setup
const app = express()
app.use(cors())
app.use(express.json())

// Connect to mongo 
mongoose.connect(process.env.DATABASE_URL)

app.get("/api/getPosts", (req, res) => {
    BlogPostModel.find({}).then((blogPosts) => {
        res.json(blogPosts)
    }).catch((err) => {
        res.json(err)
    })
})

app.post("/api/createPost", async (req, res) => {
    const post = req.body
    const newBlogPost = new BlogPostModel(post)
    await newBlogPost.save()
    res.json(post)
})

// Run server
app.listen(3000, ()=>{
    console.log("Server is running")
})