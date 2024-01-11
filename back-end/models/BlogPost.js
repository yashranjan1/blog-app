const mongoose = require("mongoose")

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
    // look into adding images to mongodb
})

const BlogPostModel = mongoose.model("blog-contents", BlogPostSchema)
module.exports = BlogPostModel;