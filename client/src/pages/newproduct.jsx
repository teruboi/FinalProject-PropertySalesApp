import { Alert } from 'flowbite-react';
import { useState, useRef } from 'react'
import { render } from 'react-dom';
import { useForm } from 'react-hook-form';
import { FaBed, FaCarSide, FaShower } from 'react-icons/fa';
import { GiHomeGarage } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import Toast from '../components/toast';

export default function NewProduct(){
  const { register, watch, handleSubmit, reset, formState} = useForm()
  const [images, setImages] = useState([])
  const form = useRef(null)

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
      } else {
        e.target.value = null;
        alert("Tidak boleh ada gambar duplikat")
      }
    });
  };

  const onSubmit = async data => {
    console.log(data);

    const res = fetch("http://localhost:3000/product/create", {
      method: "POST",
      body: data,
    }).then((res) => res.json());
  };

  return(
        <div className="relative w-full h-screen px-5 py-5 overflow-auto">
            <h1 className="text-3xl font-bold border-b-2 pl-2 pb-2 border-black dark:border-white">Tambah properti</h1>
            <div className="w-4/5 mt-10 px-2">
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
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
                        <input required type="text" id="propName" placeholder="Contoh: Rumah di Komplek XXX; Studio Apartemen di XXX; etc." className="w-4/5 rounded-md bg-transparent" name='propName' minLength={15} maxLength={75}/>
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="photos" className='basis-1/5'>Gambar</label>
                        <input type="file" multiple id="photos"
                        {...register("photos")} className="w-4/5 rounded-md bg-transparent basis-4/5 file:rounded-full" onChange={handleImageChange} accept="image/png, image/jpeg"/>
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
                        
                        <label htmlFor="jual" className='mr-3'>
                            <input {...register("propSale")} type="radio" value="jual" id="jual" className='mr-1'/>Jual
                        </label>
                        
                        <label htmlFor="sewa" className='mx-3'>
                            <input {...register("propSale")} type="radio" value="sewa"  id="sewa" className='mr-1'/>Sewa
                        </label>
                        
                        <label htmlFor="jual/sewa" className='mx-3'>
                            <input {...register("propSale")} type="radio" value="jual/sewa"  id="jual/sewa" className='mr-1'/>Jual/Sewa
                        </label>

                        <label htmlFor="year" className='ml-5 mr-0.5 w-1/5'>Tahun</label>
                        <input type="number" id="floor" className='w-1/6'{...register('year', {required: true, min: 0})}/>
                    </div>
                    
                    <div className="flex items-center py-2">
                        <label htmlFor="lt" className='basis-1/5'>
                            Luas Tanah
                        </label>
                        <input type="text" {...register("lt", {required: true})} id="lt" className='basis-1/5' />
                        <div className="basis-1/12" />
                        {propType!=="tanah" && (
                          <div className="flex w-[45%] items-center">
                            <label htmlFor="lb" className='basis-1/2'>
                              Luas Bangunan
                            </label>
                            <input type="text" {...register("lb", {required: true})} id="lb" className='basis-1/2' />
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
                      <div className='basis-[13.7666%]'/>
                      {propType !== "tanah" && (
                        <>
                            <label htmlFor="power" className='basis-[19.55555%]'>Listrik</label>
                            <input type="number" id="power" className='basis-[22.5%]'/>
                        </>
                      )}
                      
                    </div>
                    {propType!=="tanah" && (
                        <>
                            <div className="flex gap-x-4 items-center py-2 justify-center">
                                <label htmlFor="kt" className='inline-flex items-center'><FaBed />&nbsp;KT</label>
                                <input type="number" id="kt" className='w-1/12'{...register('kt', {required: true, min: 0})}/>
                                <div />
                                <label htmlFor="km" className='inline-flex items-center'><FaShower />&nbsp;KM</label>
                                <input type="number" id="km" className='w-1/12'{...register('km', {required: true, min: 0})}/>
                                <label htmlFor="garage" className='inline-flex items-center'><GiHomeGarage />&nbsp;Garage</label>
                                <input type="number" id="garage" className='w-1/12'{...register('garage', { min: 0 })}/>
                                <label htmlFor="carport" className='inline-flex items-center'><FaCarSide />&nbsp;Carport</label>
                                <input type="number" id="carport" className='w-1/12'{...register('carport', { min: 0 })}/>
                                <label htmlFor="floor" className='inline-flex items-center'>&nbsp;&nbsp;&nbsp;Floor</label>
                                <input type="number" id="floor" className='w-1/12'{...register('floor', {required: true, min: 0})}/>
                            </div>
                        </>
                    )}
                    <div className="flex items-center py-2">
                        <label htmlFor="condition" className='w-1/5'>Kondisi</label>
                        <select {...register("condition", {required: true})} id="condition">
                            <option className='text-gray-500'>Pilih satu...</option>
                            <option value="new">Baru</option>
                            <option value="old">Bekas</option>
                        </select>
                        <label htmlFor="facing" className='w-1/5 ml-2'>Arah muka</label>
                        <select {...register("facing", {required: true})} id="facing">
                            <option className='text-gray-500'>Pilih satu...</option>
                            <option value="N">Utara</option>
                            <option value="E">Timur</option>
                            <option value="S">Selatan</option>
                            <option value="W">Barat</option>
                        </select>
                        <label htmlFor="furniture" className='w-1/5 ml-2'>Furnitur</label>
                        <select {...register("furniture", {required: true})} id="furniture">
                            <option className='text-gray-500'>Pilih satu...</option>
                            <option value="furnished">Furnished</option>
                            <option value="semi furnished">Semi Furnished</option>
                            <option value="unfurnished">Unfurnished</option>\
                        </select>
                    </div>
                    <div className="flex items-center py-2">
                        <label htmlFor="desc" className='basis-1/5'>Deskripsi</label>
                        <textarea {...register('desc', {required: true, minLength: 50, maxLength: 2000})} className="w-4/5 rounded-md bg-transparent" id="desc" cols="30" rows="10" placeholder={`Masukkan penjelasan dan spesifikasi properti yang belum ditambahkan di atas`}/>
                    </div>
                    <h1 className="font-bold text-lg my-5">Data owner</h1>
                    <div className='flex items-center py-2'>
                        <label htmlFor="ownerName" className='basis-1/5'>Nama</label>
                        <input type="text" {...register("ownerName", {required: true})} className="basis-4/5" id="ownerName" />
                    </div>
                    <div className='flex items-center py-2'>
                        <label htmlFor="ownerNIK" className='basis-1/5'>NIK</label>
                        <input type="text" {...register("ownerNIK", {required: true, minLength: 16, maxLength: 16})} className="basis-4/5" id="ownerName" />
                    </div>
                    <div className='flex items-center py-2'>
                        <label htmlFor="ownerPhone" className='basis-1/5'>No. Telepon</label>
                        <input type="tel" {...register("ownerPhone", {required: true})} className="basis-4/5" id="ownerPhone" pattern='^(\+62|62|0)8[1-9][0-9]{6,9}$'/>
                    </div>
                    <div className='flex items-center py-2'>
                        <label htmlFor="ownerAddr" className='basis-1/5'>Alamat</label>
                        <input type="text" {...register("ownerAddr", {required: true})} className="basis-4/5" id="ownerName" />
                    </div>
                    <input type="submit" value="Tambah properti" className='bg-lightMain dark:bg-darkMain py-2 px-5 float-right my-5 rounded-md border-2 border-white shadow-lg hover:shadow-black transition-all text-white font-bold'/>
                </form>
            </div>
        </div>
    )
}