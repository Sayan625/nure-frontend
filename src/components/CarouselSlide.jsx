import React from 'react'
import ProductCard from './ProductCard'
const CarouselSlide = ({ data, active }) => {
    return (
        <div className={`carousel-item ${active ? "active" : ""}`}  data-bs-interval="2000">
            <div className="row g-0">
                {
                    data?.map((item) => 
                    <div className="col me-2">
                        <ProductCard data={item}/>
                    </div>)
                }
            </div>

        </div>
    )
}

export default CarouselSlide