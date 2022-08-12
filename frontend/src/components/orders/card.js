import { Container, Card, Col, Row, Image } from 'react-bootstrap';
import axios from "axios";
import constants from "../../constants/constants"
import { useNavigate } from "react-router-dom";

const OrderCard = ({ orderJson }) => {
    const api = axios.create({
        baseURL: `${constants.API_BASE_URL}`,
    });
    let navigate = useNavigate();
    const routeChange = (prod) => {
        console.log(prod)
        var path = '';
        if (prod.name === "gift card")
            path = `/giftcards/giftcard/${prod.id}`
        else
            path = `/product/${prod.id}`;
        navigate(path);
    };
    const archive = (index) => {
        const response = api.post("/order/archive/", {
            order: orderJson[index]
        });
        console.log(response)
    }
    return (
        <>
            {orderJson.map((order, idx) => (
                <Container key={order.id} className="p-3">
                    <Card>
                        <Card.Header>
                            <Row xs={1} md={2} className="g-4">
                                <Col xs={1} md={2}>
                                    <div>ORDER PLACED</div>
                                    <div>{order.date}</div>
                                </Col>
                                <Col xs={3} md={7}>
                                    <div>TOTAL</div>
                                    <div>{order.price}</div>
                                </Col>
                                <Col xs={1} md={3}>
                                    <div>ORDER # {order.number}</div>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <h2 className="text-bold">{order.delivery}</h2>
                            {order.product.map((prod, idx) => (
                                <Row>
                                    <Col xs={1} md={2}>
                                        <img
                                            src={prod.image}
                                            style={{
                                                width: "200px",
                                                height: "100px",
                                                objectFit: "contain"
                                            }}
                                            alt="..."
                                        />
                                    </Col>
                                    <Col xs={3} md={7}>
                                        <a href='#' onClick={() => { routeChange(prod) }}><div>{prod.name}</div></a>
                                    </Col>
                                </Row>
                            ))}
                        </Card.Body>
                        <Card.Footer className="text-muted"><a href="" onClick={() => { archive(idx) }}>Archive order</a></Card.Footer>
                    </Card>
                </Container>
            ))}
        </>
    );
}

export default OrderCard;