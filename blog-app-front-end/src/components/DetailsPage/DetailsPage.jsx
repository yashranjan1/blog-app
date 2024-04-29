import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import ReactMarkdown from "react-markdown"

const DetailsPage = () => {

    // variable information
    const [postInfo, setPostInfo] = useState({});
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const params = useParams();

    const id = params.id;

    const getPostInformation = (id) => {
        axios.get(`http://localhost:3000/api/getSpecPost/${id}`)
        .then(res => {
            if ( !res.data.name ) {
                setPostInfo(res.data[0])
                const fullDate = new Date(res.data[0].date)
                setMonth(fullDate.getMonth()+1)    
                setYear(fullDate.getFullYear())
                setDay(fullDate.getDate())
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(()=>{
        getPostInformation(id)
    }, [])


    return ( 
        <>
            {  Object.keys(postInfo).length === 0  && 
                <div className="flex-1 flex justify-center items-center">
                     <Loading />
                </div>
            } 

            {
                
                Object.keys(postInfo).length !== 0 && 
                <div className="flex-1 flex flex-col mx-56 mt-16">
                    <img src={postInfo.image} className="rounded-lg"/>
                    <h1 className="text-3xl font-montserrat pt-10 font-semibold text-text-color">{postInfo.title}</h1>
                    <div className="flex flex-row py-4">
                        <span className="material-symbols-outlined flex-none pr-2 text-5xl">account_circle</span>
                        <div className="flex flex-col">
                            <div>
                                {postInfo.author}
                            </div>
                            <div>
                                {`${day}/${month}/${year}`}
                            </div>
                        </div>
                    </div>
                    <ReactMarkdown className="prose-lg font-montserrat prose-headings:font-medium pb-16 w-100">
                        {postInfo.contents}
                    </ReactMarkdown>
                </div>
            }
        </>
     );
}
 
export default DetailsPage;