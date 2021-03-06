import React from 'react';
import { useParams } from "react-router-dom";

const ProductDetails = () => {

    let { productID } = useParams();

    // product id
    return(
        <div>
            {`We are seeing details of this product ${productID}`}
        </div>
    )
}


export default ProductDetails;