import { Alert } from 'flowbite-react';
import { useState } from 'react'
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { FaBed, FaCarSide, FaShower } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import Toast from '../components/toast';

export default function NewProduct(){
  const { register, watch, handleSubmit, reset, formState} = useForm()
  const [images, setImages] = useState([])

  const propType = watch("propType")

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
      console.log(images)
      console.log(imageArray);
      if(!images.includes(imageArray[0])){
        setImages((prevImages) => prevImages.concat(imageArray))
        e.target.value = null;
      } else {
        e.target.value = null;
        alert("Tidak boleh ada gambar duplikat")
      }
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(data);

    const res = await fetch("http://localhost:3000/upload-file", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };

  return(
        <div className="relative w-full h-screen px-5 py-5 overflow-auto">
            <h1 className="text-3xl font-bold border-b-2 pl-2 pb-2 border-black dark:border-white">Tambah properti</h1>
            <div className="w-4/5 mt-10 px-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-between items-center py-2">
                    <label htmlFor="propType">Tipe Properti</label>
                    <select id="propType" className="rounded-md bg-transparent" {...register("propType", { required: true })}>
                      <option className='text-gray-500'>Pilih satu...</option>
                      <option value="rumah">Rumah</option>
                      <option value="tanah">Tanah</option>
                      <option value="apartemen">Apartemen</option>
                      <option value="ruko">Ruko</option>
                    </select>
                  </div>
                    <div className="flex justify-between items-center py-2">
                        <label htmlFor="propName">Nama Properti</label>
                        <input required type="text" id="propName" placeholder="Contoh: Rumah di Komplek XXX; Studio Apartemen di XXX; etc." className="w-4/5 rounded-md bg-transparent" name='propName' minLength={10} maxLength={75}/>
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="propName" className='basis-1/5'>Gambar</label>
                        <input type="file" multiple id="photos"
                        {...register("photos", {required: true})} className="w-4/5 rounded-md bg-transparent basis-4/5 file:rounded-full" onChange={handleImageChange} accept="image/png, image/jpeg"/>
                    </div>
                    <div className='flex items-center py-2'>
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
                                {/* {console.log(images)} */}
                            </div>
                            ))}
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="price" className='basis-1/5'>Price</label>
                        <input type="number" name="price" id="price" className='basis-4/5'/>
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="propProv" className='basis-1/5'>
                            Provinsi
                        </label>
                        <input type="text" name="propProv" id="propProv" className='basis-[20.666667%]' />
                        <div className="basis-1/12" />
                        <label htmlFor="propCity" className='basis-1/5'>
                            Kota
                        </label>
                        <input type="text" name="propCity" id="propCity" className='basis-[20.666667%]' />
                    </div>
                    <div className="flex items-center py-2">
                        <label className='basis-1/5'>Tipe Transaksi</label>
                        
                        <label htmlFor="jual" className='mx-5'>
                            <input type="radio" value="jual" name="propSale" id="jual" className='mr-1'/>Jual
                        </label>
                        
                        <label htmlFor="sewa" className='mx-5'>
                            <input type="radio" value="sewa" name="propSale" id="sewa" className='mr-1'/>Sewa
                        </label>
                        
                        <label htmlFor="jualsewa" className='mx-5'>
                            <input type="radio" value="jual/sewa" name="propSale" id="jualsewa" className='mr-1'/>Jual/Sewa
                        </label>
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="propProv" className='basis-1/5'>
                            Luas Tanah
                        </label>
                        <input type="text" name="propProv" id="propProv" className='basis-1/5' />
                        <div className="basis-1/12" />
                        {propType!=="tanah" && (
                          <div className="flex w-[45%] items-center">
                            <label htmlFor="propCity" className='basis-1/2'>
                              Luas Bangunan
                            </label>
                            <input type="text" name="propCity" id="propCity" className='basis-1/2' />
                          </div>
                        )}
                    </div>
                    <div className="flex items-center py-2">
                      <label htmlFor="cert" className='basis-1/5'>
                        Sertifikat
                      </label>
                      <select id="cert" className='basis-1/5 ' {...register("cert", {required: true})}>
                        <option className='text-gray-500'>Pilih satu...</option>
                        <option value="HGB">HGB</option>
                        <option value="SHM">SHM</option>
                        <option value="AJB">AJB</option>
                        <option value="Girik">Girik</option>
                        <option value="SHSRS">SHSRS</option>
                        <option value="HPL">HPL</option>
                        <option value="Strata Title">Strata Title</option>
                      </select>
                    </div>
                    {propType!=="tanah" && (
                      <div className="flex gap-x-4 items-center py-2 justify-center">
                        <label htmlFor="kt" className='inline-flex items-center'><FaBed />&nbsp;KT</label>
                        <input type="number" id="kt" className='w-1/12'{...register('kt', {required: true, min: 0})}/>
                        <div />
                        <label htmlFor="km" className='inline-flex items-center'><FaShower />&nbsp;KM</label>
                        <input type="number" id="km" className='w-1/12'{...register('km', {required: true, min: 0})}/>
                        <label htmlFor="garage" className='inline-flex items-center'><GiHomeGarage />&nbsp;Garage</label>
                        <input type="number" id="garage" className='w-1/12'{...register('garage', {required: true, min: 0})}/>
                        <label htmlFor="carport" className='inline-flex items-center'><FaCarSide />&nbsp;Carport</label>
                        <input type="number" id="carport" className='w-1/12'{...register('carport', {required: true, min: 0})}/>
                        <label htmlFor="floor" className='inline-flex items-center'>&nbsp;&nbsp;&nbsp;Floor</label>
                        <input type="number" id="floor" className='w-1/12'{...register('floor', {required: true, min: 0})}/>
                      </div>
                    )}
                </form>
            </div>
        </div>
    )
}