import { FaBed, FaShower } from "react-icons/fa";
import { useSearchParams, useLocation, useParams } from 'react-router-dom'

export default function test() {
    const [query, setQuery] = useSearchParams()
    const url = useLocation()
    const { id } = useParams()

    console.log(id);

    return (
        <div className="content">
            <form action={url} method="get" className="w-1/3 grid grid-cols-2 gap-y-4">
                <label htmlFor="propType">Tipe properti</label>
                <select name="propType" id="propType">
                    <option className="text-gray-700/50">Pilih tipe properti</option>
                    <option value="rumah">Rumah</option>
                    <option value="apartemen">Apartemen</option>
                    <option value="ruko">Ruko</option>
                    <option value="tanah">Tanah</option>
                </select>
                <input type="range" class="range-slider-input-left" tabindex="0" max="100" min="0" step="1" />
	            <input type="range" class="range-slider-input-right" tabindex="0" max="100" min="0" step="1" />
            </form>

            <div className="h-fit w-fit font-bold rounded-xl px-1 bg-amber-300 border-4 border-amber-700 text-amber-700">TNH</div>
        </div>
    )
}