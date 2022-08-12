/* Author: Lavita Pereira */
import React, { Component, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./AddProduct_css.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import constants from "../../constants/constants"

const baseURL = constants.API_BASE_URL;

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const productImgHandler = (e) => {
    setImage(e.target.files[0]);
    console.log(error)
        if (e.target.files[0] && types.includes(e.target.files[0].type)) {
          setError("");
        } else {
          setError("Please select a png or jpeg image!");
        }
  };

  const add_Product = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "shopit");
    data.append("cloud_name", "dlgnkj2h8");

    fetch("https://api.cloudinary.com/v1_1/dlgnkj2h8/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const newProduct = {
          productName: productName,
          productBrand: productBrand,
          productCategory: productCategory,
          productPrice: productPrice,
          productDescription: productDesc,
          productImage: data.secure_url,
          size: size,
        };

        axios
          .post(baseURL + "/addproduct", newProduct)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));

        setProductName("");
        setProductBrand("");
        setProductDesc("");
        setProductPrice("");
        setProductCategory("");
        setSize("");

        // this.props.history.push("/products/addproduct");

        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2 style={{color:'darkorange'}}>Add Product</h2>
    
      <Form autoComplete="off" onSubmit={add_Product} style={{width: '50%', margin: 'auto'}}>
        <Form.Group className="mb-3">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Brand</Form.Label>
          <Form.Control
            className="col-lg-4 col-md-4 col-sm-4 container justify-content-center"
            type="text"
            required
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Category</Form.Label>
          <Form.Select
            required
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="" hidden></option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Electronics">Electronics</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
            <option value="Health & Personal Care">Health & Personal Care</option>
            <option value="Beauty">Beauty</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Size</Form.Label>
          <Form.Select
            required
            value={size}
            placeholder="Size"
            disabled={productCategory === 'Men'|| productCategory === 'Women' || productCategory === 'Kids' ? false: true} 
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="" hidden></option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Price</Form.Label>
          <Form.Control
            type="number"
            required
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            onChange={(e) => setProductDesc(e.target.value)}
            value={productDesc}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="productFormLabel" style={{color:'darkblue'}}>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            required
            onChange={productImgHandler}
            accept=".jpeg, .png, .jpg"
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-primary btn-md mybtn1"
          disabled={error}
        >
          Add Product
        </Button>
      </Form>
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default AddProduct;
