/* Author: Lavita Pereira */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { Row } from 'react-bootstrap';
import "./ProductCss.css";
import axios from "axios";
import constants from "../../constants/constants";

const baseURL = constants.API_BASE_URL;
const api = axios.create({
  baseURL: `${constants.API_BASE_URL}`,
});
const ProductDetails = () => {
  const [data, setData] = useState([]);
  const isLoggedIn = localStorage.getItem("email");

  let navigate = useNavigate();
  const { id } = useParams();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const routeChange = () => {
    let path = `/wishlist`;
    navigate(path);
  };

  const fetchProduct = async () => {
    let res = await axios({
      method: "GET",
      url: baseURL + "/fetchProductByProductID/" + id,
    });
    setData(res.data);
  };

  const add_cart = async () => {
    let url = baseURL + "/cart/add_cart/";
    console.log(localStorage.getItem("email"));
    localStorage.getItem("email");
    console.log(id);
    console.log(data);
    let res = await axios
      .post(url, {
        user_id: localStorage.getItem("email"),
        product: {
          _id: id,
          productName: data[0].productName,
          productPrice: data[0].productPrice,
          productImage: data[0].productImage,
          productSize: data[0].size
        },
      })
      .then((res) => {
        navigate("/cart")
        console.log(res.data)
      }
        )
      .catch((error) => console.log(error));
  };

  const addToWishlist = async (prod) => {
    const response = api.post("/wishlist/add/", {
      email: localStorage.getItem("email"),
      product_id: id,
      product: prod
    })
      .then(routeChange())
      .catch((error) => console.log(error));
  }
  const handleCart = () => {
    add_cart();
  };
  const handleWishlist = (index) => {
    addToWishlist(data[index]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      {data.map((prod, idx) => {
        return (
          <>
            <NavBar></NavBar>
            <div className="productDetails" key={idx}>
              <div className="big-img">
                <img src={prod.productImage} className="img-fluid" alt="..." />
              </div>

              <div className="box">
                <div className="row">
                  <h1>{prod.productBrand}</h1>
                  <h5>{prod.productName}</h5>
                  <span>${prod.productPrice}</span>
                </div>
                <p>{prod.productDescription}</p>
                {prod.productCategory === "Men" ||
                  prod.productCategory === "Women" ||
                  prod.productCategory === "Kids" ? (
                  <p>
                    Size <strong>{prod.size}</strong>
                  </p>
                ) : (
                  ""
                )}

                {isLoggedIn ? (
                  <div className="buttonRow">
                    <button
                      className="cart"
                      onClick={handleCart}
                      style={{
                        backgroundColor: isHovering ? "pink" : "",
                        color: isHovering ? "white" : "",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {" "}
                      <span className="bi bi-handbag-fill"></span> Add to cart
                    </button>
                    <button className="wishlist" onClick={() => { handleWishlist(idx) }}> <span class='bi bi-suit-heart'></span> Add to wishlist</button>
                  </div>

                ) : (
                  <span className="text-danger">Log in to add to cart</span>
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ProductDetails;
