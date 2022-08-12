// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import NavBar from '../NavBar/NavBar';
import GiftcardArray from './GiftcardArray';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import constants from "../../constants/constants"

const baseURL = constants.API_BASE_URL;

const GiftcardDetails = () => {
    let navigate = useNavigate();
    const { id } = useParams();

    const [data, setData] = useState([]);

  const routeChange = () => {
    let path = `/wishlist`;
    navigate(path);
  };
    const fetchGiftcard = async () => {
        let res = await axios({
            method: "GET",
            url: baseURL+"/fetchGiftcardByGiftcardID/" + id
        });

        setData(res.data)
    };

  const add_cart = async () => {
    let url = baseURL + "/cart/add_cart/";
    console.log(localStorage.getItem("email"));
    localStorage.getItem("email");
    console.log(data[0]);
    let res = await axios
      .post(url, {
        user_id: localStorage.getItem("email"),
        product: {
          _id: id,
          productName: data[0].giftcardName,
          productPrice: data[0].giftcardPrice,
          productImage: data[0].giftcardImage,
        },
      })
      .then((res) => {
        navigate("/cart")
        console.log(res.data)
      }
        )
      .catch((error) => console.log(error));
  };
  const handleCart = () => {
    add_cart();
  };

    useEffect(() => {
        fetchGiftcard()
    }, [])
    return (
        <div>
            {data.map(gift => {
                return (
                    <>
                    <NavBar></NavBar>
                        <div className="card1 mb-3 mt-5" >
                            <div className="row g-0">
                                <div className="col-md-6">
                                    <img src={gift.giftcardImage} className="img-fluid" alt="..." />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body" key={gift._id}>
                                        <h5 className="text-start fs-1 fw-bold">{gift.giftcardName}</h5>
                                        <h5 className="text-start fs-1 fw-bold">{gift.giftcardBrand}</h5>
                                        <p className="text-start mt-5">{gift.giftcardDescription}</p>
                                        <p className="text-start fw-bold">${gift.giftcardPrice}</p>
                                        <p className="text-start"><small className="text-muted">In stock</small></p>
                                        <button className="btn btn-secondary mt-5" onClick={handleCart}>Add to Cart</button>
                                        <br/>
                                        {/* <button className="btn btn-secondary mt-5" onClick={handleCart}>
                                        Add
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}
export default GiftcardDetails