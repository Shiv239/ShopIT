import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {useEffect, useState} from "react";
import axios from "axios";
import constants from "../../constants/constants";

const List = () => {
    const baseURL = constants.API_BASE_URL;

    const getAPI = baseURL + "/past";
    console.log(getAPI);
    const user_id = localStorage.getItem("user_id")
    const [data, setData] = useState("");
    useEffect(() => {
        console.log("in Table");

        axios.post(getAPI, {user_id:user_id}).then((res) => {
            console.log("In Table api...");
            setData(res.data);
        })
    }, []);

    console.log("Data:",data);

    const rows = [
        {
            user_id: `${data.user_id}`,
            status: "",
            image: "",
            name: "",
            date: `${data.date}`,
            price: "",
            delivery: "",
        }
    ];
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Status</TableCell>
                        <TableCell className="tableCell">Product</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Amount</TableCell>
                        <TableCell className="tableCell">Payment Method</TableCell>
                        <TableCell className="tableCell">Delivery Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.user_id}>
                            <TableCell className="tableCell">{row.status}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.image} alt="" className="image" />
                                    {row.name}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{row.date}</TableCell>
                            <TableCell className="tableCell">{row.price}</TableCell>
                            <TableCell className="tableCell">{row.delivery}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default List;
