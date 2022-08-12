/* Author: Lavita Pereira */
import React, { Component } from 'react'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

export default class NavBar extends Component {
    render() {
        const isLoggedIn = localStorage.getItem("email")
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/dashboard">ShopIT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
                            </Nav>
                            {/* <Form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Button className="btn btn-light" type="submit">Search</Button>
                            </Form> */}
                            {isLoggedIn ? (
                            <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
                                <Nav.Link as={Link} to="/giftcards">Gift Cards</Nav.Link>
                                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                                <Nav.Link as={Link} onClick={()=>localStorage.setItem("email","")} to="/login">Logout</Nav.Link>
                                <Nav.Link as={Link} to="/userprofile">{isLoggedIn}</Nav.Link>
                            </Nav>):
                                (
                           <Nav className="ml-auto">
                                <Nav.Link as={Link} to="/login">Orders</Nav.Link>
                                <Nav.Link as={Link} to="/login">Gift Cards</Nav.Link>
                                <Nav.Link as={Link} to="/login">Cart</Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            </Nav>)}
                        
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}
