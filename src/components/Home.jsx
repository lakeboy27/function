import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
// import axios from '../utils/axios'

const Home = () => {
  const [products] =  useContext(ProductContext); 
  // console.log(products)
  const {search } = useLocation() ; 
  const category = decodeURIComponent(search.split("=")[1]); 

  const [filterproducts, setFilterproducts] = useState(null)

  // console.log(category )
  // const getproductcategory = async () => { 
  //   try{ 
  //     const {data } = await axios.get(`/products/category/${category}`)
  //     setFilterproducts(data); 
  //   }catch(error){ 
  //     console.log(error) ;
  //   }
  // }

  useEffect(()=> { 
    if (!filterproducts || category == "undefined" ) setFilterproducts(products); 
    if (category != "undefined") {

      setFilterproducts(products.filter((p) => p.category == category)); 

    }
  }, [category , products])

  return products ?  (
    

    <>
    <Nav/>
    <div className=' w-[85%]  p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'> 
       
    { filterproducts && filterproducts.map((p, i) => (
  <Link
    to={`/details/${p.id}`}  // Assuming each product has an id, replace `1` with dynamic id
    key={i}  // It's a good practice to use a unique key when mapping elements
    className="mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[35vh] flex-col flex justify-center items-center"
  >
    <div
      className="hover:scale-110 w-full mb-3 h-[80%] bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${p.image})` }}
    ></div>
    <h1 className="hover:text-blue-300">{p.title}</h1>
  </Link>
))}


       
      


     </div>
    </>

)
:<Loading/>
}

export default Home