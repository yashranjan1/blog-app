import { useState, useEffect } from "react"
import axios from "axios"
import BlogCard from "../BlogCard"

const BlogFeed = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {   
        async function getPosts() {
            axios.get('http://localhost:3000/api/getPosts')
            .then((posts)=>{
                setPosts(posts.data)
            }).catch(err => console.log(err))
        }
        getPosts()
    } , [])

    return ( 
        <>
            <div className="text-text-color font-montserrat w-full min-h-96 bg-white max-h-fit">
                <div className="mx-56 mt-16">
                    <h1 className="text-5xl font-bold">Feed</h1>
                    <div className="flex">
                        {posts.map((post) => {
                            return (
                                <div key={`feed-post-${post._id}`} 
                                className="my-10 mr-4">
                                     <BlogCard props={post}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default BlogFeed;