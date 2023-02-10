import React from 'react'
import Navbar from '../ui-component/shared/Navbar'
import Footer from '../ui-component/shared/Footer'
import Sidebar from '../ui-component/shared/Sidebar'

const Home = () => {
  return (
    <>
        <Navbar />
        <Sidebar />
        <footer>
            <Footer />
        </footer>
    </>
  )
}

export default Home