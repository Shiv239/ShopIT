import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "./datatablesource";
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import constants from "../../constants/constants"

const baseURL = constants.API_BASE_URL;
const Datatable = () => {
    const [data, setData] = useState({});

    const [listItems, setListItems] = useState([]);
    const getAPI = baseURL + "/admin";

    useEffect(() => {
        console.log("in effect");
        axios.get(getAPI).then((req) => {
            console.log("res", JSON.stringify(req.data));
            setData(req.data);
            console.log(data);
        })
    }, []);

    const handleDelete = (user_id) => {
        const getAPI_delete = baseURL+"/delete";
        axios.post(getAPI_delete, {user_id}).then((res,req) => {
            console.log(req.body);
        })
    };

    const view_user = (user_email_id) => {
        const current_email_id = user_email_id;
        localStorage.setItem("user_id",current_email_id);
        console.log(current_email_id);
    };

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/view" style={{ textDecoration: "none" }}>
                            <div className="viewButton"
                                 onClick={() => view_user(params.row.user_email_id)}
                            >View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.user_id)}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="datatable">
            <div className="datatableTitle">

            </div>
            <DataGrid
                className="datagrid"
                getRowId={(row) => row.user_id}
                rows={data}
                columns={userColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
            />
        </div>
    );
};

export default Datatable;
