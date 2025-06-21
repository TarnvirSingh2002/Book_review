import { useContext, useEffect, useState } from "react";
import ErrorMessage from "../ExtraComponent/ErrorMessage";
import LoadingSpinner from "../ExtraComponent/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import GenreTag from "../ExtraComponent/GenreTag";
import StarRating from "../ExtraComponent/StarRating";
import ReviewForm from "./ReviewForm";


const BookDetailPage = () => {
    const { book, addReviewToBook, updateBookRating, user, error, setError } = useContext(Context);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);


    //doing
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookId = book._id;
                const response = await fetch(`http://localhost:5000/reviews/get-reviews?bookId=${encodeURIComponent(bookId)}`, {
                    method: 'GET',
                });

                const data = await response.json();
                setReviews(data);
                console.log('Response:', data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchData();
    }, [book._id])

    const navigate = useNavigate();
    useEffect(() => {
        if (!book) {
            console.warn("No book selected. In a full app, this would redirect.");
        }
    }, [book]);

    if (!book) {
        return <LoadingSpinner />; // Or a custom message/error
    }

    const handleReviewSubmit = async (newReview) => {
        setLoading(true);
        setError(null);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const reviewWithId = {
                id: `r${Date.now()}`, // Unique ID for mock
                userId: user.id,
                username: user.username,
                ...newReview
            };
            addReviewToBook(book.id, reviewWithId);
            updateBookRating(book.id); // Update average rating after adding review
            setShowReviewForm(false);
        } catch (err) {
            setError('Failed to submit review. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate('/book')}
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium"
            >
                ⬅️ Back to Books
            </button>

            {/* {loading && <LoadingSpinner />} */}
            {error && <ErrorMessage message={error} />}

            <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col md:flex-row items-start md:space-x-8 mb-10">
                <img
                    src={book.coverImageUrl}
                    alt={book.title}
                    className="w-48 h-72 object-cover object-center rounded-lg shadow-md mb-6 md:mb-0"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/192x288/E2E8F0/4A5568?text=${book.title.substring(0, 8)}...`; }}
                />
                <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h2>
                    <h3 className="text-2xl text-indigo-700 font-semibold mb-4">by {book.author}</h3>
                    <div className="flex items-center mb-4">
                        <StarRating rating={book.averageRating} />
                        <span className="ml-3 text-gray-600 text-lg">({book.averageRating} / 5 stars)</span>
                    </div>
                    <p className="text-gray-700 mb-4">
                        <span className="font-semibold">Genre:</span> <GenreTag genre={book.genre} /> | <span className="font-semibold">Published:</span> {book.publicationYear}
                    </p>
                    <p className="text-gray-800 leading-relaxed text-lg">{book.description}</p>
                </div>
            </div>

            <section className="my-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold text-gray-800">
                        Reviews ({reviews?.length || 0})
                    </h3>
                    <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                    >
                        {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                    </button>
                </div>

                {showReviewForm && (
                    <ReviewForm bookId={book.id} onSubmit={handleReviewSubmit} />
                )}

                {(reviews?.length || 0) === 0 ? (
                    <p className="text-center text-gray-600 text-lg py-8">
                        No reviews yet. Be the first to review this book!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {reviews?.map((review) => (
                            <div
                                key={review.id}
                                className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center mb-3">
                                    <StarRating rating={review.rating} />
                                    <span className="ml-3 font-semibold text-gray-800">
                                        {review.user.name}
                                    </span>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
};
export default BookDetailPage;