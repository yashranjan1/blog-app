import { useEffect, useState } from "react";
import CategoryTag from "../CategoryTag";
import ImageInput from "../ImageInput";
import { AnimatePresence, motion, spring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";
import store from "../../store";
import ReactMarkdown from 'react-markdown'
import axios from "axios";

const validator = (title, content, selected, author, image) => {
    var bad_fields = []
    if (title === "") bad_fields.push("title")
    if (content === "") bad_fields.push("content")
    if (selected.length == 0) bad_fields.push("selected")
    if (author === "") bad_fields.push("author")
    if (image === "") bad_fields.push("image")
    return bad_fields
}


const CreatePage = () => {

    const navigate = useNavigate()
    const snap = useSnapshot(store)

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [selected, setSelected] = useState([])
    const [featured, setFeatured] = useState(false)
    const [author, setAuthor] = useState("")

    const [preview, setPreview] = useState(false)
    const [errors, setErrorField] = useState(false)
    const [posted, setPosted] = useState(false)

    const togglePreview = () => {
        setPreview(!preview)
    }
    const blogCategories = [
        "Programming Languages",
        "Web Development",
        "Mobile App Development",
        "Software Engineering",
        "AI",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "DevOps",
        "Cloud Computing",
        "IoT",
        "Tech News and Trends",
        "Product Reviews",
        "Coding Tips and Tricks",
        "Game Development",
        "AR/VR",
        "Tech Events and Conferences",
        "Programming Challenges and Solutions",
        "Open Source Projects",
        "Tech Career and Skills Development"
    ];

    const validation_executor = (bad_fields) => {
        if (bad_fields.length == 0){
            // Submit
            setErrorField(false)
            var packet = {
                title: title,
                contents: content,
                image: snap.image64,
                categories: selected,
                featured: featured,
                author: author,
                date: new Date().toJSON()
            }
            axios.post("http://localhost:3000/api/createPost", packet)
            .then()
            .catch(err => console.log(err))
            setPosted(true)
            setTimeout(()=>{
                navigate("/home")
            }, 2000)
        }
        else {
            // Throw a fit
            setErrorField(true)
        }        
    }    
  
    return ( 
        <>
            <div className="flex flex-col grow bg-gradient-to-r from-aquamarine to-peach px-52 py-2 z-0">
                <div className="text-5xl font-bold text-slate-50 pt-8">Create a post</div>
                <div className="w-full bg-white rounded-xl font-montserrat px-16 py-12 my-8 drop-shadow-xl">
                    <div className="text-5xl font-semibold" >Title:</div>
                    <input type="text" className="border-[1.5px] border-black rounded-lg text-3xl w-full py-1 px-3 outline-none mt-5" onChange={(e)=>setTitle(e.target.value)}/>
                    <div className="text-5xl font-semibold mt-10">Content:</div>
                    <div className="text-md font-normal italic ">This text field uses markdown for formatting</div>
                    <textarea className="w-full border-[1.5px] border-black rounded-lg mt-5 p-2" rows={10} onChange={(e)=>setContent(e.target.value)}/>
                    <div className="text-5xl font-semibold mt-10">Select Categories:</div>
                    <div className="flex flex-wrap w-full mt-3">
                        {
                            blogCategories.map((category) => {
                                return (
                                    <div key={category} className="py-2">
                                        <CategoryTag 
                                        name={category} 
                                        onClick={(e)=>{
                                            const classlist = e.target.classList
                                            if (classlist.contains('bg-aquamarine')) {
                                                classlist.remove('bg-aquamarine')
                                                const remSelect = selected.filter((item)=>item != e.target.innerText)
                                                setSelected(remSelect)
                                            }
                                            else {
                                                classlist.add('bg-aquamarine')
                                                setSelected([...selected, e.target.innerText])
                                            }
                                        }}  
                                        classVars={'cursor-pointer select-none'}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="text-5xl font-semibold mt-10">Thumbnail:</div>
                        <ImageInput />
                    <div className="text-5xl font-semibold mt-10">Author:</div>
                    <input type="text" className="border-[1.5px] border-black rounded-lg text-3xl w-full py-1 px-3 outline-none mt-5" onChange={(e)=>setAuthor(e.target.value)} />
                    <div className="flex mt-10">
                        <div className="text-lg mt-1">Do you want this article to be featured?</div>
                        <div 
                        className={`w-20  shadow-inner-xl rounded-full mx-2 cursor-pointer flex ${featured ? 'justify-end bg-gradient-to-r from-aquamarine to-peach' : 'justify-start bg-slate-400/40'}`}
                        onClick={()=>setFeatured(!featured)}
                        >
                            <motion.div 
                            layout 
                            transition={spring}
                            className="h-5 w-5 m-2 bg-white rounded-full drop-shadow-xl">
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="cursor-pointer select-none mt-5 mr-4 border-2 w-fit border-black py-3 px-6 rounded-3xl font-medium" onClick={togglePreview}>
                            Preview
                        </div>
                        <div className="cursor-pointer select-none mt-5 border-2 w-fit border-black py-3 px-6 rounded-3xl font-medium" onClick={
                            ()=>{
                                var bad_fields = validator(title, content, selected, author, snap.image64)
                                validation_executor(bad_fields)
                            }
                        }>
                            Submit
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview */}
            <AnimatePresence>
                {preview && 
                
                <motion.div className="fixed w-full flex items-center justify-center h-screen">
                    <div className="w-full h-screen bg-black/30 z-10 absolute" onClick={togglePreview}></div>
                    <div className="flex h-[80%] grow items-center justify-center">
                        <div className="w-10/12 bg-white z-20 min-h-96 max-h-full rounded-xl py-10 px-20 border-[20px] border-white overflow-y-auto">
                            

                                <img src={snap.image64} className="w-full" />
                                <div className="text-5xl font-medium py-10">{title}</div>
                                <ReactMarkdown className="prose font-montserrat prose-headings:font-medium">
                                    {content}
                                </ReactMarkdown>
                            
                        </div>
                    </div>
                </motion.div>
                
                }
            </AnimatePresence>
            {/* Post confirmation */}
            <AnimatePresence>
                {posted && 
                
                <motion.div className="fixed w-full flex items-center justify-center h-screen">
                    <div className="w-full h-screen bg-black/30 z-10 absolute"></div>
                    <div className="flex h-[80%] grow items-center justify-center">
                        <div className="w-4/12 bg-white z-20 min-h-[50vh] max-h-full rounded-xl py-10 px-20 border-[20px] border-white overflow-y-auto">
                            <span class="material-symbols-outlined text-[330px] text-center">check_circle</span>
                            <p className="text-center text-lg font-bold mt-2">Your blog has been posted!</p>
                        </div>
                    </div>
                </motion.div>
                
                }
            </AnimatePresence>
        </>
     );
}
 
export default CreatePage;