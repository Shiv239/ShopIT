// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

import React, { Component } from 'react'

const SearchBox = (props) => {
    return (
        <>
            <input type='search'
        className='search'
        placeholder={props.placeholder}
        onChange={props.handleChange}
        style={{ minHeight: '100%' }} 
            />


        </>
    )
}

export default SearchBox;