import { useContext, useEffect, useState } from 'react'
import LoadingSpinner from '../ExtraComponent/LoadingSpinner'
import ErrorMessage from '../ExtraComponent/ErrorMessage'
import { Context } from '..'
import BookCard from '../ExtraComponent/BookCard';
import { FaPlus } from 'react-icons/fa'; // Optional icon library
import { useNavigate } from 'react-router-dom';

export default function Books() {
    const { loading, error, token } = useContext(Context);
    const navigate = useNavigate();
    const [featuredBooks, setfeaturedBooks] = useState([]);
    const [user,setuser]= useState();


    useEffect(() => {

        const fetchdata = async () => {
            const response = await fetch("http://localhost:5000/users/detail", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                }
            });

            const result = await response.json();
            setuser(result.role);
        }
        fetchdata();
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/books/get-books", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                console.log(result);
                setfeaturedBooks(result);
            } else {
                console.error("Failed to add book:", result.message);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="my-12">
            <h3 className="text-4xl font-bold text-center mb-10 text-gray-800">Featured Books</h3>
            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredBooks.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
            {user==='admin'&&<button
                onClick={() => { navigate('/add-book') }}
                className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors z-50"
                aria-label="Add Book"
            >
                <FaPlus className="text-white text-xl" /> {/* You can replace with: <span className="text-xl font-bold">+</span> */}
            </button>}
        </div>
    )
}
