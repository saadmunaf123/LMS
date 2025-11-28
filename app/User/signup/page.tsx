import Footer from '@/components/User/Footer'
import Navbar from '@/components/User/Navbar'
import SignUp from '@/components/User/SignUp/SignUp'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar/>
      <SignUp/>
      <Footer/>
    </div>
  )
}

export default page