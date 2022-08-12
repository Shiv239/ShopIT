import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/dashboard_admin" style={{ textDecoration: "none" }}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <p className="title">LISTS</p>
                    <Link to="/users" style={{ textDecoration: "none" }}>
                        <li>
                            <PersonOutlineIcon className="icon" />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to="/products/addproduct" style={{ textDecoration: "none" }}>
                        <li>
                            <StoreIcon className="icon" />
                            <span>Add Products</span>
                        </li>
                    </Link>
                    <Link to="/orders_admin" style={{ textDecoration: "none" }}>
                        <li>
                            <CreditCardIcon className="icon" />
                            <span>Orders</span>
                        </li>
                    </Link>
                    <Link to="/notifications" style={{ textDecoration: "none" }}>
                        <li>
                            <NotificationsNoneIcon className="icon" />
                            <span>Notifications</span>
                        </li>
                    </Link>
                    <Link to="/giftcards/addgiftcard" style={{ textDecoration: "none" }}>
                        <li>
                            <CardGiftcardIcon className="icon" />
                            <span>Add Gift Cards</span>
                        </li>
                    </Link>
                    <p className="title">USER</p>
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                        <li>
                            <AccountCircleOutlinedIcon className="icon" />
                            <span>Profile</span>
                        </li>
                    </Link>
                    <Link to="/logout" style={{ textDecoration: "none" }}>
                        <li>
                            <ExitToAppIcon className="icon" />
                            <span>Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
