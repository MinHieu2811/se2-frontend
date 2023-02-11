import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

type Props = {
    children: JSX.Element
}

const Layout = ({children}: Props) => {
  return (
    <>
        <nav>
            <Navbar />
        </nav>
        <>
            <Sidebar />
        </>
        <>
            {children}
        </>
        <footer>
            <Footer />
        </footer>
    </>
  )
}

export default Layout