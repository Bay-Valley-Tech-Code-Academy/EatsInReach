"use client"

import Navbar from '@/Components/Navbar'
import Link from 'next/link';

export default function Landing() {
    return(
        <div>
            <Navbar />
            <div>Admin Page</div>
            <div>
                <Link href="/Pages/ReviewSubmissions">Review Submissions</Link>
            </div>
            <div>
                <Link href="/">Home</Link>
            </div>
        </div>
    )
}