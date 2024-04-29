const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const BlogPostModel = require('./models/BlogPost')
const bodyParser = require("body-parser");
require('dotenv').config()

// Setup
const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// Connect to mongo
mongoose.connect(process.env.DATABASE_URL)

app.get("/api/getPosts", (req, res) => {
    BlogPostModel.find({}).then((blogPosts) => {
        res.json(blogPosts)
    }).catch((err) => {
        res.json(err)
    })
})

app.get("/api/getSpecPost/:id", (req, res) => {
    var id = req.params.id
    BlogPostModel.find({_id : id }).then((blogPost) => {
        res.json(blogPost)
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
    console.log("Server is running on port 3000")
})
