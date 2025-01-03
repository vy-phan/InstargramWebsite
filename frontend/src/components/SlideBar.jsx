import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdNotifications } from 'react-icons/io'
import { IoCreateOutline } from 'react-icons/io5'
import Avatar1 from '../assets/img/FB_IMG_1708595704236.jpg'

const SlideBar = () => {
  return (
    <div className='flex flex-col gap-8 px-4 py-4'>
      <Link to="/" className='flex items-center gap-4'>
        <AiFillHome className='text-2xl'/>
        <span>Home</span>
      </Link>

      <Link to="/search" className='flex items-center gap-4'>
        <BiSearch className='text-2xl'/>
        <span>Search</span>
      </Link>

      <Link to="/create" className='flex items-center gap-4'>
        <IoCreateOutline className='text-2xl'/>
        <span>Create</span>
      </Link>

      <Link to="/profile" className='flex items-center gap-4'>
        <img 
          src={Avatar1} 
          alt="profile" 
          className='w-7 h-7 rounded-full'
        />
        <span>Profile</span>
      </Link>
    </div>
  )
}

export default SlideBar
