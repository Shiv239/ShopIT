import { Row, Col, Nav, NavItem, NavLink} from "reactstrap";
import React from "react";
import facebookIcon from "../Footer/facebook.png"
import instagramIcon from "../Footer/instagram.png"
import twitterIcon from "../Footer/twitter.png"
import "./Footer.css";

const Footer = (props) => {
    return (
        <footer className="footer">
            <Row className="footermargins">
                <Col xl="12">
                    <Nav className="nav-footer justify-content-center justify-content-xl-end">
                        <NavItem>
                            <NavLink>
                                <a href="https://www.facebook.com/"><img width={40} height={40} src={facebookIcon} alt="user"/></a>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <a href="https://www.instagram.com/"><img width={40} height={40} src={instagramIcon} alt="user"/></a>
                            </NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink>
                                <a href="https://www.twitter.com/"><img width={40} height={40}  src={twitterIcon} alt="user"/></a>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Col>
            </Row>
        </footer>
    );
};

export default Footer;
