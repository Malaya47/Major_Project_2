import React from 'react'

const Footer = () => {
   
  return (
    <footer className="text-light text-center py-3" style={{ backgroundColor: "#16181c", position: "relative", bottom: 0, width: "100%" }}>
        <p className='fs-5 mb-2'>Made with <i className="bi bi-code-slash"></i> by Malaya Tiwari
           <p className='mb-0'><a className='text-light' href="https://github.com/Malaya47" target='_blank'><i className="bi bi-github fs-5 me-1"></i></a> <a className='text-light' href="https://linkedin.com/in/malaya-tiwari-84a951189" target='_blank'><i className="bi bi-linkedin fs-5"></i></a></p>
           <p>© | 2024 Quantum Verse</p>
        </p>
    </footer>
  )
}

export default Footer