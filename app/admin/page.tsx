import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import Nav from '../components/Nav'

const page = () => {
  return (
    <div>
      <Nav />
      <div className='pt-16'>
        <AdminDashboard />
      </div>
    </div>
  );
}

export default page
