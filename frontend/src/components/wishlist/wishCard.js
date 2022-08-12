import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import constants from "../../constants/constants";
import { useNavigate } from "react-router-dom";

const baseURL = constants.API_BASE_URL;
const api = axios.create({
    baseURL: `${constants.API_BASE_URL}`,
});
const WishCard = ({ wishJson }) => {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    const fetchProduct = async (id) => {
        let res = await axios({
            method: "GET",
            url: baseURL + "/fetchProductByProductID/" + id,
        })
        .then((res) => add_cart(res.data))
        .catch((error) => console.log(error));
    };
    const routeChange = () => {
        let path = `/cart`;
        navigate(path);
    };
    const add_cart = async (data) => {
        let url = baseURL + "/cart/add_cart/";
        console.log(data[0])
        let res = await axios
            .post(url, {
                user_id: localStorage.getItem("email"),
                product: {
                    _id: data[0]._id,
                    productName: data[0].productName,
                    productPrice: data[0].productPrice,
                },
            })
            .then(routeChange())
            .catch((error) => console.log(error));
    };
    const handleCart = (idx) => {
        fetchProduct(wishJson[idx].prod_id)
    };
    return (
        <>
            {wishJson.map((item, idx) => (
                <Container className="p-3 justify-content-center">
                    <Card style={{ width: '60rem' }} className="text-center">
                        <Card.Body>
                            <Row>
                                <Col xs={1} md={2}>
                                    <img src={item.image} className="img-fluid rounded-start" alt="..." />
                                </Col>
                                <Col xs={3} md={6}>
                                    <div></div>
                                    <a href='#'><div>{item.name}</div></a>
                                    <div>${item.price}</div>
                                </Col>
                                <Col xs={3} md={4}>
                                    <Button onClick={() => { handleCart(idx) }}> Buy now </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            ))}
        </>
    );
}

export default WishCard;