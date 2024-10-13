import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from ".";
import axios from "axios";
import { useContext, useEffect } from "react";

import Home from "./pages/index";
import Info from "./pages/info/info";
// components
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
// page
import AboutUs from "./pages/about us/index";
import Product from "./pages/product/product";
import New from "./pages/News/new";
import NewDetail from "./pages/News/newDetail";
import ProductDetail from "./pages/product/productDetail";
import ContactUs from "./pages/Contact_us/ContactUs";
import Document from "./pages/Documents/Document";
import DocumentDetail from "./pages/Documents/DocumentDetail";
import Service from "./pages/service/service";
import ServiceDetail from "./pages/service/serviceDetail";
import Solution from "./pages/solution/Solution";
import SolutionDetail from "./pages/solution/SolutionDetail";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/user/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info/:id" element={<Info />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/contact_us" element={<ContactUs />} />

          <Route path="/product" element={<Product />} />
          <Route
            path="/product/product_detail/:id"
            element={<ProductDetail />}
          />

          <Route path="/new" element={<New />} />
          <Route path="/news/news_detail/:id" element={<NewDetail />} />

          <Route path="/document" element={<Document />} />
          <Route path="/document/:id" element={<DocumentDetail />} />

          <Route path="/service" element={<Service />} />
          <Route path="/service/:id" element={<ServiceDetail />} />

          <Route path="/solution" element={<Solution />} />
          <Route path="/solution/:id" element={<SolutionDetail />} />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position="top-center" />
        <Footer />
      </Router>
    </>
  );
}

export default App;
