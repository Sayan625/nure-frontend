import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className="footer container-fluid mt-5 bg-secondary text-white " style={{borderTop:'1px solid black'}}>
            <div className="container py-1">
                <div className="row g-0 w-100">
                    <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
                        <Link to='/'  className="h6 silent">Home</Link>

                    </div>
                    <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
                        <Link to='/products'  className="h6 silent">AllProducts</Link>

                    </div>
                    <div className="col-12 col-sm-4 d-flex flex-column align-items-center">
                        <Link  to='/contacts' className="h6 silent">Contacts</Link>
                    </div>
                </div>
            </div>
            <div className="container py-2" style={{borderTop:'1px solid white'}}>
                <p className="text-center m-0">Copyright@Ecommerce 2022-23</p>
            </div>
        </div>
    );
}

export default Footer;
