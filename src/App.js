import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import CreationAccount from "./pages/creationAccount/CreationAccount";
import Livres from "./pages/livres/Livres";
import Login from "./pages/login/Login";
import Nofound from "./pages/noFound/NoFound";
import Admin from "./pages/admin/Admin";
import Navbar from "./components/navbar/Navbar";
import BooksList from "./components/booksList/BooksList";
import Disconnected from "../src/components/disconnected/Disconnected";
import UserProvider from "./context/UserContext";
import AdminPanel from "./pages/admin/AdminPanel";

import "./index.css";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/creationaccount" element={<CreationAccount />} />
          <Route path="/livres" element={<Livres />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nofound" element={<Nofound />} />
          <Route path="/bookslist" element={<BooksList />} />
          <Route path="/disconnected" element={<Disconnected />} />

          <Route path="/admin" element={<Admin />}>
            <Route index element={<AdminPanel />} />
          </Route>
        </Routes>
      </UserProvider>
    </div>
  );
};

export default App;
