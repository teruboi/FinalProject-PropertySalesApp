import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import moment from 'moment'
import { FaShower, FaBed } from 'react-icons/fa'

// import Slideshow from '../components/slideshow'
import Type from '../components/type'

export default function Product() {
    const [data, setData] = useState([])
    const { id } = useParams()

    const handleClick = () => {

    }

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

    let IDRupiah = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
  })

  const date = new Date(data.dateAdded)

    return(
        <>
          <div className="content grid grid-cols-3 grid-flow-row gap-x-2">
            <div className="gallery">
              {/* {<Slideshow img={data?.photos?.image} />} */}
              anggap ini image slideshow
            </div>
            <div className="stats">
              <div className="text-2xl font-bold">
                {IDRupiah.format(data.price)}
              </div>
              <div className="text-lg font-semibold mt-3">
                {data.prop_name}
              </div>
              <div className="inline-flex items-center gap-x-2">
                {data?.prop_detail?.kt ? (
                  <div className="inline-flex gap-x-2 items-center">
                    <FaBed />
                    {data.prop_detail.kt}
                  </div>
                ) : null }
                {data?.prop_detail?.km ? (
                  <div className="inline-flex gap-x-2 items-center">
                    <FaShower />
                    {data.prop_detail.km}
                  </div>
                ) : null }
                <div>
                  {data?.prop_detail?.lt}m<sup>2</sup>
                </div>
              </div>
              <div className="text-sm font-thin mt-1">
                {data.prop_city}, {data.prop_prov}
              </div>
              {<p className="font-thin text-sm mt-1">{moment(date).format("D MMM")}</p>}
              <div className="relative -top-9 left-[85%]">
                {<Type type={data?.prop_detail?.prop_type} />}
              </div>
            </div>
            <div className="detail">
              <div className="font-bold text-xl h-fit col-span-2 py-2 border-b-2 my-2 ">Detail lainnya</div>
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Luas Bangunan</h1>
                <p className="font-semibold">{data?.prop_detail?.lb ? (<>{data.prop_detail.lb}m<sup>2</sup></>) : "-"}</p>
              </div>
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Lantai</h1>
                <p className="font-semibold">{data?.prop_detail?.floor}</p>
              </div>
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Sertifikat</h1>
                <p className="font-semibold">{data?.prop_detail?.cert}</p>
              </div>
              <div className="col-span-2 grid grid-cols-4 h-fit">
                <h1 className="font-thin">Fasilitas</h1>
                <div className="font-semibold col-span-3 grid grid-rows-2 grid-cols-3">
                  <p>{data?.prop_detail?.carport ? "Carport" : null}</p>
                  <p>{data?.prop_detail?.garage ? "Garage" : null}</p>
                </div>
              </div>
              <div className="col-span-2">
                <a onClick={handleClick} className="h-fit w-full text-center ">
                  <div className="px-5 py-2 hover:bg-black/5">
                    Lainnya...
                  </div>
                </a>
              </div>
              
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Power</h1>
                  <p className="font-semibold">{data?.prop_detail?.power ? data.prop_detail.power+" VA" : "-"}</p>
              </div>
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Kondisi</h1>
                <p className="font-semibold">{data?.prop_detail?.condition.charAt(0).toUpperCase()+data?.prop_detail?.condition.slice(1)}</p>
              </div>
              <div className="grid grid-cols-2 h-fit">
                <h1 className="font-thin">Tahun</h1>
                <p className="font-semibold">{data?.prop_detail?.year}</p>
              </div>
            </div>
            <div className="desc">
              <h1 className="font-bold text-xl w-full py-2 border-b-2">Deskripsi</h1>
              <p className="py-2 text-justify">{data?.prop_detail?.description}</p>
            </div>
            div.
          </div>

          <div className="modal">

          </div>
        </>
    )
}