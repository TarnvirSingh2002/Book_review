import { useNavigate } from "react-router-dom";
import GenreTag from "./GenreTag";
import StarRating from "./StarRating";
import { useContext } from "react";
import { Context } from "..";

const BookCard = ({ book }) => {
    const navigate=useNavigate();
    const {setBook}=useContext(Context);

    const handleClick=()=>{
        setBook(book);
        navigate(`/books/${book._id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
        >
            <img
                src={book.coverImageUrl}
                alt={book.title}
                className="w-full h-64 object-cover object-center rounded-t-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x225/E2E8F0/4A5568?text=${book.title.substring(0, 8)}...`; }}
            />
            <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h4>
                <p className="text-indigo-600 font-medium mb-3">{book.author}</p>
                <div className="flex items-center mb-3">
                    <StarRating rating={book.averageRating} />
                    <span className="ml-2 text-gray-600 text-sm">({book.averageRating})</span>
                </div>
                <p className="text-gray-700 text-sm line-clamp-3">{book.description}</p>
                <div className="flex flex-wrap mt-2">
                    <GenreTag genre={book.genre} />
                </div>
            </div>
        </div>
    );
};

export default BookCard;