import React, { Component } from 'react'
import { Link } from 'react-router'
import './home.css'
import LoginForm from './LoginForm'

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <div className='home-content'>
          <LoginForm />
        </div>
      </div>
    )
  }
}

export default Home
