import { useContext, useState } from "react";
import ErrorMessage from "../ExtraComponent/ErrorMessage";
import { Context } from "..";

const ReviewForm = ({ bookId, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const {book,token }=useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        if (rating === 0) {
            setFormError('Please select a rating.');
            return;
        }
        if (comment.trim().length < 10) {
            setFormError('Comment must be at least 10 characters long.');
            return;
        }

        setSubmitting(true);
        try {
            console.log(book._id);
             const response = await fetch('http://localhost:5000/reviews/add-review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token':token
                    },
                    body: JSON.stringify({ book:book._id, rating, comment})
                });
                const data = await response.json();
                console.log(data);
            setRating(0);
            setComment('');
        } catch (err) {
            setFormError('Failed to submit review.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-8 border border-indigo-200">
            <h4 className="text-2xl font-bold text-gray-800 mb-6">Submit Your Review</h4>
            {formError && <ErrorMessage message={formError} />}

            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">Rating:</label>
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`cursor-pointer text-4xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 transition-colors duration-200`}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <label htmlFor="comment" className="block text-gray-700 text-lg font-semibold mb-2">Your Comment:</label>
                <textarea
                    id="comment"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[100px]"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on this book..."
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                disabled={submitting}
            >
                {submitting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Submitting...
                    </>
                ) : (
                    'Submit Review'
                )}
            </button>
        </form>
    );
};
export default ReviewForm;