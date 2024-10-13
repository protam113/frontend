import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/img/logo.svg"
import "../assets/styles/nav.css"
import { IoIosArrowDown } from "react-icons/io"
import { FiList } from 'react-icons/fi'
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { Context } from ".."

const Navbar = () => {
    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(null);  // Thêm trạng thái để lưu thông tin người dùng
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const handleLogout = async () => {
        await axios
            .get("http://localhost:4000/api/user/user/logout", {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
                setUser(null);  // Xóa thông tin người dùng khi đăng xuất
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };

    const navigateTo = useNavigate();

    const goToLogin = () => {
        navigateTo("/login");
    };

    const toggleNavbar = () => {
        setIsMobileNavVisible(!isMobileNavVisible);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (isAuthenticated) {
                try {
                    const { data } = await axios.get("http://localhost:4000/api/user/user/me", {
                        withCredentials: true,
                    });
                    setUser(data.user);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    return (
        <div className="w-full bg-red-600 sticky top-0 z-50">
            <div className="mx-auto flex w-full max-w-7xl justify-between px-8 py-5 text-sm">
                <div className="flex items-center">
                    <section className="mr-10">
                        <a href="/">
                            <img src={Logo} alt="Logo" id="logo" />
                        </a>
                    </section>
                    <section className={`${show ? "navLinks showmenu" : "navLinks"} hidden md:flex flex-1 justify-center items-center`} id="navbar">
                        <Link to="/" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>Home</span>
                            </p>
                        </Link>
                        <Link to="/about_us" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>About Us</span>
                            </p>
                        </Link>
                        <Link to="/product" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>Product</span>
                            </p>
                        </Link>
                        <Link to="/document" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>Document</span>
                                <IoIosArrowDown className='rotate-180 transition-all group-hover:rotate-0' />
                            </p>
                            <div className='absolute right-0 top hidden w-auto flex-col gap-1 rounded-lg bg-red-500 py-3 shadow-md transition-all group-hover:flex'>
                                <Link to="/solution" className='flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-200 hover:text-black' onClick={() => setShow(!show)}>
                                    <span>Solution</span>
                                </Link>
                                <Link to="" className='flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-200 hover:text-black' onClick={() => setShow(!show)}>
                                    <span>Video</span>
                                </Link>
                            </div>
                        </Link>
                        <Link to="/service" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>Services</span>
                            </p>
                        </Link>
                        <Link to="/new" className='relative group px-8 py-3 transition-all' onClick={() => setShow(!show)}>
                            <p className='flex cursor-pointer items-center gap-2 text-neutral-200 group-hover:text-black'>
                                <span>News</span>
                            </p>
                        </Link>
                    </section>
                </div>
                <section className='hidden md:flex items-center space-x-4'>
                    <Link to={"/contact_us"} className='bg-red-200 hover:bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-black hover:text-white'>
                        Contact Us
                    </Link>
                    {isAuthenticated ? (
                        <div className="relative group">
                            <img
                                src={user?.avatar?.url}
                                alt="User Avatar"
                                className="w-12 h-12 object-cover rounded-full cursor-pointer"
                            />
                            <div className="absolute right-0 top-12 hidden w-auto flex-col gap-1 rounded-lg bg-red-500 py-3 shadow-md transition-all group-hover:flex">
                                <button
                                className="px-6 py-2 text-white hover:text-black"
                                onClick={handleLogout}
                                >
                                    LOGOUT
                                </button>
                                <Link
                                to={`/info/${user && user.id}`}
                                className="px-6 py-2 text-white hover:text-black"
                                >
                                Info
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900" 
                            onClick={goToLogin}
                        >
                            LOGIN
                        </button>
                    )}
                </section>
                <FiList className='cursor-pointer text-5xl md:hidden' style={{ color: 'white' }} onClick={toggleNavbar} />
            </div>
            {isMobileNavVisible && (
                <div className="md:hidden flex-col items-center bg-red-600 text-white py-5">
                    <Link to="/" className='block py-2' onClick={() => setShow(!show)}>
                        Home
                    </Link>
                    <Link to="/about_us" className='block py-2' onClick={() => setShow(!show)}>
                        About Us
                    </Link>
                    <Link to="/product" className='block py-2' onClick={() => setShow(!show)}>
                        Product
                    </Link>
                    <Link to="/document" className='block py-2' onClick={() => setShow(!show)}>
                        Document
                    </Link>
                    <Link to="/services" className='block py-2' onClick={() => setShow(!show)}>
                        Services
                    </Link>
                    <Link to="/news" className='block py-2' onClick={() => setShow(!show)}>
                        News
                    </Link>
                    <Link to="/contact_us" className='block py-2' onClick={() => setShow(!show)}>
                        Contact Us
                    </Link>
                    {isAuthenticated ? (
                        <button 
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" 
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <button 
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900" 
                            onClick={goToLogin}
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
