import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoriesSection from '../components/CategoriesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import BestSellers from '../components/BestSellers'

const Home = () => {
  return (
    <div className='w-full h-auto bg-white'>
       <div>
         {/* Hero section */}
         <HeroSection/>
         {/* Categories section */}
         <CategoriesSection/>
         {/* WhyChooseUs section */}
         <WhyChooseUs/>
         {/* BestSellers section */}
         <BestSellers/>
       </div>

    </div>
  )
}

export default Home