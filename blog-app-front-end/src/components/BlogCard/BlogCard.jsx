import CategoryTag from "../CategoryTag"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const BlogCard = (post) => {
    
    return ( 
        <Link to={`/blog/${post.props._id}`}>
            <motion.div 
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
                    <div key={`post-${post.props._id}`} 
                        className="from-aquamarine to-peach rounded-lg max-w-sm bg-white shadow"
                        >
                        <img className="rounded-t-lg" src={post.props.image} alt="" />
                        <div className="p-5">
                            <h5 className="text-xl font-bold tracking-tight">{post.props.title}</h5>
                            <div className="ms-[-35px] mb-5 flex flex-wrap"
                            style={{
                                transform: "scale(0.8)"
                            }}>
                                {post.props.categories && 
                                    post.props.categories.map((category)=>{
                                    return <div className="my-2 mr-1" 
                                                key={`${post.props.id}-${category}`} 
                                                >
                                            <CategoryTag name={category} />
                                        </div>
                                })}
                            </div>
                            <div className="px-3 flex">
                                <h1 className="inline-flex items-center py-2 text-sm font-medium text-center text-text-color">
                                    Read more
                                    <i class="bi bi-arrow-right pl-1 pt-0.5"></i>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
     );
}
 
export default BlogCard;