import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
    children: JSX.Element
}

function Layout({children}: Props) {
  return (
    <>
        <Navbar />

        <div className='wrapper-layout'>
            {children}
        </div>

        <Footer />
    </>
  )
}

export default Layout