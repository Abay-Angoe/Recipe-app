import React from 'react'
import '../index.css'
import { Navbar } from './partials/Navbar'
import { Footer } from './partials/Footer'
import { MobileNav } from './partials/MobileNav'

export const ReviewSubmitted = () => {
  return (
    <>
    <Navbar/>
    <MobileNav/>
        <section className='review-submit'>
            <div>
                <h1>Rate & Review</h1>
                <img src="https://www.svgrepo.com/show/254981/checklist.svg" alt="" />
                <h2>REVIEW SUBMITTED</h2>
                <p><strong>Thank you for your feedback!</strong></p>

            </div>
        </section>
    <Footer/>
    </>
  )
}
