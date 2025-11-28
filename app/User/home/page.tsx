'use client'
import HeroBanner from '@/components/User/Home/HeroBanner'
import React from 'react'
import HomeSection from '../layouts/Home/HomeSection'
import Navbar from '@/components/User/Navbar'
import Footer from '@/components/User/Footer'

const page = () => {
  return (
    <div>
      <Navbar/>
      <HeroBanner/>
      <HomeSection/>
      <Footer/>
    </div>
  )
}

export default page
