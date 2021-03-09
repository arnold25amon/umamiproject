import React from 'react'
import Link from 'next/link'
 
const Navbar = () => {
  return(
  <div>
    <ul>
        <li>
            <Link href="/"> 
            <a >Articles</a>
            </Link>
            
        </li>
        <li>
            <Link href="/about">
            <a>Recipe</a>
            </Link>
            
        </li>
    </ul>
  </div>
  )
}

export default Navbar