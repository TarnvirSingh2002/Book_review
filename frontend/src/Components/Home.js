import { useNavigate } from "react-router-dom";
import BookCard from "../ExtraComponent/BookCard";
import LoadingSpinner from "../ExtraComponent/LoadingSpinner";
import ErrorMessage from "../ExtraComponent/ErrorMessage";
import { useContext } from "react";
import { Context } from "../index";

const Home = () => {
    const {loading, error } = useContext(Context);

    const books=[
                    {
                        id: 'b1',
                        title: 'The Great Gatsby',
                        author: 'F. Scott Fitzgerald',
                        genre: 'Classic',
                        publicationYear: 1925,
                        description: 'A novel about the roaring twenties.',
                        averageRating: 4.2,
                        coverImageUrl: 'https://placehold.co/150x225/4A5568/FFFFFF?text=Gatsby',
                        reviews: [
                            { id: 'r1', userId: 'u1', username: 'ReaderOne', rating: 5, comment: 'Absolutely brilliant!' },
                            { id: 'r2', userId: 'u2', username: 'Bookworm', rating: 4, comment: 'A classic for a reason.' },
                        ]
                    },
                    {
                        id: 'b2',
                        title: '1984',
                        author: 'George Orwell',
                        genre: 'Dystopian',
                        publicationYear: 1949,
                        description: 'A dystopian social science fiction novel.',
                        averageRating: 4.7,
                        coverImageUrl: 'https://placehold.co/150x225/2D3748/FFFFFF?text=1984',
                        reviews: [
                            { id: 'r3', userId: 'u3', username: 'FutureFan', rating: 5, comment: 'Mind-bending and timely.' },
                            { id: 'r4', userId: 'u1', username: 'ReaderOne', rating: 4, comment: 'A must-read for everyone.' },
                        ]
                    },
                    {
                        id: 'b3',
                        title: 'To Kill a Mockingbird',
                        author: 'Harper Lee',
                        genre: 'Classic',
                        publicationYear: 1960,
                        description: 'A novel about the serious issues of rape and racial inequality.',
                        averageRating: 4.5,
                        coverImageUrl: 'https://placehold.co/150x225/718096/FFFFFF?text=Mockingbird',
                        reviews: [
                            { id: 'r5', userId: 'u4', username: 'LitLover', rating: 5, comment: 'Deeply moving and impactful.' },
                        ]
                    },
                    {
                        id: 'b4',
                        title: 'Dune',
                        author: 'Frank Herbert',
                        genre: 'Science Fiction',
                        publicationYear: 1965,
                        description: 'Set in the distant future amidst a feudal interstellar society.',
                        averageRating: 4.6,
                        coverImageUrl: 'https://placehold.co/150x225/2F4F4F/FFFFFF?text=Dune',
                        reviews: [
                            { id: 'r6', userId: 'u5', username: 'SciFiGeek', rating: 5, comment: 'Epic world-building!' },
                            { id: 'r7', userId: 'u2', username: 'Bookworm', rating: 4, comment: 'A bit dense but rewarding.' },
                        ]
                    },];
    const navigate=useNavigate();

    const featuredBooks = books.slice(0, 3); // Get top 3 as featured

    return (
        <div className="container mx-auto p-6">
            <section className="text-center my-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg shadow-xl">
                <h2 className="text-5xl font-extrabold mb-4">Discover Your Next Favorite Book!</h2>
                <p className="text-xl mb-6">Explore, review, and rate books with our vibrant community.</p>
                <button
                    onClick={() => navigate('book')}
                    className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300 transform hover:scale-105"
                >
                    Browse All Books
                </button>
            </section>

            <section className="my-12">
                <h3 className="text-4xl font-bold text-center mb-10 text-gray-800">Featured Books</h3>
                {loading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredBooks.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};
export default Home;

