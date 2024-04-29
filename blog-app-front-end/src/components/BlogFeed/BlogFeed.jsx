import { useState, useEffect } from "react"
import axios from "axios"
import CategoryTag from "../CategoryTag"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

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
                                <Link to={`/blog/${post._id}`} key={`feed-post-${post._id}`}>
                                    <motion.div 
                                        
                                        class="my-10 mr-4"
                                        whileHover='hover'
                                        variants={{
                                            hover: {
                                                scale: 1.03,
                                            }
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: "backInOut",
                                        }}>
                                        <div class="w-full rounded-lg bg-gradient-to-r from-aquamarine to-peach p-2">
                                            <div key={`post-${post._id}`} 
                                                className="from-aquamarine to-peach rounded-lg max-w-sm bg-white shadow"
                                                >
                                                <img className="rounded-t-lg" src={post.image} alt="" />
                                                <div className="p-5">
                                                    <h5 className="text-xl font-bold tracking-tight">{post.title}</h5>
                                                    <div className="ms-[-35px] mb-5 flex flex-wrap"
                                                    style={{
                                                        transform: "scale(0.8)"
                                                    }}>
                                                        {post.categories && 
                                                            post.categories.map((category)=>{
                                                            return <div className="my-2 mr-1" 
                                                                        key={`${post.id}-${category}`} 
                                                                        >
                                                                    <CategoryTag name={category} />
                                                                </div>
                                                        })}
                                                    </div>
                                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Read more
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default BlogFeed;