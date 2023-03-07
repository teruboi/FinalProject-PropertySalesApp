import React from "react";
import { useParams } from "react-router-dom";

function Catalog() {
    const userID = useParams().userID
  return (
    <div>
      <h1>Catalog</h1>
    </div>
  );
}

export default Catalog;
