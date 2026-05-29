import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-900 text-[13px] md:text-base text-white flex justify-center items-center px-4 h-16 '>
      <p>Copyright &copy; {currentYear} Get me A Chai - All rights reserved!</p>
    </footer>
  )
}

export default Footer
