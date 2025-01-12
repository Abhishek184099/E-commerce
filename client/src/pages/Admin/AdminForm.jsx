import React from 'react'
import { useState } from 'react'
import useUpload from "../../hooks/useAdminUpload"

export default function AdminForm() {


  const {upload} = useUpload()

  const [productData ,setProductData] = useState({
    title : "",
    price : "",
    inStock : "",
    description : "",
    image : null
  })

  const handleSubmit = async(e) =>{
		e.preventDefault();

   
    await upload(productData);

    setProductData({
      title : "",
      price : "",
      inStock : "",
      description : "",
      image : null
    })


  }

  return (
    <div className='flex justify-center items-center mx-80 mt-10'>
     <form  className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
      <div className="mb-4" >
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          value={productData.title}
          onChange={(e) => setProductData({...productData, title: e.target.value})}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({...productData, price: e.target.value})}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
        <input
          type="text"
          placeholder="Category"
        //   value={category}
        //   onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          placeholder="Description"
          value={productData.description}
          onChange={(e) => setProductData({...productData, description: e.target.value})}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Upload Picture</label>
        <input
          type="file"
          onChange={(e) => 
            setProductData({ ...productData, image: e.target.files[0] })
          }

          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Product
        </button>
      </div>
    </form>

    </div>
  )
}
