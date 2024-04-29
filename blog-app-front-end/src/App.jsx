import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import NavBar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/Home'
import CreatePage from './components/Create'

function App() {

    const [posts, setPosts] = useState([])
    const [featured, setFeatured ] = useState([])

    // Get posts from axios on load
    
    useEffect(() => {   
        async function getPosts() {
            axios.get('http://localhost:3000/api/getPosts')
            .then((posts)=>{
                setPosts(posts.data)
                const featuredPost = posts.data.filter((post)=>post.featured == true)
                var featuredIndex = Math.floor(Math.random() * featuredPost.length);
                setFeatured(featuredPost[featuredIndex])
            }).catch(err => console.log(err))
        }
        getPosts()
    } , [])
    return (
        <>
            <NavBar/>
            <Routes>
                <Route element={<HomePage featured={featured}/>} path='/' />
                <Route element={<HomePage featured={featured}/>} path='/home' />
                <Route element={""} path='/categories'/>
                <Route element={<CreatePage />} path='/create'/>
                <Route element={""} path='/blog/:id'></Route>
            </Routes>
        </>
    )
}

export default App
