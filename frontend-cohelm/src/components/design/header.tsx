import React from 'react'

interface HeaderProps {
    title: string;
}

const Header = ({title}: HeaderProps) => {
  return (
    <p className='text-2xl mb-4 font-semibold'>{title}</p>
  )
}

export default Header