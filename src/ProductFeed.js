import React from 'react';
import axios from 'axios';
import A from './A';
import ProductCard from './ProductCard';

class ProductFeed extends React.Component {
    constructor(props){
        super(props); // props
        this.state = {
            products: [],
            cart_products: [],
            cart_items: 0,
            cart_value: 0
        }
    }


    componentDidMount(){
        //load the products
        axios({
            method: 'GET',
            url: 'https://api.chec.io/v1/products',
            params: {},
            headers: {'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
        }).then((res) => {

            //state changes
            this.setState({
                products: res.data.data
            })
        }).catch((error) => {
            console.log(error)
        })

        if(localStorage.getItem('cartID')){
            //retrive the cart

            axios({
                method: 'GET',
                url: `https://api.chec.io/v1/carts/${localStorage.getItem('cartID')}`,
                headers: {'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
            }).then((res) => {

                const addedProducts = res.data.line_items.map((item) => item.product_id)

                this.setState({
                    cart_products: addedProducts,
                    cart_items: res.data.total_unique_items,
                    cart_value: res.data.subtotal.formatted_with_symbol
                })

            }).catch((err) => {
                console.log(err)
            })

        } else {
            //write logic to create a cart / retry existing cart.
            axios({
                method: 'GET',
                url: 'https://api.chec.io/v1/carts',
                headers: {'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'}
            }).then((res) => {
                //this gives you cart id
                localStorage.setItem('cartID', res.data.id);
                this.setState({
                    cart_items: res.data.total_unique_items,
                    cart_value: res.data.subtotal.formatted_with_symbol
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    handleAddTocart = (product_id) => {
        //add product to the cart
        axios({
            method: 'POST',
            url: `https://api.chec.io/v1/carts/${localStorage.getItem('cartID')}`,
            headers: {
                'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b',
                "Content-Type": "application/json"
            },
            data: { "id": product_id }
        }).then((res) => {

            this.setState({
                cart_products: [...this.state.cart_products, product_id],
                cart_items: res.data.cart.total_unique_items,
                cart_value: res.data.cart.subtotal.formatted_with_symbol
            })


        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className='App'>
                <h1>Hey, Adding new code</h1>
                <button
                    className='btn btn-danger'
                    onClick={() => {
                        localStorage.clear()
                        window.location.href = "/users/login"
                    }}
                >
                    Logout
                </button><br />

                <A />

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Cart</h5>
                        <p className="card-text">Total Items - {this.state.cart_items}</p>
                        <p className="card-text">Total Value - {this.state.cart_value}</p>
                        <a href="/cart/checkout" className="btn btn-primary">Checkout</a>
                    </div>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <>
                        {
                            this.state.products.length > 0 ?
                            this.state.products.map((product, index) => {
                                return(
                                    <ProductCard
                                        index={index}
                                        product={product}
                                        cart_products={this.state.cart_products}
                                        handleAddTocart={this.handleAddTocart}
                                    />
                                )
                            }) : <div>Loading.......</div>
                        }
                    </>
                </div>
            </div>
        )
    }
}

export default ProductFeed;