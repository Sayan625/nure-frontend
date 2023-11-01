import React, { useEffect, useState } from 'react';
import CarouselSlide from './CarouselSlide';
import { useRef } from 'react';

const Carousel = ({ data }) => {
    const ref = useRef(null);
    const [slide1, setSlide1] = useState([]);
    const [slide2, setSlide2] = useState([]);

    const maxItemCount = 4;

    useEffect(() => {
        // Set the content for the first carousel slide (slide1) with the first set of data
        setSlide1(() => data.slice(0, maxItemCount));
        // Set the content for the second carousel slide (slide2) with the second set of data
        setSlide2(() => data.slice(5, maxItemCount * 2));
        // Trigger a click event on the reference to start the carousel
        ref.current.click();
    }, [data]);

    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div id="caraousel1" className="carousel-inner">
                {/* Render the first carousel slide with the first set of data */}
                <CarouselSlide data={slide1} active={true} />
                {/* Render the second carousel slide with the second set of data */}
                <CarouselSlide data={slide2} />
            </div>
            {/* Button to navigate to the previous carousel slide */}
            <button ref={ref} className="carousel-control-prev my-auto" style={{ height: "fit-content" }} type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <i className="fa-solid fa-chevron-left text-dark fs-1"></i>
            </button>
            {/* Button to navigate to the next carousel slide */}
            <button className="carousel-control-next my-auto" style={{ height: "fit-content" }} type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <i className="fa-solid fa-chevron-right text-dark fs-1"></i>
            </button>
        </div>
    );
};

export default Carousel;
