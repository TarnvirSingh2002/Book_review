import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../index";

const Header = () => {
    const navigate = useNavigate();
    const {isLoggedIn,setLoggedIn}=useContext(Context)

    return (
        <header className="bg-indigo-700 text-white p-4 shadow-md rounded-b-lg">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">
                    <button onClick={() => navigate('/')} className="hover:text-indigo-200 transition duration-300">
                        BookReviewHub
                    </button>
                </h1>
                <ul className="flex space-x-6 text-lg">
                    <li>
                        <button onClick={() => navigate('/')} className="hover:text-indigo-200 transition duration-300">
                            Home
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('book')} className="hover:text-indigo-200 transition duration-300">
                            Books
                        </button>
                    </li>
                    <li>

                        {isLoggedIn ? (
                                <button
                                    onClick={()=>{navigate('/user_profile')}}
                                    className="hover:text-indigo-200 transition duration-300"
                                >
                                    <span className="text-2xl" title="Logged in user">👤</span>
                                    {/* Logout */}
                                </button>
                                
                        ) : (
                            <button
                                onClick={()=>{navigate("/login")}}
                                className="hover:text-indigo-200 transition duration-300"
                            >
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;