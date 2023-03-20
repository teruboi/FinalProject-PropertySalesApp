import { FaBed, FaShower } from "react-icons/fa";


export default function test() {
    return (
        <div className="ml-6 h-screen w-screen">
            <div className="card">
                <div className="product-photo">
                    <img src="/img_placeholder.png" className="max-w-full max-h-full"/>
                </div>
                <div className="price">
                    Rp xx.xxx.xxx,-
                </div>
                <div className="fade-black" />
                <div className="product-data">
                    <span className="text-2xl font-semibold">Property Name</span>
                    <br></br>
                    <span className="inline-flex items-center">
                        <FaBed className="mr-2"/>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaShower className="mx-2"/>1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 60m<sup>2</sup>
                    </span>
                    <br></br>
                    <p className="font-extralight text-sm">BANDUNG, JAWA BARAT</p>
                </div>
            </div>
        </div>
    )
}