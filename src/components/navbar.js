import React from 'react'
import Link from 'next/link'
import styles from "../../styles/Layout.module.css";

const Navbar = () => {
  return(
  <div id="header">
    
    <ul>
        <li style={{display:'inline'}}>
          <Link href="/">
            <h1>Pre-Rendered Food Blog</h1>
          </Link>
        </li>
        <li style={{display:'inline', padding:'100px'}}>
            <Link href="/"> 
            <a style={{color:'black'}}>Articles</a>
            </Link>
            
        </li>
        <li style={{display:'inline'}}>
            <Link href="/about">
            <a style={{color:'black'}}>Recipe</a>
            </Link>
            
        </li>
    </ul>
    
  </div>
  )
}

export default Navbar