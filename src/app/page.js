"use client"

import Navbar from './Components/Navbar'
import Link from 'next/link';

export default function Landing() {
    return(
        <div>
            <Navbar />
            <div>Get Started</div>
            <div>
                <Link href="/Pages/LoginUser">User Login</Link>
            </div>
            <div>
                <Link href="/Pages/LoginVendor">Vendor Login</Link>
            </div>
            <div>
                <Link href="/Pages/Bookmarks">Bookmarks</Link>
            </div>
        </div>
    )
}