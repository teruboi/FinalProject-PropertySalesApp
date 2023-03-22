import { FaBed, FaShower } from "react-icons/fa";
import { redirect } from "react-router-dom";

function Type({ type }) {

    switch (type) {
        case "tanah":
            return (
                <div className="propType bg-amber-300 border-amber-700 text-amber-700">TNH</div>
            )
        case "rumah":
            return (
                <div className="propType bg-lime-300 border-lime-700 text-lime-700">RMH</div>
            )
        case "apartment":
            return (
                <div className="propType bg-red-300 border-red-700 text-red-700">APT</div>
            )
        case "ruko":
            return (
                <div className="propType bg-blue-300 border-blue-700 text-blue-700">RUK</div>
            )
    }
}

export default function ProductCard({ data }) {
    if(data === undefined){
        return null
    }

    function overflow(id) {
        return (document.getElementById(id).scrollWidth > document.getElementById(id).offsetWidth)
    }

    console.log(data);

    let IDRupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    return (
        <>
            <a href={`/products/${data.id}`}>
                <div className="card">
                    <div className="product-photo">
                        <img src={`${data.photos.image[0]}`} className="max-w-full max-h-full"/>
                    </div>
                    <div className="price">
                        {IDRupiah.format(data.price)}
                    </div>
                    <Type type={data.prop_detail.prop_type}/>
                    <div className="fade-black" />
                    <div className="product-data">
                        <div id="name" className="propName ">
                            {data.prop_name}
                        </div>
                        <br></br>
                        <span className="mt-1 inline-flex items-center w-full text-sm">
                            {data.prop_detail.kt ? <span className="inline-flex"><FaBed />&nbsp;&nbsp;{data.prop_detail.kt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}
                            {data.prop_detail.km ? <span className="inline-flex"><FaShower />&nbsp;&nbsp;{data.prop_detail.km}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : null}
                            {data.prop_detail.lt}m<sup>2</sup>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <strong className="justify-end">{data.prop_detail.prop_sale.toUpperCase()}</strong>
                        </span>
                        <br></br>
                        <p className="font-extralight text-sm">{data.prop_city}, {data.prop_prov}</p>
                    </div>
                </div>
            </a>
        </>
        
    )
}