import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import LoadingSpinner from "../ExtraComponent/LoadingSpinner";
import ErrorMessage from "../ExtraComponent/ErrorMessage";
import { useNavigate } from "react-router-dom";

const UserProfilePage = () => {
    const { token, isLoggedIn, error, setLoggedIn, Identity } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setuser] = useState({});
    const [currentUsername, setCurrentUsername] = useState(user.name);
    const [currentEmail, setCurrentEmail] = useState(user.email);
    const [formStatus, setFormStatus] = useState(null); // 'success' or 'error'
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if (!isLoggedIn) {
        navigate('/');
    }

    // Update local state if user context changes
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
            console.log("result", result);
            setuser(result);
        }
        fetchdata();
    }, [token]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setFormStatus(null); 
        setLoading(true);

        if (!currentUsername.trim() || !currentEmail.trim()) {
            setFormStatus({ type: 'error', message: 'Username and Email cannot be empty.' });
            setLoading(false);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(currentEmail)) {
            setFormStatus({ type: 'error', message: 'Please enter a valid email address.' });
            setLoading(false);
            return;
        }

        try {

            const res = await fetch(`http://localhost:5000/users/${Identity}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
                },
                body: JSON.stringify({
                    name: currentUsername,
                    email: currentEmail
                })
            });

        const result = await res.json();
        console.log("result:",result);
        setuser(result);

        } catch (error) {
            setFormStatus({ type: 'error', message: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate('/')} // Mock navigation back to a conceptual home
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium"
            >
                ⬅️ Back to Home
            </button>

            <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">User Profile</h2>

            {loading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {formStatus && (
                <div className={`p-4 rounded-lg mb-6 max-w-lg mx-auto ${formStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {formStatus.message}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg mx-auto">
                <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-800 text-6xl font-bold">
                        {(user?.name?.charAt(0)?.toUpperCase()) || "?"}
                    </div>
                </div>
                {isEditing ? (
                    <form onSubmit={handleUpdateProfile}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 text-lg font-semibold mb-2">Username:</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={currentUsername}
                                onChange={(e) => setCurrentUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                value={currentEmail}
                                onChange={(e) => setCurrentEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => { setIsEditing(false); setCurrentUsername(user.username); setCurrentEmail(user.email); setFormStatus(null); }} // Revert and close
                                className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className="text-center text-gray-800 text-3xl font-semibold mb-4">
                            Welcome, {user.name}!
                        </p>
                        <p className="text-center text-gray-600 text-lg mb-2">
                            Email: {user.email}
                        </p>
                        <div className="text-center">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                            >
                                Edit Profile
                            </button>
                            <br />
                            <button
                                onClick={() => {
                                    // Add your logout logic here
                                    setLoggedIn(false);
                                    navigate('/'); // Optional: redirect to login after logout
                                }}
                                className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300 mt-3"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;