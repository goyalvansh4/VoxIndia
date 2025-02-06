import React from 'react'
import { NavLink } from 'react-router'

const Sidebar = () => {
  return (
    <div className='w-full h-[90vh] px-3'>
      <h3 className='text-lg mb-5'>Menu</h3>
      <ul className='flex flex-col gap-8'>
        <li>
        <NavLink to={'/'}>
         Home
        </NavLink>
        </li>
        <li>
          <NavLink to={'/chat'}>
        Text-to-Speech
        </NavLink>
        </li>
        <li>
        <NavLink to={'/video'}>
        AI Video
        </NavLink>
        </li>
        <li>
        <NavLink to={'/settings'}>
        Settings
        </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar