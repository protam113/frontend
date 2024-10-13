import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import service4 from "../assets/img/service/service1.jpg"
import service2 from "../assets/img/service/service2.jpg"
import service3 from "../assets/img/service/service3.jpg"
import service1 from "../assets/img/service/service4.jpg"


const Departments = () => {
    const DepartmentsArray = [
        {
            name: "Boiler",
            imageUrl: service4,
            slidesToSlide: 1,
        },
        {
            name: "IoT",
            imageUrl:service2 ,
            slidesToSlide: 1,
        },
        {
            name: "Boiler",
            imageUrl:service3 ,
            slidesToSlide: 1,
        },
        {
            name: "Boiler",
            imageUrl:service1 ,
            slidesToSlide: 1,
        },
    ]

    const responsive = {
        extraLarge: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        large: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        medium: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        small: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='container mx-auto text-center'>
            <h2 className="text-2xl font-bold mb-4">Departments</h2>
            <div className="carousel-wrapper mx-auto">
                <Carousel responsive={responsive} removeArrowOnDeviceType={["medium", "small"]}
                >
                    {
                        DepartmentsArray.map((depart, index) => {
                            return(
                                <div className='card' key={index}>
                                    <div className='depart-name'>{depart.name}</div>
                                    <img src={depart.imageUrl} alt={depart.name}/>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    );
}

export default Departments;
