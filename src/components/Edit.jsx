import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../utils/Context';

const Edit = () => {
    const [products , setproducts] = useContext(ProductContext); 
    const navigate = useNavigate() ; 
    const {id } = useParams() ; 
    const [product, setProduct] = useState({
        title : "", 
        description : "" , 
        image : "" ,
        price : "" , 
        category : ""
    }); 
   
    const changeHandler = (e) => {
        // console.log(e.target.name , e.target.value ) ; 
       

        setProduct({...product , [e.target.name] : e.target.value})
    }

    useEffect(()=>{ 
        setProduct(products.filter((p) => p.id == id)[0]) ; 
    },[id])
    // console.log(product); 

    const AddproductHandler = (e)=> { 
        e.preventDefault() ;

        if( product.title.trim().length < 5 || product.image.trim().length < 5 || product.category.trim().length < 5 || product.price.trim().length < 1 || product.description.trim().length < 5 ){ 
            alert("everyfield must have atleast 4 character ") ; 
            return ;
        }
        const pi = products.findIndex((p) => p.id == id ) ; 
        const copyData = [...products] ; 
        copyData[pi] = {...products[pi] , ...product } 
        console.log(copyData) ;

        // const product = {id: nanoid() ,  image , title , category , price , description } ; 
        // console.log(products) ;
        setproducts(copyData) ; 
        localStorage.setItem('products' , JSON.stringify(copyData)) ; 
        navigate(-1) ; 

    } 



  return (
    <form onSubmit={AddproductHandler} className='flex flex-col items-center  p-[5%] w-screen h-screen'>
    <h1 className='w-1/2 mb-5 text-3xl'>Edit product</h1>
    <input type="url" placeholder='image link' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3' name='image' onChange={changeHandler}  value={product && product.image}></input>
   <input type='text' placeholder='title' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'  name='title' onChange={changeHandler} value={product && product.title}></input>
   <div className='w-1/2 flex justify-between'>
   <input type='text' placeholder='category' className='text-xl bg-zinc-100 rounded p-3 w-[49%] mb-3'  name='category' onChange={changeHandler} value={product && product.category}></input>
   <input type='number' placeholder='price' className='text-xl bg-zinc-100 rounded p-3 w-[49%] mb-3'  name='price' onChange={changeHandler} value={product && product.price}></input>
   </div>
   <textarea  name='description' onChange={changeHandler} value={product && product.description} placeholder='Enter product description here... ' className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3' rows="10"></textarea>
   <div className='w-1/2'>
     <button className='py-2 px-5 border rounded border-blue-200 text-blue-300' href="/create">Edit product </button>

   </div>
</form>
  )
}

export default Edit