import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Books from './Components/Books';
import AddBook from './Components/AddBook';
import BookDetails from './Components/BookDetails';
import UserProfilePage from './Components/UserProfilePage';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<Books />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/user_profile" element={<UserProfilePage />} />
          {/* <Route path="*" element={<NotFound />} />  */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;