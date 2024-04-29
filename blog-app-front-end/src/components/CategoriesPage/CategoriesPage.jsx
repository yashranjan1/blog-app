import { useState } from "react";



const CategoriesPage = () => {

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
    }

    const [checked, setChecked] = useState(blogCategories);
    

    // Set filter
    const [filters, setFilters] = useState([]);

    const [menuState, setMenuState] = useState(false);


    return ( 
        <div className="flex-1 flex flex-col mx-56 mt-12 font-montserrat">
            {/* Filter Section */}
            <h1 className="text-5xl font-semibold">Post By Category</h1>
            <div className="bg-gradient-to-r from-aquamarine to-peach max-w-fit mt-10 py-[3px] px-[3px] rounded-md cursor-pointer" onClick={_=>setMenuState(!menuState)}>
                <div className="w-100 flex flex-row py-1 px-2 rounded-[4px] bg-white">
                    <h1 className="text-lg pe-1 select-none">Filters</h1>
                    <span className="material-symbols-outlined pt-1 select-none">expand_more</span>
                </div>
            </div>

            {
                menuState && 

                <div className="bg-gradient-to-r from-aquamarine to-peach max-w-fit mt-2  py-[3px] px-[3px] rounded-md z-10">
                    <div className="grid grid-cols-3 p-3 rounded-[4px] bg-white">
                        {Object.entries(blogCategories).map((category)=>{
                            return (
                                <div className="col-span-1 flex py-1 px-1 select-none cursor-pointer" key={`${category}`} onClick={_=>{
                                    setChecked(prevState=>({...prevState, [category]: !prevState[category]}))
                                    console.log(checked)
                                }}>
                                    <span className="material-symbols-outlined text-black pr-1" id={`${category}-check`}>
                                        {!checked[category] && "check_box_outline_blank"}
                                        {checked[category] && "check_box"}
                                    </span>
                                    <h1>{category}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            {/* Posts */}
        </div>   
    );
}
    
export default CategoriesPage;