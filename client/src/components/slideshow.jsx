import { ImPrevious, ImNext } from "react-icons/im"
import { useState } from "react";

export default function Slideshow({ img }) {
    if (img === undefined) {
        return null
    }

    let image = img

    const [currIndex, setCurrIndex] = useState(0)

    const goPrev = () => {
        if (currIndex<=0) {
            setCurrIndex(image.length-1)
        } else {
            setCurrIndex(currIndex-1)
        }
    }

    const goNext = () => {
        if (currIndex>=image.length-1) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex+1)
        }
    }

    return (
        <div className="container">
            <div className="slides" >
                <img src={image[currIndex]} className="z-0" />
                <div className="number">{currIndex+1} / {image.length}</div>

                <a onClick={goPrev} className="prev">
                    <ImPrevious className="bg-white/50 rounded-full w-10 h-10"/>
                </a>

                <a onClick={goNext} className="next">
                    <ImNext className="bg-white/50 rounded-full w-10 h-10"/>
                </a>

            </div>
            

            <div className="flex w-fit bottom-0 overflow-auto">
                {image.map((e, i) => {
                    return(<a onClick={() => setCurrIndex(i)} className="navimg" key={i}>
                        <img src={e} className="w-full h-full" />
                    </a>)
                })}
                
            </div>
            

        </div>
    )
}