import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from "../components/Hero";
import Info from "../components/info";
import Contact from "../components/Contact";
import About from "../components/About";
import Depaerments from "../components/Depaerments";
import ReSer from '../components/recentSer';
import ReNew from '../components/recentNew';
import Sidebar from '../components/Sidebar';

function Home() {
    const [slogan, setSlogan] = useState('');

    const fetchSlogan = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/info/6653de4fc331853f432df898');
            setSlogan(res.data.slogan);
        } catch (error) {
            console.error('Error fetching slogan:', error);
        }
    };

    useEffect(() => {
        fetchSlogan();
    }, []);

    return (
        <div>
            {/* Bố cục cho màn hình lớn hơn (máy tính để bàn) */}
            <div className="hidden md:flex flex-col md:flex-row min-h-screen">
                <div className="md:w-1/4">
                    <Sidebar />
                </div>
                <div className="md:w-3/4 w-full p-4">
                    <section className="w-full flex-center flex-col mt-16">
                        <h1 className="head_text text-center mb-4">
                            Điện Tự Động Hóa
                            <br className="max-md:hidden" />
                            <span className="red_gradient text-center">
                                Song Nhat Nguyen
                            </span>
                        </h1>
                        {slogan && (
                            <p className="desc text-center mb-8">
                                {slogan}
                            </p>
                        )}
                        <div className="mb-12">
                            <Hero />
                        </div>
                        <div className="mb-24">
                            <ReSer />
                        </div>
                        <div className="mb-24">
                            <Info />
                        </div>
                        <div className="mb-24">
                            <ReNew />
                        </div>
                        <div className="mb-12">
                            <Depaerments />
                        </div>
                        <div className="mb-12">
                            <About />
                        </div>
                        <div className="mb-12">
                            <Contact />
                        </div>
                    </section>
                </div>
            </div>

            {/* Bố cục cho màn hình nhỏ hơn (điện thoại di động) */}
            <div className="md:hidden flex flex-col min-h-screen">
                <section className="w-full flex-center flex-col mt-16">
                    <h1 className="head_text text-center mb-4">
                        Điện Tự Động Hóa
                        <br className="max-md:hidden" />
                        <span className="  text-center">
                            Song Nhật Nguyên
                        </span>
                    </h1>
                    {slogan && (
                        <p className="desc text-center mb-8">
                            {slogan}
                        </p>
                    )}
                    <div className="mb-12">
                        <Hero />
                    </div>
                    <div className="mb-24">
                        <ReSer />
                    </div>
                    <div className="mb-24">
                        <Info />
                    </div>
                    <div className="mb-24">
                        <ReNew />
                    </div>
                    <div className="mb-12">
                        <Depaerments />
                    </div>
                    <div className="mb-12">
                        <About />
                    </div>
                    <div className="mb-12">
                        <Contact />
                    </div>
                </section>
            </div>
        </div>
    );
}


export default Home;

// {/* <section className="w-full flex-center flex-col mt-16">
//             <h1 className="head_text text-center mb-4">
//                 Điện Tự Động Hóa
//                 <br className="max-md:hidden" />
//                 <span className="red_gradient text-center">
//                     Song Nhat Nguyen
//                 </span>
//             </h1>
//             {slogan && (
//                 <p className="desc text-center mb-8">
//                     {slogan}
//                 </p>
//             )}
//             <div className="mb-12">
//                 <Hero />
//             </div>
//             <div className="mb-24">
//                 <ReSer />
//             </div>
//             <div className="mb-24">
//                 <Info />
//             </div>
//             <div className="mb-24">
//                 <ReNew />
//             </div>
//             <div className="mb-12">
//                 <Depaerments />
//             </div>
//             <div className="mb-12">
//                 <About />
//             </div>
//             <div className="mb-12">
//                 <Contact />
//             </div> 
//         </section>
