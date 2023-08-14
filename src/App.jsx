import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import CreationAccount from "./pages/creationAccount/CreationAccount";
import Login from "./pages/login/Login";
import Nofound from "./pages/noFound/NoFound";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/navbar/Navbar";
import Books from "./pages/booksPage/Books";
import BooksList from "./components/booksList/BooksList";
import Disconnected from "./components/disconnected/Disconnected";
import AdminPanel from "./pages/admin/AdminPanel";
import Genre from "./components/genre/Genre";
import AdminCreateBook from "./components/adminCreateBook/AdminCreateBook";
import AdminDeleteBook from "./components/adminDeleteBook/AdminDeleteBook";

import UserProvider from "./context/UserContext";

import "./index.css";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/creationaccount" element={<CreationAccount />} />
          <Route path="*" element={<Nofound />} />
          <Route path="/genres/:id" element={<Genre />} />
          <Route path="/bookslist" element={<BooksList />} />
          <Route path="/disconnected" element={<Disconnected />} />

          <Route path="/admin" element={<Admin />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="books/create" element={<AdminCreateBook />} />
          <Route path="books/delete" element={<AdminDeleteBook />} />
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
