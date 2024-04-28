const CategoryTag = (props) => {
    return ( 
        <>
            <div className={`border-2 w-fit text-nowrap border-aquamarine py-1 px-5 rounded-full mr-2 ${props.classVars}`} onClick={props.onClick}>
                {props.name}
            </div>
        </> 
    );
}
 
export default CategoryTag;