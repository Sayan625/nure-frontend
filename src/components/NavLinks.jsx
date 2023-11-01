import React from 'react'
import { Link } from 'react-router-dom'
const NavLinks = () => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/products">
                    All Products
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/contacts">
                    Contacts
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/orderhistory">
                    OrderHistory
                </Link>
            </li>
        </ul>
    )
}

export default NavLinks