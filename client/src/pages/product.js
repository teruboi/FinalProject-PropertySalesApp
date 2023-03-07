import React from "react";
import { useParams } from "react-router-dom";

function Product() {
    const productID = useParams().productID
  return (
    <div>
      <h1>Product</h1>
      <p>{productID}</p>
    </div>
  );
}

export default Product;
