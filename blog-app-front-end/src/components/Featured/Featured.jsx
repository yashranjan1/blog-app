import { useState, useEffect } from "react"
import Loading from "../Loading";
import { motion } from "framer-motion";
import CategoryTag from "../CategoryTag";

const Featured = (props) => {    
    
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    // set date 
    useEffect(() => {
        const fullDate = new Date(props.featured.date)
        setDay(fullDate.getDay())
        setMonth(fullDate.getMonth()+1)    
        setYear(fullDate.getFullYear())
    },[props.featured])
    console.log()
    return ( 
        <>
            <div className="text-text-color font-montserrat flex flex-col w-full bg-gradient-to-r from-aquamarine to-peach pt-10 pb-10 px-12 sm:px-24 md:px-56">
                <div className="text-5xl font-bold text-slate-50">Featured</div>
                    {props.featured &&
                        <motion.div 
                        className="bg-white w-full rounded-lg my-10"
                        whileHover='hover'
                        variants={{
                            hover: {
                                scale: 1.05,
                            }
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "backInOut",
                        }}>
                            <div className="flex flex-col">
                                <div 
                                style={{
                                    backgroundImage: `url(${props.featured.image})`,
                                    backgroundPosition: "center center"
                                }} 
                                className="h-featured rounded-t-lg"/>
                                <div className="flex flex-col px-14 py-10">
                                    <div className="font-semibold text-4xl">{props.featured.title}</div>
                                    {props.featured.categories && props.featured.categories.map((category)=>{
                                        return <CategoryTag name={category} key={`${props.featured.id}-${category}`} />
                                    })}
                                    <div className="flex mt-10 w-full text-right">
                                        <div className="flex-1">
                                            <div>
                                                {props.featured.author}
                                            </div>
                                            <div>
                                                {`${day}/${month}/${year}`}
                                            </div>
                                        </div>
                                        <span className="material-symbols-outlined flex-none pl-4 text-5xl">account_circle</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    }
                    {!props.featured &&
                        <div className="flex justify-center items-center bg-white w-full rounded-lg h-96">
                            <Loading />      
                        </div>                  
                    }
            </div>
        </>
     );
}
 
export default Featured;