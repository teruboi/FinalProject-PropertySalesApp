import { ImPrevious, ImNext } from "react-icons/im"
import { useState } from "react";

export default function Slideshow({ img }) {
    if (img === undefined) {
        return null
    }

    const [currIndex, setCurrIndex] = useState(0)

    const goPrev = () => {
        if (currIndex<=0) {
            setCurrIndex(img.length-1)
        } else {
            setCurrIndex(currIndex-1)
        }
    }

    const goNext = () => {
        if (currIndex>=img.length-1) {
            setCurrIndex(0)
        } else {
            setCurrIndex(currIndex+1)
        }
    }

    return (
        <div className="relative h-full w-fit flex-col">
            <div className="slides" >
                <img src={img[currIndex]} alt="" />
                <div className="number">{currIndex+1} / {img.length}</div>
            </div>
            
            <a onClick={goPrev} className="prev">
                <ImPrevious className="bg-white/50 rounded-full w-10 h-10"/>
            </a>

            <a onClick={goNext} className="next">
                <ImNext className="bg-white/50 rounded-full w-10 h-10"/>
            </a>

            <div className="flex w-fit bottom-0 overflow-auto">
                {img.map((e, i) => {
                    return(<a onClick={() => setCurrIndex(i)} className="navimg" key={i}>
                        <img src={e} className="w-full h-full" />
                    </a>)
                })}
                
            </div>
            

        </div>
    )
}