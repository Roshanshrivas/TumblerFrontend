import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoriesSection from '../components/CategoriesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import BestSellers from '../components/BestSellers'
import TrendingSection from '../components/TrendingSection'
import TestimonialSection from '../components/TestimonialSection'
import FeaturesBanner from '../components/FeaturesBanner'
import LifestyleSection from '../components/LifestyleSection'
import CustomizeTeaser from '../components/CustomizeTeaser'
import UGCGallery from '../components/UGCGallery'
import Newsletter from '../components/Newsletter'


const Home = () => {
  return (
    <div className='w-full h-auto bg-white'>
       <div>
         {/* Hero section */}
         <HeroSection/>
         {/* FeaturesBanner */}
         <FeaturesBanner/>
         {/* Categories section */}
         <CategoriesSection/>
         {/* BestSellers section */}
         <BestSellers/>
         {/* Lifestyle Section  */}
         <LifestyleSection/>
         {/* WhyChooseUs section */}
         <WhyChooseUs/>
         {/* Trending Section  */}
         <TrendingSection />
         {/* Customize Your Tumbler */}
         <CustomizeTeaser/>
         {/* UGC Gallery */}
         <UGCGallery/>
         {/* Testimonial Section  */}
         <TestimonialSection/>
         {/* News Letter section */}
         {/* <Newsletter/> */}
       </div>

    </div>
  )
}

export default Home