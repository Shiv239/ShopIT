
import { Container, Tabs, Tab } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import axios from "axios";
import Search from './search';
import constants from "../../constants/constants"
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: `${constants.API_BASE_URL}`,
});

const Orders = () => {
    const [order, setOrder] = useState([]);
    const [pendingOrder, setPending] = useState([]);
    const [cancelledOrder, setCancelled] = useState([]);
    const navigate=useNavigate();
    const data = async () => {
        const response = await api.get("/order/get/", {
            params: {
                email: localStorage.getItem("email"),
            }
        });
        const orders = response.data
        setPending(orders.filter((item) => {
            return item['status'] === 'pending';
        }))
        setOrder(orders.filter((item) => {
            return item['status'] === 'delivered';
        }));
        setCancelled(orders.filter((item) => {
            return item['status'] === 'cancelled';
        }));
    };
    useEffect(() => {
        data();
    });
    const navigateFeedback = () => {

        navigate('/feedback');
      };
    return (
        <>
            <NavBar></NavBar>
            <Container>
                <h1>Your Orders</h1>
                <Tabs defaultActiveKey="history" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="history" title="Order History">
                        <Search orderJson={order}></Search>
                        <button onClick={navigateFeedback}>Give Feedback</button>

                    </Tab>
                    <Tab eventKey="pending" title="Yet to be delivered">
                        <Search orderJson={pendingOrder}></Search>

                    </Tab>
                    <Tab eventKey="cancelled" title="Cancelled orders">
                        <Search orderJson={cancelledOrder}></Search>
                    </Tab>
                </Tabs>
            </Container>
            <Footer></Footer>
        </>
    );
}

export default Orders;