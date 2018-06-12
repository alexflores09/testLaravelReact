import React, { Component } from 'react';

/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const Product = ({product}) => {

    //if the props product is null, return Product doesn't exist
    if(!product) {
        return(<div/>);
    }

    //Else, display the product data
    return(
        <div>
            <div className="card">
                <div className="card-header">
                    {product.title}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.description}</h5>
                    <p className="card-text">Status: {product.availability ? 'Disponible' : 'No disponible'}</p>
                    <p className="card-text">Price : {product.price}</p>
                </div>
            </div>
        </div>
    )
}

export default Product ;