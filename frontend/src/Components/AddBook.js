import { useContext, useState } from "react";
import { Context } from "..";
import LoadingSpinner from "../ExtraComponent/LoadingSpinner";
import ErrorMessage from "../ExtraComponent/ErrorMessage";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const { token, loading, error } = useContext(Context);

    // Form state
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [description, setDescription] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
    const [averageRating, setaverageRating]=useState(0);
    const navigate =useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus(null); // Reset status
        
        // Basic validation
        if (!title || !author || !genre || !publicationYear || !description) {
            setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
            return;
        }
        if (isNaN(publicationYear) || parseInt(publicationYear) <= 0) {
            setFormStatus({ type: 'error', message: 'Publication Year must be a valid number.' });
            return;
        }

        const response = await fetch("http://localhost:5000/books/add-book", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "auth-token":token
            },
            body: JSON.stringify({ title, author, genre,description, publicationYear, averageRating, coverImageUrl}),
        });

        const result = await response.json();
        if (response.ok) {
            navigate('/book')
            console.log("Book added:", result);
        } else {
            console.error("Failed to add book:", result.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate('/book')} // Navigate back to home or a book list
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium"
            >
                ⬅️ Back to Home
            </button>

            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Add New Book</h2>

            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {formStatus && (
                    <div className={`p-4 rounded-lg mb-6 ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {formStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-lg font-semibold mb-2">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="title"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-gray-700 text-lg font-semibold mb-2">Author <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="author"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="genre" className="block text-gray-700 text-lg font-semibold mb-2">Genre <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            id="genre"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="publicationYear" className="block text-gray-700 text-lg font-semibold mb-2">Publication Year <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            id="publicationYear"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={publicationYear}
                            onChange={(e) => setPublicationYear(e.target.value)}
                            min="1" // Years should be positive
                            max={new Date().getFullYear()} // Cannot be in the future
                            required
                        />
                    </div>

<div className="mt-4">
    {/* Rating Field */}
    <label htmlFor="rating" className="block text-gray-700 text-lg font-semibold mb-2">
        Rating According To You (1-5) 
    </label>
    <input
        type="number"
        id="rating"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        value={averageRating}
        onChange={(e) => setaverageRating(e.target.value)}
        min="1"
        max="5"
        required
    />
</div>

                    <div>
                        <label htmlFor="description" className="block text-gray-700 text-lg font-semibold mb-2">Description <span className="text-red-500">*</span></label>
                        <textarea
                            id="description"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-y min-h-[120px]"
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Provide a brief description of the book..."
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="coverImageUrl" className="block text-gray-700 text-lg font-semibold mb-2">Cover Image URL (Optional)</label>
                        <input
                            type="url"
                            id="coverImageUrl"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            value={coverImageUrl}
                            onChange={(e) => setCoverImageUrl(e.target.value)}
                            placeholder="e.g., https://example.com/cover.jpg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                Adding Book...
                            </>
                        ) : (
                            'Add Book'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddBook;