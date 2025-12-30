import React from 'react'
import HomeComponent from '../components/Home/HomeComponent'
import CareerJourneySection from '../components/Home/CareerJourney'
import HowItWorksSection from '../components/Home/HowItWorksSection'
import PopularCareersSection from '../components/Home/PopularCareersSection'
import WhyChooseUsSection from '../components/Home/WhyChooseUsSection'
import TestimonialsSection from '../components/Home/TestimonialsSection'
import CallToActionSection from '../components/Home/CallToActionSection'

const Home = () => {
  return (
    <div>
      <HomeComponent />
      <CareerJourneySection/>
      <HowItWorksSection />
      <PopularCareersSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  )
}

export default Home