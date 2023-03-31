import { useState, useEffect } from 'react'
import { FiFilter } from "react-icons/fi";
import { BsSortDown } from "react-icons/bs";

import ProductCard from '../components/productCard'
import { useLocation } from 'react-router-dom';
import { getCatalog } from '../api';

export default function Catalog() {
  try {
    const location = useLocation()
    const [data, setData] = useState(null)
    const [search, setSearch] = useState("")
    const [query, setQuery] = useState("")
    

    const sendParams = (params) => {
      params.forEach(e => {
        location.search
      });
    }
  
    const getData = async () => {
      try {
        let response = await fetch(`http://localhost:3000/catalog${location.search}`)
          .then((response) => response.json())
        // console.log(response);
        setData(response)
  
      } catch (err) {
        console.error(err.message);
      }
    }

    const handleFilterChange = (e) => {
      const formData = new FormData()
    }

    const handleChange = (e) => {
      setSearch(e.target.value)
    }
  
    useEffect(()=> {
      document.title = 'Listingan.com || My Catalog'
      getData()
    },[]);
  
    // console.log(data[2].photos.image[0]);

    // const Product = data.map((e, i) => {
    //   return(
    //     <ProductCard data={e[i]} />
    //   )
    // })

    return (
      <div className="content">
          <div className="search-bar">
            <input
              className="search-input"
              placeholder="Search property..."
              onChange={handleChange}
              value={search}
            />
            <button className="block">
              <FiFilter className="w-6 h-6 mx-2 dark:stroke-white stroke-gray-800" />
            </button>
            <button>
              <BsSortDown className="w-6 h-6 mx-2 dark:fill-white fil-gray-800" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mx-5">
            <div className="col-span-3 grid grid-cols-2 gap-4">
              {data.map((e, i) => {
                return(<ProductCard data={e} key={i} />)
              })}
            </div>
            <div className="filter-box">
              <form className="form" onChange={handleFilterChange}>
                <label className='font-bold mb-2'>Tipe Properti</label>
                <div className='grid grid-cols-1 gap-2'>
                  <label className='text-sm'>
                    <input type="checkbox" name="propType" value="rumah" id='propType'/>
                    &nbsp;Rumah
                  </label>
                  <label className='text-sm'>
                    <input type="checkbox" name="propType" value="apartemen"/>
                    &nbsp;Apartemen
                  </label>
                  <label className="text-sm">
                    <input type="checkbox" name="propType" value="ruko"/>
                    &nbsp;Ruko
                  </label>
                  <label className="text-sm">
                    <input type="checkbox" name="propType" value="tanah"/>
                    &nbsp;Tanah
                  </label>
                </div>
                <div className='sidebar-blocks col-span-2' />

              </form>
            </div>
          </div>
      </div>
    )
  } catch (error) {
    console.error(error);
  }
}
