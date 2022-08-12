// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import constants from "../../constants/constants"

const baseURL = constants.API_BASE_URL;

const Giftcard = () => {
    const [data, setData] = useState([])
    const [giftcardData, setGiftcardData] = useState([]);
    const filterResult = (cat) => {
        const result = giftcardData.filter((currentValue) => {
          return currentValue.giftcardCategory == cat;
        });
        setData(result)
    }
    
    const fetchAllGiftcards = async () => {
        let res = await axios({
            method: "GET",
            url: baseURL+"/fetchGiftCards"
        });
        setData(res.data);
        console.log(res.data);
        setGiftcardData(res.data);
    };
    useEffect(() => {
        fetchAllGiftcards()
    }, [])

    const [search, setSearch] = useState("");

     useEffect(() => {
       const result = data.filter((giftcard) => {
         return (
           giftcard.giftcardName.toLowerCase().match(search.toLowerCase()) ||
           giftcard.giftcardBrand.toLowerCase().match(search.toLowerCase()) 
         );
       });
       setData(result);
     }, [search]);

    return (
        <div>
            <NavBar></NavBar>
            <input
                type='search'
                className='search'
                placeholder='Search Giftcards...'
                onChange={event => setSearch(event.target.value)}
                style={{marginTop:'30px', width: '40%', background:"#F2F1F9", border:"none", padding:"0.5rem"}}
            />
            <div className='container-fluid mx-2'>
                <div className='row mt-5 mx-2'>
                    <div className='col-md-3'>
                        <h1 className='text-center secondary pb-4 pt-1'>Category</h1>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Shopping')}>Shopping</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Movie')}>Movie</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Hotel')}>Hotel</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Medicines')}>Medicines</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Food')}>Food</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => setData(giftcardData)}>All</button>
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            {data.map((val) => {
                                return (
                                    <> 
                                        <div className='col-md-4 mb-4' key={val._id}  style={{ margin: 0 }}>
                                            <div className="card">
                                                <img src={val.giftcardImage} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <p className="card-title text-muted">{val.giftcardName}</p>
                                                    <p className="cardbrand mt-1"
                                                        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '20px', marginTop: '-5px' }}
                                                    ><strong>{val.giftcardBrand}</strong></p>
                                                    <p><strong>${val.giftcardPrice}</strong></p>
                                                    <Link as={Link} to={`giftcard/${val._id}`}>Details</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Giftcard