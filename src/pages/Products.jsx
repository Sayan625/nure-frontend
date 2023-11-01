import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { GetProducts } from '../Controllers/products';
import { GetCategories } from '../Controllers/category';
import {
  GetProductsByCategory,
  GetProductsByType,
  SortProductsByDate,
  SortProductsByPrice
} from '../Controllers/products';



const Products = () => {

  // State variables to manage data and pagination
  const [allData, setAllData] = useState([]); // All product data
  const [data, setData] = useState([]); // Product data to display
  const [categories, setCategories] = useState([]); // Categories
  const [maxPage, setMaxPage] = useState(1); // Maximum number of pages
  const [currPage, setCurrPage] = useState(1); // Current page

  const itemsPerPage = 5; // Number of items to display per page
  const indexOfLastItem = currPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const type = ['pant', 'shirt', 'skirt', 'dress', 'hoodie']; // Product types
  const sort = [
    { type: 'dateup', name: 'Oldest To Newest' },
    { type: 'datedown', name: 'Newest To Oldest' },
    { type: 'pricedown', name: 'Price-- Lowest to Highest' }
  ]; // Sorting options

  // Function to fetch categories
  async function SetCategories() {
    const cate = await GetCategories();
    setCategories(() => cate);
  }

  // Function to fetch all product data
  async function GetAllData() {
    const resp = await GetProducts();
    setAllData(() => resp);
    setMaxPage(() => Math.ceil(resp.length / itemsPerPage));
    ShowDataByPage();
  }

  // Function to display products based on the current page
  function ShowDataByPage() {
    setData(() => allData.slice(indexOfFirstItem, indexOfLastItem));
  }

  // Function to search products by category
  async function SearchByCategory(id) {
    const resp = await GetProductsByCategory(id);
    setAllData(() => resp);
    setMaxPage(() => Math.ceil(resp.length / itemsPerPage));
    setCurrPage(1);
  }

  // Function to search products by type
  async function SearchByType(type) {
    const resp = await GetProductsByType(type);
    setAllData(() => resp);
    setMaxPage(() => Math.ceil(resp.length / itemsPerPage));
    setCurrPage(1);
  }

  // Function to sort products by price
  async function SortByPrice(order) {
    const resp = await SortProductsByPrice(order);
    setAllData(() => resp);
    setMaxPage(() => Math.ceil(resp.length / itemsPerPage));
    setCurrPage(1);
  }

  // Function to sort products by date
  async function SortByDate(order) {
    const resp = await SortProductsByDate(order);
    setAllData(() => resp);
    setMaxPage(() => Math.ceil(resp.length / itemsPerPage));
    setCurrPage(1);
  }

  // Initial data fetching and setting categories
  useEffect(() => {
    GetAllData();
    SetCategories();
  }, []);

  // Update displayed data based on the current page and all data
  useEffect(() => {
    ShowDataByPage();
  }, [currPage, allData]);




  return (
    <div>
      <h3 className="mb-2 text-center">All Products</h3>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-12 col-md-2 mb-2 text-start">
            <nav id="sidebar" className="bg-light p-2">
              <div className="">
                {/* Sidebar content with filters */}
                <h6>Filters</h6>
                <div className="">
                  <label htmlFor="">Search By name</label>
                  <input type="text" className='form-control'
                    onChange={(e) => {

                      if (e.target.value.trim() === "") {
                        GetAllData()
                        return
                      }
                      setData(() => allData.filter((item) => item.title.includes(e.target.value)))
                    }} />
                </div>
                <div className="mb-2">
                  <label>Categories</label>
                  <select className="form-select" onChange={(e) => {
                    if (e.target.value === 'all') {
                      GetAllData()
                      return
                    }
                    SearchByCategory(e.target.value)
                  }}>
                    <option selected value='all'>All products</option>
                    {categories?.map((element, index) => {
                      return <option value={element._id} >{element?.name}</option>
                    })}
                  </select>
                </div>
                <div className="">
                  <label>Types</label>
                  <select className="form-select" onChange={(e) => {
                    if (e.target.value === 'all') {
                      GetAllData()
                      return
                    }
                    SearchByType(e.target.value)
                  }}>
                    <option selected value='all'>All products</option>
                    {type?.map((element, index) => {
                      return <option value={element} >{element}</option>
                    })}
                  </select>
                </div>
                <div className="">
                  <label>Sort</label>
                  <select className="form-select" onChange={(e) => {
                    if (e.target.value === 'all') {
                      GetAllData()
                      return
                    }
                    if (e.target.value === 'dateup')
                      SortByDate(1)
                    else if (e.target.value === 'datedown')
                      SortByDate(-1)
                    else if (e.target.value === 'pricedown')
                      SortByPrice(-1)
                  }}>
                    <option selected value='all'>Default</option>
                    {sort?.map((element, index) => {
                      return <option value={element.type} >{element.name}</option>
                    })}
                  </select>
                </div>
              </div>
            </nav>
          </div>
          {/* product list */}
          <div className="col-12 col-md-10">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2 mb-2 ">
              {data?.map((item, index) => (
                <div key={index} className="col-12 text-center">
                  <ProductCard data={item} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      {/* pagination */}
      <nav className="Pagination my-3">
        <ul className="pagination justify-content-center align-items-center m-0">
          <li className="page-item">
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {Array.from({ length: maxPage }).map((item, index) => (
            <li className="page-item">
              <button onClick={() => setCurrPage(index + 1)} className="page-link" >
                {index + 1}
              </button>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Products;
