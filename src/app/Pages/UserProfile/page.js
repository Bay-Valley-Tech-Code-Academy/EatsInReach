"use client"
import Link from 'next/link';
import Navbar from '@/Components/Navbar'

export default function LoginVendor() {
    return(
        <div>
            <Navbar />
            <div>User Profile</div>
            <Link href="/">Home</Link>
        </div>
        
    )
}