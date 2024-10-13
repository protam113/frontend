import React from 'react'
import banner from "../assets/img/banner2.jpg"

const Hero = () => {
    return (
        <figure className="relative w-full max-w-screen-lg mx-auto cursor-pointer">
            <a href="/" className="block w-full h-full">
                <img className="rounded-lg w-full" src={banner} alt=""/>
            </a>
            <figcaption className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 px-8 py-6 text-white flex justify-between">
                <p>Do you want to get notified when a new component is added to Flowbite?</p>
                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5">
                    Contact Us Now
                </button>
            </figcaption>
    </figure>
)
}

export default Hero