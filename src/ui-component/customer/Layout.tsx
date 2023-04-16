import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import AuthenModal from '../shared/AuthenModal'

type Props = {
    children: JSX.Element
}
const MemoizedNavbar = React.memo(() => <Navbar />)

// const MemoizedAuthenModal = React.memo(() => <AuthenModal />)


function Layout({children}: Props) {
  return (
    <>
        <MemoizedNavbar />

        <div className='wrapper-layout'>
            {children}
        </div>

        <AuthenModal />

        <Footer />
    </>
  )
}

export default Layout