import { Link } from "react-router-dom";

const NavBar = () => {
    return ( 
        <nav className="w-full bg-white flex px-12 sm:px-20 md:px-52 pt-1 pb-3 drop-shadow-xl">
            <div className="font-mono text-3xl text-text-color font-light mr-10">
                <img src="../src/assets/logo.png" className="max-w-16" />
            </div>
            <div className="hidden sm:flex items-center font-montserrat text-text-color font-medium text-lg mt-1.5">
                <Link to="/home" className="mr-10">Home</Link>
                <Link to="/categories" className="mr-10">Categories</Link>
                <Link to="/create" className="mr-10">Create</Link>
            </div>
        </nav>
     );
}
 
export default NavBar;