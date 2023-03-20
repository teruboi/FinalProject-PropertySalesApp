export default function ProductCard({ data }) {
    return (
        <div className="card">
            <div className="product-photo">
                <img src={data.photos.image[0]} className="max-w-full max-h-full"/>
            </div>
            <div className="price">
                Rp {data.price},-
            </div>
            <div className="fade-black" />
            <div className="product-data">
                <span className="text-2xl font-semibold">{data.prop_name}</span>
                <br></br>
                <span className="inline-flex items-center">
                    {data.prop_detail.kt ? <FaBed className="mr-2"/> : null}{data.prop_detail.kt}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.prop_detail.km ? <FaShower className="mx-2"/> : null}{data.prop_detail.km}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {data.prop_detail.area}m<sup>2</sup>
                </span>
                <br></br>
                <p className="font-extralight text-sm">{data.prop_city}, {data.prop_prov}</p>
            </div>
        </div>
    )
}