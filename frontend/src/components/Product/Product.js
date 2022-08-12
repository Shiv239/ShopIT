/* Author: Lavita Pereira */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import './ProductCss.css'
import constants from "../../constants/constants";

const baseURL = constants.API_BASE_URL;
const Product = () => {
  const [data, setData] = useState([]);
  const [dbData, setDbData] = useState([]);

  const filterResult = (cat) => {
    // debugger;
    console.log(data);
    const result = dbData.filter((val) => {
      return val.productCategory === cat;
    });
    setData(result);
  };

  const fetchAllProducts = async () => {
    // debugger;
    let res = await axios({
      method: "GET",
      url: baseURL + "/fetchProducts/",
    });
    setData(res.data);
    setDbData(res.data);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const result = dbData.filter((product) => {
      //  console.log(product.productName);
      return (
        product.productName.toLowerCase().match(search.toLowerCase()) ||
        product.productBrand.toLowerCase().match(search.toLowerCase())
      );
    });
    setData(result);
  }, [search]);

  return (
    <div>
      <input
        type="search"
        className="search"
        placeholder="Search products..."
        onChange={(event) => setSearch(event.target.value)}
        style={{
          marginTop: "30px",
          width: "40%",
          background: "#F2F1F9",
          border: "none",
          padding: "0.5rem",
        }}
      />

      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <h1 className="text-center secondary pb-4 pt-1" style={{color:'lightcoral'}}>Category</h1>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => setData(dbData)}
              style={{backgroundColor:'bisque'}}
            >
              All
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Men")}
              style={{backgroundColor:'bisque'}}
            >
              Men
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Women")}
              style={{backgroundColor:'bisque'}}
            >
              Women
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Kids")}
              style={{backgroundColor:'bisque'}}
            >
              Kids
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Home & Kitchen")}
              style={{backgroundColor:'bisque'}}
            >
              Home & Kitchen
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Electronics")}
              style={{backgroundColor:'bisque'}}
            >
              Electronics
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Health & Personal Care")}
              style={{backgroundColor:'bisque'}}
            >
              Health & Personal Care
            </button>
            <button
              className="btn btn-warning w-75 mb-4"
              onClick={() => filterResult("Beauty")}
              style={{backgroundColor:'bisque'}}
            >
              Beauty
            </button>
          </div>
          <div className="col-md-9">
            <div className="row">
              {data.map((values) => {
                return (
                  <>
                    <div
                      className="col-md-4 mb-4"
                      key={values._id}
                      style={{ margin: 0 }}
                    >
                      <div className="card" style={{ minHeight: "100%" }}>
                        <Link
                          className="link"
                          as={Link}
                          to={`/product/${values._id}`}
                        >
                          <img
                            src={values.productImage}
                            className="card-img-top1"
                            style={{
                              width: "100%",
                              height: "30vw",
                              objectFit: "contain",
                            }}
                            alt="..."
                          />
                        </Link>
                        <div className="card-body1">
                          <p
                            className="cardbrand1 mt-1"
                            style={{
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              fontSize: "20px",
                              marginTop: "-5px",
                            }}
                          >
                            <strong>{values.productBrand}</strong>
                          </p>
                          <p className="card-title1 text-muted">
                            {values.productName}
                          </p>
                          <p className="price1">
                            <strong>${values.productPrice}</strong>
                          </p>
                          <div className="cardlink1">
                            <Link
                              className="link"
                              as={Link}
                              to={`/product/${values._id}`}
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
