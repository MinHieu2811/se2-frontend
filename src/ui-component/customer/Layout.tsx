import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
    children: JSX.Element
}
const MemoizedNavbar = React.memo(() => <Navbar />)

function Layout({children}: Props) {
  return (
    <>
        <MemoizedNavbar />

        <div className='wrapper-layout'>
            {children}
        </div>

        <Footer />
    </>
  )
}

export default Layout