import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from '../utils/axios'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'


const Details = () => {

  const navigate = useNavigate() ; 

  const [products , setproducts] = useContext(ProductContext); 
    const [product, setproduct] = useState(null); 

    const { id } = useParams();  // Extracting 'id' from route parameters
  
    // const getSingleProduct = async () => {
    //   try {
    //     const { data } = await axios.get(`/products/${id}`);  // Making an API call with 'id'
    //     setproduct(data) ; // Logging the product data
    //   } catch (error) {
    //     console.log(error);  // Error handling
    //   }
    // };
  
    // // Using useEffect to trigger the API call
    useEffect(() => {
      if (!product) {
        setproduct(products.filter(p => p.id == id)[0]) ; 
      }
    }, []);  // Add 'id' to the dependency array

    const productdeletehandler= (id) => { 
      const filteredproducts = products.filter( (p)  => p.id !== id ) ; 
      setproducts(filteredproducts) ; 
      localStorage.setItem("products" , JSON.stringify(filteredproducts) ); 
      navigate('/') ; 
    }
  
  return ( product ?
    <div className='w-[70%] flex h-full justify-between items-center m-auto p-[10%]'>
      <img className='object-contain h-[80%] w-[40%] ' src={`${product.image}`} alt="" />
      <div className='content  w-[60%]'>
        <h1 className='text-4xl'>{`${product.title}`}</h1>
        <h3 className='text-zinc-400 my-5'>{`${product.category}`}</h3>
        <h2 className='text-red-300'>${`${product.price}`}</h2>
        <p className='mb-[5%]'>{`${product.description}`} </p>
        <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300'>Edit</Link>
        <button onClick={() => productdeletehandler(product.id)} className='py-2 px-5 border rounded border-red-200 text-red-300'>delete </button>
      </div>
    </div>
    : <Loading/>
  )
}

export default Details