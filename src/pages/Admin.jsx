import React, { useEffect, useState } from 'react';
import { GetProducts } from '../Controllers/products';
import { AddProduct, DeleteProduct, UpdateProduct } from '../Controllers/admin';
import TableRow from '../components/TableRow';
import { GetCategories } from '../Controllers/category';
import { SignOut } from '../Controllers/login';
import { useNavigate } from 'react-router-dom';

function Admin() {
  // Define states for products, categories, and a new product.
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Initialize a new product with empty fields.
  const nullProduct = {
    title: "",
    type: "",
    category: "",
    price: 0,
    desc: ""
  };
  const [newProduct, setnewProduct] = useState(nullProduct);

  // Function to handle editing an existing product.
  async function HandleEditProduct(id, item) {
    await UpdateProduct(id, item);
    SetData();
  }

  // Function to handle adding a new product.
  async function HandleAddProduct() {
    if (newProduct.price === 0) return; // Prevent adding products with a price of 0.
    const data = await AddProduct(newProduct);
    setProducts((prev) => [data, ...prev]); // Add the new product to the list.
    navigate(0); // Navigate to the top of the page.
  }

  // Function to handle deleting a product.
  async function HandleDelete(id) {
    const deleted = await DeleteProduct(id);
    if (deleted) {
      setProducts((prev) => prev.filter((item) => item._id !== id)); // Remove the deleted product from the list.
    }
  }

  // Function to fetch product data.
  async function SetData() {
    const data = await GetProducts();
    setProducts(() => data);
  }

  // Function to fetch categories.
  async function SetCategories() {
    const cate = await GetCategories();
    setCategories(() => cate);
  }

  // Use useEffect to fetch data and categories on component mount.
  useEffect(() => {
    SetData();
    SetCategories();
  }, []);

  return (
    <div className="container p-0">
      <h2 className='text-center'>Admin Panel</h2>
      <div className="row">
        <div className="col text-center">
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Product
          </button>
        </div>
        <div className="col text-center">
          <button className='btn btn-danger' onClick={() => {
            SignOut();
            navigate('/login');
          }}>
            Logout
          </button>
        </div>
      </div>
      <div className="row g-0">
        <div className="col-12">
          <div className="container-fluid mt-4">
            <h3 className='text-center'>Product List</h3>
            <table className="table table-responsive-md table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Desc</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <TableRow
                    key={index}
                    item={item}
                    cat={categories}
                    HandleDelete={HandleDelete}
                    HandleEdit={HandleEditProduct}
                  />
                ))}
              </tbody>
            </table>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Product</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label>Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newProduct.title}
                          onChange={(e) => setnewProduct((prev) => ({ ...prev, 'title': e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Type</label>
                        <input
                          type="text"
                          className="form-control"
                          value={newProduct.type}
                          onChange={(e) => setnewProduct((prev) => ({ ...prev, 'type': e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select className="form-select" onChange={(e) => {
                          e.preventDefault();
                          setnewProduct((prev) => (
                            { ...prev, 'category': e.target.value }
                          ));
                        }}>
                          {categories?.map((element, index) => {
                            if (index === 0)
                              return <option selected value={element._id}>{element?.name}</option>
                            else
                              return <option value={element._id}>{element?.name}</option>
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          rows={4}
                          cols={40}
                          className="form-control"
                          value={newProduct.desc}
                          onChange={(e) => setnewProduct((prev) => ({ ...prev, 'desc': e.target.value }))}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          type="number"
                          className="form-control"
                          value={newProduct.price}
                          onChange={(e) => setnewProduct((prev) => ({ ...prev, 'price': e.target.value }))}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => HandleAddProduct()}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
