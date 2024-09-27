import React,{useContext} from 'react'
import { ProductContext } from '../utils/Context'
import { Link } from 'react-router-dom';

const Nav = () => {
  const [products] = useContext(ProductContext) ;

  let dist_category = products && products.reduce((acc, cv)=>[...acc ,cv.category] , [] )
  dist_category = [...new Set(dist_category)] ; 

  const color = () => { 
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)` 
  }
  // console.log(color())

  return (
    <nav className='w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5'>
    <a className='py-2 px-5 border rounded border-blue-200 text-blue-300' href="/create">ADD New product </a>
    <hr className='my-3 w-[80%]'/>
    <h1 className='text-2xl mb-3 w-[80%]'>category filter</h1>
    <div className=' w-[80%] ' >

      {dist_category.map((c , i) => (
        <Link to={`/?category=${c}`} key={i} className='flex items-center mb-3'><span style={{backgroundColor: color()}} className='rounded-full mr-2 w-[15px] h-[15px] bg-blue-200'></span>{c} </Link>

      ))}
     
      
    </div>
  </nav>

  )
}

export default Nav