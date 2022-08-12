import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import List from "../../components/table/Table";
import {useEffect, useState} from "react";
import axios from "axios";
import constants from "../../constants/constants";

const Single = () => {
    const baseURL = constants.API_BASE_URL;
    const getAPI = baseURL + "/view";
    console.log(getAPI);
    const user_email_id = localStorage.getItem("user_id")
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    console.log("Single: ", user_email_id);
    useEffect(() => {
        console.log("in effect");

        axios.post(getAPI, {user_email_id:user_email_id}).then((res) => {
            console.log("In api...");
            console.log("Email: ",res.data);
            setUserEmail(res.data.user_email_id);
            setUserName(res.data.user_id);
        })
    }, []);
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <div className="top">
                    <div className="left">
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <div className="details">
                                <h1 className="itemTitle">{userName}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{userEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Past Orders</h1>
                    <List/>
                </div>
            </div>
        </div>
    );
};

export default Single;
