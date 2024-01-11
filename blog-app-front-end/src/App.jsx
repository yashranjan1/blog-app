import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

    const [posts, setPosts] = useState([])
    
    // Get posts from axios on load
    axios.get('http://localhost:3000/api/getPosts')
    .then((posts)=>{
        setPosts(posts.data)
    }).catch(err => console.log(err))
    

    return (
        <>
            {posts.map((post)=>{
                return (
                    <div key={post.id}>
                        <div>{post.title}</div>
                        <div>{post.contents}</div>
                        <div>{post.author}</div>
                        <div>{post.date}</div>
                    </div>
                )
            })}
        </>
    )
}

export default App
