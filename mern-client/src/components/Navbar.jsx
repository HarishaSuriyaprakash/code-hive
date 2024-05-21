import React, { useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../context/AuthProvider';
import { useContext } from 'react';




const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen] =useState(false);
    const [isSticky,setIsSticky] =useState(false);
    const {user}=useContext(AuthContext);
    console.log(user);

    //toggle menu
    const toggleMenu =()=>{
        setIsMenuOpen(!isMenuOpen);
    }

    useEffect(()=>{
      const handleScroll =() =>{
        if(window.scrollY>100){
          setIsSticky(true);
        }else{
          setIsSticky(false);
        }
      }

      window.addEventListener('scroll',handleScroll);
      return()=>{
        window.addEventListener('scroll',handleScroll);
      }

},[])
const navItems = [
  { link: "Home", path: "/" },
  { link: "About", path: "/about" },
  { link: "Shop", path: "/shop" },
  { link: "Sell Your Books", path: "/admin/dashboard" },
  { link: "Blog", path: "/blog" }
];
  return (
    <header className='w-full bd-transparengt fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
    <nav className={`py-4 lg:px-24 px-4 ${isSticky?"sticky top-0 left-0 right-0 bg-blue-300":""}`}>
<div className='flex justify-between items-centre text-base gap-8'>
{/*logo*/}
<Link to="/" className='text-2xl font-bold text-blue-700 flex items-center gap-2'><FaBlog className='inline-block'/>BookHive</Link>


<ul className='md:flex space-x-12 hidden'>
  {
    navItems.map(({link,path})=><Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer hover:text-blue-700'>{link}</Link>)
  }
</ul>

<div className='space-x-12 hidden lg:flex items-centre'>
  <button><FaBarsStaggered className='w-5 hover:text-blue-700'/></button>
 \
</div>

{/* menu */}
<div className='md:hidden'>
  <button onClick={toggleMenu} className='text-black focus:outline-none'>
    {
      isMenuOpen?<FaXmark className='h-5 w-5 text-black'/>:<FaBarsStaggered className='h-5 w-5 text-black'/>
      
    }
  </button>
</div>
</div>

<div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ?"block fixed top-0 right-0 left-0":"hidden"}`}>
  {
navItems.map(({link,path}) => <Link key={path} to={path} className='block text-base text-white uppercase cursor-pointer '>{link}</Link>)
}
</div>
  </nav>
  </header>
  )
}

export default Navbar