export default function NewProduct(){
    return(
        <div className="relative w-full h-screen px-5 py-5">
            <h1 className="text-3xl font-bold border-b-2 pl-2 pb-2 border-black dark:border-white">Add new property</h1>
            <div className="w-4/5 mt-10 px-2">
                <form action="http://localhost:3000/product/create" method="post" onKeyDown={(e) => {
                    if (e.key = 'Enter') {
                        e.preventDefault()
                        return false
                    }
                }}>
                    <div className="flex justify-between">
                        <label htmlFor="propType">Property Type</label>
                        <select name="propType" id="propType" className="text-black rounded-md">
                            <option>Pick property</option>
                            <option value="rumah">Rumah</option>
                            <option value="tanah">Tanah</option>
                            <option value="apartemen">Apartemen</option>
                            <option value="ruko">Ruko</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    )
}