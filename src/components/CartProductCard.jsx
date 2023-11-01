import React from 'react';
import { RemoveProduct } from '../Controllers/cart';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';

const CartProductCard = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Function to handle the removal of a product from the cart
    async function HandleRemoveProduct() {
        // Dispatch the removeItem action to update the Redux store
        dispatch(removeItem(data?._id));
        // Call the RemoveProduct function to remove the product from the cart
        await RemoveProduct(data?._id);
    }

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="row g-0">
                    {/* Product image */}
                    <div className="col-12 col-md-4">
                        <img
                            style={{ height: '100%' }}
                            src="https://picsum.photos/800"
                            className="img-fluid"
                            alt="..."
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        {/* Product details */}
                        <div className="productDetails h-100 d-flex flex-column align-items-center justify-content-between">
                            <h3 className="">{data?.product?.title}</h3>
                            <div className="Price d-flex fw-bold align-items-center justify-content-center mb-1">
                                <p className="Price d-flex fs-5">₹ <span id="price">{data?.product?.price}</span></p>
                            </div>
                            {/* View option to navigate to the product's details */}
                            <button style={{ width: 'fit-content' }}
                                className="btn btn-outline-primary"
                                onClick={() => navigate(`/products/${data?.product._id}`)}>
                                View
                            </button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 p-1 d-flex flex-column justify-content-between align-items-center">
                        {/* Item counter showing the quantity */}
                        <div className="NoOfItem d-flex justify-content-between align-items-center">
                            <p className="fs-4 px-2 me-1 mb-0 secondary-border" id="itemCounter">
                                x {data?.quantity}
                            </p>
                        </div>
                        {/* Item delete button to remove the product from the cart */}
                        <button onClick={() => { HandleRemoveProduct() }} className="btn btn-danger mt btn-outline-secondary-3">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCard;
