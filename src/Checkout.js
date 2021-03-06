import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [cartData, setCartData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    //componentDidMount - class
    //useEffect with 0 values in array - fuctional
    useEffect(() => {
        setIsLoading(true)
        //api call
        //localStorage
        axios({
            method: 'GET',
            url: `https://api.chec.io/v1/carts/${localStorage.getItem('cartID')}`,
            headers: {'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
        }).then((res) => {
            setCartData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    const handleDelete = (line_item_id) => {
        const confimation = window.confirm('Do you want to delete this product?'); //false, true

        if(confimation == true){
            setIsLoading(true)

            axios({
                method: 'DELETE',
                url: `https://api.chec.io/v1/carts/${localStorage.getItem('cartID')}/items/${line_item_id}`,
                headers: {'X-Authorization': 'pk_185066f1f96affca255ca48cd4a64803a4b791d6d0d5b'},
            }).then((res) => {
                setCartData(res.data.cart)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    return (
        <div className="App">
            <h1>Checkout</h1>
            <a href='/'><button className='btn btn-primary'>Go Back</button></a><br />
            {
                isLoading && (
                    <>
                        <div className="spinner-border text-primary" role="status">
                        </div>
                        <div className="spinner-border text-secondary" role="status">
                        </div>
                        <div className="spinner-border text-success" role="status">
                        </div>
                    </>
                )
            }
            {
                cartData != undefined && (
                    <div style={{width: '50%', margin: '0px auto', marginTop: 50}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartData.line_items && cartData.line_items.map((item, index) => {
                                    return (
                                        <tr>
                                            <td scope="row">{index+ 1}</td>
                                            <td>{item.product_name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price.formatted_with_symbol}</td>
                                            <td>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => { handleDelete(item.id) }}
                                                >Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{cartData.subtotal.formatted_with_symbol}</td>
                                <td></td>
                            </tr>
                        </tbody>
                        <button className='btn btn-warning'>Goto Payment</button>
                    </table>
                </div>
                )
            }

        </div>
    )
}

export default Checkout;

