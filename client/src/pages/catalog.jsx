import { useState, useEffect } from 'react'
import { FiFilter } from "react-icons/fi";
import { BsSortDown } from "react-icons/bs";

import ProductCard from '../components/productCard'
import { getAgent, getCatalog } from '../api';
import { useLocation } from 'react-router-dom';

export default function Catalog() {
  const location = useLocation()
  const [data, setData] = useState([])

  useEffect(()=> {
    setData(getCatalog(location.search))
    console.log(data);
  },[data]) 

  console.log(data);

  const Product = data.map(e => 
    <ProductCard data={e} />
    )
  try {
    return (
      <div className="flex-grow">
          <div className="flex static w-auto mx-5 my-5 bg-[#525252] h-10 items-center justify-center px-5 py-6 rounded-lg ">
            <input
              className="w-full bg-transparent border-b-white border-b focus:outline-0 caret-white text-white placeholder:text-white/33"
              placeholder="Search property..."
            />
            <button className="block">
              <FiFilter className="w-6 h-6 mx-2 stroke-white" />
            </button>
            <button>
              <BsSortDown className="w-6 h-6 mx-2 fill-white" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mx-5">
            <div className="colspan-1">

            </div>
            <div className="colspan-2 grid grid-cols-2 gap-4">
              <Product />
            </div>
          </div>
      </div>
    );
  } catch (err) {
    console.error(err);
  }
  
}
