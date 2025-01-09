import React from 'react'
import ProductListing from '../components/ProductListing'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const page = () => {
  return (
    <div>
      <Nav />
      <div className='mt-20'>
        <ProductListing />
      </div>
      <Footer />
    </div>
  );
}

export default page
