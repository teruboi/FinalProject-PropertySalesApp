import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Slideshow from '../components/slideshow'

export default function Product() {
    const [data, setData] = useState([])
    const { id } = useParams()

    const getData = async () => {
        try {
          let response = await fetch(`http://localhost:3000/product/${id}`)
            .then((response) => response.json())
          console.log(response);
          setData(response)
    
        } catch (err) {
          console.error(err.message);
        }
      }

    useEffect(() => {
        getData()
    }, []);

    return(
        <div className="content grid grid-cols-2">
            <div className="gallery">
                {<Slideshow img={data?.photos?.image} />}
            </div>
            <div className="title">
                {data.prop_name}
            </div>
            <div className="stats">

            </div>
            <div className="desc">

            </div>
        </div>
    )
}