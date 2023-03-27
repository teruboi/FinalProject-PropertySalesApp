import { FaBed, FaShower } from "react-icons/fa";
import { redirect } from "react-router-dom";

import Type from './type'

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
                        <div id="name" className="propName" onMouseOver={() => {
                            if (this.scrollWidth) {
                                
                            }
                        }}>
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