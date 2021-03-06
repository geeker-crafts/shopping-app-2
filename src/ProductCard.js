import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = (props) => {

    const { product, cart_products, handleAddTocart } = props;

    return (
        <div className="card" style={{width: '18rem', margin: 20}}>
            <img src={product.media.source} className="card-img-top" alt="..." style={ { height: 250 }} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p
                className="card-text"
                dangerouslySetInnerHTML={{__html: product.description}}>
                </p>
                <p>Price - {product.price.formatted_with_symbol}</p>
            </div>

            <a href={`/product/${product.id}`}>
                <button className='btn btn-primary'>View</button>
            </a>


            {
                cart_products.includes(product.id) ? (
                    <button className='btn btn-secondary'>It's Added</button>
                ) : (
                    <button
                        className="btn btn-warning"
                        onClick={() => { handleAddTocart(product.id) }}
                >Add To Cart</button>
                )
            }
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    cart_products: PropTypes.array.isRequired,
    handleAddTocart: PropTypes.func.isRequired
}

export default ProductCard;