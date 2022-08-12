import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GiftcardArray from './GiftcardArray'
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

const Giftcard = () => {
    const [data, setData] = useState([])
    const filterResult = (cat) => {
        const result = data.filter((currentValue) => {
            return currentValue.category == cat;
        });
        setData(result)
    }
    
    const fetchAllGiftcards = async () => {
        let res = await axios({
            method: "GET",
            url: "http://localhost:3000/"
        });

        setData(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        fetchAllGiftcards()
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            <div className='container-fluid mx-2'>
                <div className='row mt-5 mx-2'>
                    <div className='col-md-3'>
                        <h1 className='text-center secondary pb-4 pt-1'>Category</h1>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Shopping')}>Shopping</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Movie')}>Movie</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Hotel')}>Hotel</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Medicines')}>Medicines</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => filterResult('Food')}>Food</button>
                        <button className='btn btn-warning w-100 mb-4' onClick={() => setData(GiftcardArray)}>All</button>
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            {data.map((values) => {
                                const { id, title, price, img } = values
                                return (
                                    <> 
                                        <div className='col-md-4 mb-4' key={id}>
                                            <div className="card">
                                                <img src={img} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <p className="card-title text-muted">{title}</p>
                                                    <p><strong>${price}</strong></p>
                                                    <Link as={Link} to={`giftcard/${id}`}>Details</Link>
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