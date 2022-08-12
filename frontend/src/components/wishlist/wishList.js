
import WishCard from './wishCard';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import React, { useEffect, useState } from "react";
import constants from "../../constants/constants";
import axios from "axios";
const api = axios.create({
    baseURL: `${constants.API_BASE_URL}`,
});


const Wishlist = (props) => {
    const [wishlist, setWishlist] = useState([]);
    
    const data = async () => {
        const response = await api.get("/wishlist/get/", {
            params: {
                email: localStorage.getItem("email")
            }
        });
        setWishlist(response.data)
    };
    useEffect(() => {
        data();
    });
    return (
        <>
        <NavBar></NavBar>
        <h1>Your Wishlist</h1>
        <WishCard wishJson = {wishlist}></WishCard>
        <Footer></Footer>
        </>
    );
}

export default Wishlist;