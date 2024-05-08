import React from 'react'
import '../styles/FrontPage.css'

function FrontPage() {
  return (
    <div className='container'>
      <div className='top-container'>
        <h1 className='top-text'>Tired of long late nights studying for tests?</h1>
        <p>LernIt is an open source learning platform that is committed to making education more accessible than ever before! Our mission is to empower learners of all ages and backgrounds by offering a wide range of customizable solutions and cutting-edge features tailored to enhance the learning experience. </p>
        <a href="/signin"><button className='btn-signup'>Sign Up</button> </a>
      </div>
    </div>
  )
}

export default FrontPage