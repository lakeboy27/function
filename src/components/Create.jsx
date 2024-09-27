import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {
    const navigate = useNavigate() ; 

    const [products , setproducts] = useContext(ProductContext); 

    const [title, settitle] = useState(""); 
    const [image, setimage] = useState(""); 
    const [category, setcategory] = useState(""); 
    const [price, setprice] = useState(""); 
    const [description, setdescription] = useState(""); 


    const AddproductHandler = (e)=> { 
        e.preventDefault() ;

        if( title.trim().length < 5 || image.trim().length < 5 || category.trim().length < 5 || price.trim().length < 1 || description.trim().length < 5 ){ 
            alert("everyfield must have atleast 4 character ") ; 
            return ;
        }

        const product = {id: nanoid() ,  image , title , category , price , description } ; 
        console.log(products) ;
        console.log(product) ;
        setproducts([...products , product]) ; 
        localStorage.setItem('products' , JSON.stringify([...products , product])) ; 
        toast.success("Product Added Successfully")
        navigate("/") ; 
    } 

  return (
    <form onSubmit={AddproductHandler} className='flex flex-col items-center  p-[5%] w-screen h-screen'>
        <h1 className='w-1/2 mb-5 text-3xl'>Add new product</h1>
        <input type="url" placeholder='image link' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e)=> setimage(e.target.value)}  value={image}></input>
       <input type='text' placeholder='title' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3' onChange={(e)=> settitle(e.target.value)} value={title}></input>
       <div className='w-1/2 flex justify-between'>
       <input type='text' placeholder='category' className='text-xl bg-zinc-100 rounded p-3 w-[49%] mb-3' onChange={(e)=> setcategory(e.target.value)} value={category}></input>
       <input type='number' placeholder='price' className='text-xl bg-zinc-100 rounded p-3 w-[49%] mb-3' onChange={(e)=> setprice(e.target.value)} value={price}></input>
       </div>
       <textarea onChange={(e)=> setdescription(e.target.value)} value={description} placeholder='Enter product description here... ' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3' name="description" rows="10"></textarea>
       <div className='w-1/2'>
         <button className='py-2 px-5 border rounded border-blue-200 text-blue-300' href="/create">ADD New product </button>

       </div>
    </form>
  )
}

export default Create