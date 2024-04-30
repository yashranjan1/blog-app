import { useEffect, useState } from "react";
import CategoryTag from "../CategoryTag";
import axios from "axios";
import BlogCard from "../BlogCard";

const blogCategories = {
    "Programming Languages": false,
    "Web Development": false,
    "Mobile App Development": false,
    "Software Engineering": false,
    "AI": false,
    "Machine Learning": false,
    "Data Science": false,
    "Cybersecurity": false,
    "DevOps": false,
    "Cloud Computing": false,
    "IoT": false,
    "Tech News and Trends": false,
    "Product Reviews": false,
    "Coding Tips and Tricks": false,
    "Game Development": false,
    "AR/VR": false,
    "Tech Events and Conferences": false,
    "Programming Challenges and Solutions": false,
    "Open Source Projects": false,
    "Tech Career and Skills Development": false
  };

const CategoriesPage = () => {

    const [checked, setChecked] = useState(blogCategories);

    const [posts, setPosts] = useState([]);
    
    const getPosts = () => {
        axios.get("http://localhost:3000/api/getPosts")
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err))
    }

    useEffect(_=>{
        getPosts()
    },[])

    const passesFilter = (categories) => {
        if(JSON.stringify(checked) === JSON.stringify(blogCategories)) return true
        for (const cat of categories){
            if (checked[cat]) return true
        }
        return false
    }

    const updateState = (category) => {
        setChecked(prevState => ({
          ...prevState,
          [category]: !prevState[category] // Toggle the value of the category
        }));
      };


    return ( 
        <div className="relative flex-1 flex flex-col mx-56 mt-12 font-montserrat">
            {/* Filter Section */}
            <h1 className="text-5xl font-semibold">Post By Category</h1>
            
            <div className="flex-none relative">   
                <div className="bg-gradient-to-r from-aquamarine to-peach max-w-fit mt-10 py-[3px] px-[3px] rounded-md cursor-pointer" onClick={_=>{
                    var dropdown = document.getElementById("menu")
                    if (dropdown.classList.contains("hidden")) dropdown.classList.remove("hidden")
                    else dropdown.classList.add("hidden")
                }}>
                    <div className="flex flex-row py-1 px-2 rounded-[4px] bg-white">
                        <h1 className="text-lg pe-1 select-none">Filters</h1>
                        <span className="material-symbols-outlined pt-1 select-none">expand_more</span>
                    </div>
                </div>
                <div className="z-10 absolute hidden bg-gradient-to-r from-aquamarine to-peach max-w-fit mt-2  py-[3px] px-[3px] rounded-md" id="menu">
                    <div className="grid grid-cols-3 p-3 rounded-[4px] bg-white">

                    {Object.keys(blogCategories).map((category) => (
                        <div key={category} onClick={() => {
                            updateState(category)
                            }
                        } className="col-span-1 flex py-1 px-1 select-none cursor-pointer">

                            <span className="material-symbols-outlined text-black pr-1" id={`${category}-check`}>
                                {checked[category] ? "check_box" : "check_box_outline_blank"}
                            </span>
                            <h1>{category}</h1>
                        </div>
                    ))}
                    </div>
                </div>
            </div>  
            <div className="bg-white w-100 flex mt-2 flex-wrap">
                {Object.entries(checked).map((entry)=>{
                    if (checked[entry]) return <CategoryTag name={entry} classVars="my-1"/>
                })}
            </div>

            {/* Posts */}
            {/* <div className="flex-1 flex flex-row">
                {posts
                    .filter(post => {
                        // Check if any of the post categories are checked
                        for (const category of post.categories) {
                            if (checked[category]) {
                                return true;
                            }
                        }
                        return false;
                    })
                    .map(filteredPost => {
                        return (
                            <div key={`cat-page-${filteredPost._id}`} className="mr-2 mt-2">
                                <BlogCard props={filteredPost} />
                            </div>
                        );
                    })
                }
            </div> */}
            <div className="flex">
                {
                    posts.filter(post => passesFilter(post.categories)).map( filteredPost => {
                    return (
                            <div key={`post-${filteredPost}`} className="mr-3">
                                <BlogCard props={filteredPost} />
                            </div>
                        )
                    })
                }
            </div>

        </div>   
    );
}
    
export default CategoriesPage;