import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SiZalo, SiFacebook } from "react-icons/si";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/info/6653de4fc331853f432df898');
        setInfo(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-red-600 w-full flex flex-wrap justify-around items-start p-5">
        <div className="p-5 flex flex-col items-center">
          <ul className="flex flex-col items-center">
            {info && (
              <>
                <img src={info.mainImage.url} alt='Company Logo' id='logo' className="mb-4" />
                <p className="text-white text-lg text-center mb-4 max-w-xs">{info.mainTitle}</p>
              </>
            )}
            <div className="flex gap-6 pb-5">
              <a href="https://link_to_zalo" target="_blank" rel="noopener noreferrer">
                <SiZalo className="text-2xl text-white cursor-pointer hover:text-red-400" />
              </a>
              <a href="https://link_to_facebook" target="_blank" rel="noopener noreferrer">
                <SiFacebook className="text-2xl text-white cursor-pointer hover:text-red-400" />
              </a>
              <a href="https://link_to_tiktok" target="_blank" rel="noopener noreferrer">
                <AiFillTikTok className="text-2xl text-white cursor-pointer hover:text-red-400" />
              </a>
              <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-2xl text-white cursor-pointer hover:text-red-400" />
              </a>
            </div>
          </ul>
        </div>
        <div className="p-5 max-w-xs">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Product</p>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/product">Product</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/document">Document</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/solution">Solution</a>
            </li>

          </ul>
        </div>
        <div className="p-5 max-w-xs">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Company</p>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/about_us">About</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/contact_us">Contact Us</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/">Videos</a>
            </li>
          </ul>
        </div>
        <div className="p-5 max-w-xs">
          <ul>
            <p className="text-white font-bold text-2xl pb-4">Support</p>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/contact_us">Contact</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/service">Services</a>
            </li>
            <li className="text-red-50 text-md pb-2 font-semibold hover:text-red-400 cursor-pointer">
              <a href="/new">News</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-2 bg-gray-50">
        <h1 className="text-gray-800 font-semibold">
          © 2024 Song Nhat Nguyen by{" "}
          <span className="hover:text-blue-600 font-semibold cursor-pointer">
            Dev{" Lenf "}
          </span>
        </h1>
      </div>
    </>
  );
}

export default Footer;
