import BlogFeed from "../BlogFeed";
import Featured from "../Featured";

const HomePage = (props) => {
    return ( 
        <>
            <Featured featured={props.featured}/>
            <BlogFeed />
        </>
     );
}
 
export default HomePage;