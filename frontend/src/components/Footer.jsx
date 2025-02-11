import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="/#" className="text-white hover:text-gray-200">
            Privacy Policy
          </a>
          <a href="/#" className="text-white hover:text-gray-200 disabled:">
            Terms of Service
          </a>
        </div>
        <div className="mt-4">
          <a href="https://www.facebook.com" className="text-white hover:text-gray-200 mx-2">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" className="text-white hover:text-gray-200 mx-2">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" className="text-white hover:text-gray-200 mx-2">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer