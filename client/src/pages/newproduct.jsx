import { useState } from 'react'
import { GrClose } from 'react-icons/gr';

export default function NewProduct(){
    const [images, setImages] = useState([])

    const handleImageChange = (e) => {
        const fileArray = Array.from(e.target.files);
        Promise.all(
          fileArray.map((file) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                resolve(reader.result);
              };
              reader.onerror = (error) => {
                reject(error);
              };
            });
          })
        ).then((imageArray) => {
          setImages((prevImages) => prevImages.concat(imageArray));
        });
      };

    return(
        <div className="relative w-full h-screen px-5 py-5 overflow-auto">
            <h1 className="text-3xl font-bold border-b-2 pl-2 pb-2 border-black dark:border-white">Add new property</h1>
            <div className="w-4/5 mt-10 px-2">
                <form action="http://localhost:3000/product/create" method="post" encType="multipart/form-data">
                    <div className="flex justify-between items-center py-2">
                        <label htmlFor="propType">Property Type</label>
                        <select name="propType" id="propType" className="text-black rounded-md" required>
                            <option>Pick property</option>
                            <option value="rumah">Rumah</option>
                            <option value="tanah">Tanah</option>
                            <option value="apartemen">Apartemen</option>
                            <option value="ruko">Ruko</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <label htmlFor="propName">Property Name</label>
                        <input required type="text" name="propName" id="propName" placeholder="Contoh: Rumah di Komplek XXX; Studio Apartemen di XXX; etc." className="w-4/5 rounded-md bg-transparent" />
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="propName" className='basis-1/5'>Photos</label>
                        <input required type="file" multiple name="photos" id="photos" className="w-4/5 rounded-md bg-transparent basis-4/5" onChange={handleImageChange} accept="image/png, image/jpeg"/>
                    </div>
                    <div className='flex'>
                            {images.map((image, index) => (
                            <div key={index} className="aspect-square w-48 overflow-hidden mr-2 rounded-sm relative">
                                <img src={image} alt={`image-${index}`} />
                                <a onClick={() => {
                                    setImages(images.filter(el => el !== image))
                                }} className="absolute top-0 right-0">
                                    <div className='rounded-full px-0.5 py-0.5 bg-red-500'>
                                        <GrClose style={{outlineColor:"#FFFFFF"}} />
                                    </div>
                                    
                                </a>
                            </div>
                            ))}
                        </div>
                </form>
            </div>
        </div>
    )
}