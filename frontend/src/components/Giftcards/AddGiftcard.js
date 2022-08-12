// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

import React, { Component, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
// import './AddGiftcard.css'
import Form from 'react-bootstrap/Form';
import axios from 'axios';


const AddGiftcard = () => {

    const [giftcardName, setGiftcardName] = useState('')
    const [giftcardBrand, setGiftcardBrand] = useState('')
    const [giftcardPrice, setGiftcardPrice] = useState('')
    const [giftcardDesc, setGiftcardDesc] = useState('')
    const [giftcardCategory, setGiftcardCategory] = useState('')
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const giftcardImgHandler = (e) => {
        setImage(e.target.files[0])
        console.log(error)
        if (e.target.files[0] && types.includes(e.target.files[0].type)) {
          setError("");
        } else {
          setError("Please select a png or jpeg image!");
        }
  };

    // const setFileToBase = (file) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file)
    //     reader.onload = () => {
    //         setGiftcardImg(reader.result)
    //     }
    // }

    // const handleFile = (e) => {
    //     setImage(e.target.files[0])
    // }

    const add_Giftcard = (e) => {
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
        const newGiftcard = {
            giftcardName: giftcardName,
            giftcardBrand: giftcardBrand,
            giftcardCategory: giftcardCategory,
            giftcardPrice: giftcardPrice,
            giftcardDescription: giftcardDesc,
            giftcardImage: data.secure_url,
        };


        axios.post('http://localhost:8080/addgiftcard', newGiftcard)
        .then((res) => console.log(res))
          .catch((error) => console.log(error));

        setGiftcardName('')
        setGiftcardBrand('')
        setGiftcardDesc('')
        setGiftcardPrice('')
        setGiftcardCategory('')
    

    })
    .catch((err) => {
      console.log(err);
    });
};



    return (

        <div className='text-center text-md-right'>
            <h2>Add Giftcards</h2>
           
            <Form autoComplete='off' onSubmit={add_Giftcard} class="form-inline">
                <Form.Group className="mb-3">
                    {/* <Form.Label className="giftcardFormLabel">Giftcard Name</Form.Label> */}
                    <Form.Control
                        className='col-md-3'
                        type="text"
                        placeholder='Name'
                        required
                        value={giftcardName}
                        onChange={(e) => setGiftcardName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label className="giftcardFormLabel"> Giftcard Brand</Form.Label> */}
                    <Form.Control
                        className='col-md-3'
                        type="text"
                        placeholder='Brand'
                        required
                        value={giftcardBrand}
                        onChange={(e) => setGiftcardBrand(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                    {/* <Form.Label className="giftcardFormLabel"> Giftcard Category</Form.Label> */}
                    <div class="col-sm-3">
                        <Form.Select class="form-control form-control-inline" required value={giftcardCategory} onChange={(e) => setGiftcardCategory(e.target.value)}>
                        <option value="" hidden></option>
                        <option value="Shopping">Shopping</option>
                        <option value="Movie">Movie</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Medicines">Medicines</option>
                        <option value="Food">Food</option>
                    </Form.Select>
                    </div>
                    
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label className="giftcardFormLabel">Giftcard Price</Form.Label> */}
                    <Form.Control
                    className='col-md-3'
                        type="number"
                        placeholder='Price'
                        required
                        value={giftcardPrice}
                        onChange={(e) => setGiftcardPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    {/* <Form.Label className="giftcardFormLabel">Giftcard Description</Form.Label> */}
                    <Form.Control
                    className='col-md-3'
                        as="textarea"
                        placeholder='Description'
                        rows={2}
                        onChange={(e) => setGiftcardDesc(e.target.value)}
                        value={giftcardDesc}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    {/* <Form.Label className="giftcardFormLabel">Giftcard Image</Form.Label> */}
                    <Form.Control
                    className='col-md-3'
                        type="file"
                        placeholder='Image'
                        name='image'
                        required
                        onChange={giftcardImgHandler}
                        accept=".jpeg, .png, .jpg"
                    />
                   
                </Form.Group>
              
                <Button type='submit' className='align-self-start mr-auto'  disables={error}>Add Gift Card</Button>
            </Form>
            {error && <span className='text-danger'>{error}</span>}


        </div>




    )
}

export default AddGiftcard;