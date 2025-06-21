Book Review Platform Frontend
This project implements the frontend (client-side) as well as the backend(server-side) for a book review platform, built with React. It allows users to browse books, view details, read reviews, and simulate writing their own reviews.


Features
Home Page: Displays a welcoming section and featured books.

Login/Signup Page: Where user can login and signup. If user is already exist then he will log in otherwise firstly register himself.

Book Listing Page: Shows all available books with search and filter functionality (by title, author, and genre).

Individual Book Page: Presents detailed information about a selected book, displays existing reviews, and provides a form to submit new reviews.

User Profile Page: A placeholder for user details and the ability to simulate updating user information.

Responsive UI: Designed to work well on various screen sizes (mobile, tablet, desktop).

Client-Side Routing: Utilizes react-router-dom for seamless navigation between pages.

State Management: Employs React Context API for managing global application state (books data, selected book, user info, loading/error states).

Technologies Used
React.js: The core JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.

React Context API: For application-wide state management.

React Router DOM: For declarative routing within the single-page application.

Error Handling: Enhance error handling to display more user-friendly messages for API failures.


Technologies Used (Backend)
Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

MongoDB: A NoSQL, document-oriented database. It stores data in flexible, JSON-like documents, which is ideal for managing dynamic data like book reviews and user profiles.

Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data, enforcing structure while still leveraging MongoDB's flexibility.

JWT (JSON Web Tokens): For stateless authentication, allowing secure transmission of information between parties as a JSON object.


Users Collection:

Each document represents a registered user.

Fields like username, email, password (hashed), and role (e.g., 'user', 'admin') would be stored

Reviews Collection :

Each document represents a single review.

Fields would include bookId (reference to the Books collection), userId (reference to the Users collection), rating, comment, and timestamp.

This backend setup provides the necessary data storage and API interface for the React frontend to fully function.