import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import CreationAccount from "./pages/creationAccount/CreationAccount";
import Login from "./pages/login/Login";
import Nofound from "./pages/noFound/NoFound";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Books from "./pages/booksPage/Books";
import BooksList from "./components/booksList/BooksList";
import Disconnected from "./components/disconnected/Disconnected";
import AdminPanel from "./pages/admin/AdminPanel";
import Genre from "./components/genre/Genre";
import AdminCreateBook from "./components/adminCreateBook/AdminCreateBook";
import AdminDeleteBook from "./components/adminDeleteBook/AdminDeleteBook";
import AdminUpdateGenre from "./components/adminUpdateGenre/UpdateGenre";

import UserProvider from "./context/UserContext";
import BooksProvider from "./context/BooksContext";

import "./index.css";

const ProtectedAdminRoute = ({ element }) => {
  const { admin } = useUser();
  const adminJwt = localStorage.getItem("adminJwt"); // Récupère le JWT de l'admin depuis le local storage

  if (!admin || !adminJwt) {
    return <Navigate to="/"/>;
  }

  return element;
};

const App = () => {
  return (
    <div>
      <UserProvider>
        <BooksProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/books" element={<Books />} />
            <Route path="/login" element={<Login />} />
            <Route path="/creationaccount" element={<CreationAccount />} />
            <Route path="*" element={<Nofound />} />
            <Route path="/genres/:genreId" element={<Genre />} />
            <Route path="/bookslist" element={<BooksList />} />
            <Route path="/disconnected" element={<Disconnected />} />

            <Route path="/admin" element={<Admin />} />
            <Route
              path="/adminPanel"
              element={<ProtectedAdminRoute element={<AdminPanel />} />}
            />
            <Route
              path="/admin/create"
              element={<ProtectedAdminRoute element={<AdminCreateBook />} />}
            />
            <Route
              path="/admin/delete"
              element={<ProtectedAdminRoute element={<AdminDeleteBook />} />}
            />
            <Route
              path="/admin/update/genre/:id"
              element={<ProtectedAdminRoute element={<AdminUpdateGenre />} />}
            />
          </Routes>
        </BooksProvider>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
