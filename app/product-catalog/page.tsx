import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ProductListing from '../components/ProductListing';

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
