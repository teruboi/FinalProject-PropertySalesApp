import { useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { useParams } from "react-router-dom"


export default function main() {
    const [data, setData] = useState(null)
    const [agreement, setAgreement] = useState([])
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

    let IDRupiah = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    useEffect(() => {
      getData()
    }, []);

    return (
        <>
            <div className="container mx-2 px-2">
                <div className="header">
                    Checkout
                </div>
                <div className="px-5 py-5 w-4/5">
                    <div className="flex items-center justify-between">
                        <div className="inline-flex items-center">
                            <img src={data?.photos?.image[0]} className="aspect-square w-20" />
                            &nbsp;&nbsp;
                            <div className="flex flex-col">
                                <strong>{data?.prop_name}</strong>
                                {data?.prop_prov +", "+ data?.prop_city}
                            </div>
                        </div>
                        <div>
                            {IDRupiah.format(data?.price)}
                        </div>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <strong className="text-lg">Ketentuan lainnya</strong>
                        <div>
                            <ul className="list-disc ml-5">
                            {agreement.map((e, i) => {
                                return(
                                    <li className="" key={i}>
                                        <div className="flex justify-between items-center">
                                            {e}
                                            <a onClick={() => {
                                                setAgreement(agreement.filter((el) => el !== e))                                                    
                                            }}>
                                                <IoMdClose className="hover:border-2 border-red-500"/>
                                            </a>
                                        </div>
                                    </li>
                                )
                            })}
                            </ul>
                        </div>
                        <input type="text" id="agreement" cols="30" rows="1" className="w-full bg-transparent" placeholder="Tambahkan ketentuan di sini" onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setAgreement(agreement.concat(e.target.value))
                                e.target.value = null
                            }
                        }}/>
                        <div>
                                
                        </div>                     
                        {/* {console.log(agreement)} */}
                    </div>
                </div>
            </div>
        </>
    )
}