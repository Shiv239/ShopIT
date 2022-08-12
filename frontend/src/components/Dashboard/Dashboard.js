import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import Product from '../Product/Product'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Product></Product>
            </div>
        )
    }
}
