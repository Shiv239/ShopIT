import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Input from "@mui/material/Input";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import constants from "../../constants/constants"
const api = axios.create({
  baseURL: `${constants.API_BASE_URL}`,
});

const Cart = () => {
  const [items, setItem] = useState([]);
  const [amount, setAmount] = useState(0)
  const [shipping, setShipping] = useState(0)
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/orders`;
    navigate(path);
  };
  const decrement = (index) => {
    var temp = [];
    temp = Object.assign(temp, items);
    temp[index].product_quantity -= 1;
    temp = temp.filter((temp) => temp.product_quantity > 0);
    const res = async () => {
      await api.post("/cart/quantity_dec", {
        email: localStorage.getItem("email"),
        index: index,
      });
    };
    res();
    setItem(temp);

  };
  const addToOrder = () => {
    console.log(items)
    const response = api.post("/order/add/", {
      user_id: localStorage.getItem("email"),
      product: items
    }).then(removeAll())
    .catch((error) => console.log(error));
    console.log(response)
  }
  const handleCart = () => {
    console.log(items)
    addToOrder();
  };
  const increment = (index) => {
    var temp = [];
    temp = Object.assign(temp, items);
    temp[index].product_quantity += 1;
    temp = temp.filter((temp) => temp.product_quantity > 0);
    const res = async () => {
      await api.post("/cart/quantity_inc", {
        email: localStorage.getItem("email"),
        index: index,
      });
    };
    res();
    setItem(temp);
  };
  const removeAll = () => {
    const res = async () => {
      const response = await api.post("/cart/removeAll").then(routeChange());
      setItem(response.data.cart.product);
    };
    res()
  }
  const remove = (index) => {
    const res = async () => {
      const response = await api.post("/cart/remove_item", {
        email: localStorage.getItem("email"),
        index: index,
      });
      setItem(response.data.cart.product);
    };
    res()
  }

  useEffect(() => {
    const data = async () => {
      const response = await api.post("/cart/get_cart", {
        email: localStorage.getItem("email"),
      });
      setItem(response.data.data.product);
    };
    data();

  }, []);
  useEffect(() => {
    let total_price = items.reduce((total, item) => total + (item.product_quantity * item.product_price), 0)
    setAmount(total_price)
    if (amount > 0) {
      setShipping(10)
    }

  }, [items]);
  return (
    <>
      <NavBar></NavBar>
      <Grid direction={"row"} xs={8} spacing={2}>
        <TableContainer component={Paper} sx={{ width: "95%", mt: 3, ml: 2 }}>
          <Table sx={{ mt: 4 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <b>Product</b>
                </TableCell>
                <TableCell align="left">
                  <b>Title</b>
                </TableCell>
                <TableCell align="left">
                  <b>Size</b>
                </TableCell>
                <TableCell align="left">
                  <b>Quantity</b>
                </TableCell>
                <TableCell align="left">
                  <b>Price</b>
                </TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left" sx={{ width: "20vw" }}>
                    <img
                      alt="new"
                      src={row.productImage}
                      style={{ width: "20%", height: "20%" }}
                    ></img>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "20vw" }}>
                    {row.product_name}
                  </TableCell>
                  <TableCell align="left">{row.size}</TableCell>
                  <TableCell align="left">
                    <Button
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        decrement(index);
                      }}
                    >
                      <RemoveSharpIcon sx={{ fontSize: "small" }} />
                    </Button>
                    <Input
                      type="quantity"
                      value={row.product_quantity}
                      size="small"
                      inputProps={{ style: { textAlign: "center" } }}
                      sx={{ width: 30 }}
                    ></Input>
                    <Button
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        increment(index);
                      }}
                    >
                      <AddSharpIcon sx={{ fontSize: "small" }} />
                    </Button>
                  </TableCell>
                  <TableCell align="left">${row.product_price}</TableCell>
                  <TableCell align="left">
                    <Button
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <ClearSharpIcon sx={{ fontSize: "small" }} />
                    </Button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container direction="row" sx={{ flexGrow: 1 }} spacing={2}>
          <Grid item xs={4} ml={2}>
            <Card sx={{ position: "sticky", mt: 10, mb: 3 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  variant="h5"
                  align="left"
                  gutterBottom
                >
                  <b> Order Summary </b>
                </Typography>
                <Divider />
                <Typography
                  variant="body2"
                  align="left"
                  sx={{ mt: 1, fontSize: 12 }}
                >
                  <b>Sub-total({items?.length})</b> &emsp; {amount}
                </Typography>
                <Typography variant="body2" align="left" sx={{ fontSize: 12 }}>
                  <b>Shipping Charges</b> &emsp; {shipping}
                </Typography>
                <Typography variant="body2" align="left" sx={{ fontSize: 12 }}>
                  <b>Total</b> &emsp; {amount + shipping}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={handleCart} sx={{ ml: 1, mb: 1 }} size="small" variant="outlined" >
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Cart;
