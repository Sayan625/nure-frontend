import React, { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import { GetProducts } from '../Controllers/products'

const Home = () => {

    const [featured, setfeatured] = useState([])

    // set featured product upto 12 products
    async function HandleFeaturedData() {
        const data = await GetProducts()
        setfeatured(() => data.slice(0,12))

    }

    useEffect(() => {

        HandleFeaturedData()

    }, [])

    return (
        <div className=''>
            {/* <NavBar/> */}
            <section className="hero ">
                <div className="container-fluid overlay h-100 d-flex justify-content-center align-items-center ">
                    <div className="text-center heroText">
                        <div className="container">
                            <div className="row align-items-center text-white">
                                {/* brand name and logo */}
                                <div className="pe-3 brand col-12 col-md-6 d-flex justify-content-center align-items-center">
                                    <span className="brandName me-2">
                                        <i className="fa-solid fa-snowflake " />
                                    </span>
                                    <h1 className="brandName pe-1">Nure</h1>
                                </div>
                                {/* brand slogan */}
                                <div className="col-12 col-md-6 d-flex flex-column justify-content-center">
                                    <h2 className=" ps-1">--Fashion that defines you.</h2>
                                    <h3 className=" ps-1">70% off Winter Sale</h3>
                                    <span>
                                        <a role="button" className="btn btn-primary" href="#featured">
                                            Explore Now
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container p-2 mt-2 " id="featured">
                <h3 className="text-center mb-2">Featured Products</h3>
                <Carousel data={featured} />
            </section>
            {/* <Footer/>  */}
        </div>

    )
}

export default Home