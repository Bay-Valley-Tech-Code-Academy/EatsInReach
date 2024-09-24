"use client"

import Navbar from '@/Components/Navbar'
import Link from 'next/link';
import Footer from '@/Components/Footer';

export default function Landing() {

    const tableData = [
        {
            title: "Users",
            users :[
            {id: 0, username: "user1", email: "email@email.com"}, 
            {id: 1, username: "user2", email: "email1@email.com"},
            {id: 2, username: "user3", email: "email2@email.com"}
        ]},
        {
            title: "Vendors",
            users:[
            {id: 0, username: "vendor1", email: "email@email.com"}, 
            {id: 1, username: "vendor2", email: "email1@email.com"},
            {id: 2, username: "vendor2", email: "email2@email.com"}
        ]},
        {
            title: "Admin",
            users: [
            {id: 0, email: "email@email.com"}, 
            {id: 1, email: "email1@email.com"},
            {id: 2, email: "email2@email.com"}
        ]}
    ]

    return(
        <div className='bg-Cream min-h-screen flex flex-col justify-between'>
            <Navbar />
            <div className='flex flex-col justify-between mx-4'>
                
                <div className='text-3xl font-bold block mx-auto my-6'>
                    <h1>Welcome Admin</h1>
                </div>

                <div className='flex justify-center gap-2'>

                    <Link href="/Pages/ReviewSubmissions">
                        <button className='shadow border bg-[#4E070C] text-Cream rounded-full px-4 py-2 hover:opacity-90'>
                        Review Submissions
                        </button>
                    </Link>

                    <Link href="/">
                        <button className='shadow border bg-[#4E070C] text-Cream rounded-full px-4 py-2 hover:opacity-90'>
                        Home
                        </button>
                    </Link>

                </div>
                
                
                <div className='flex items-center justify-center gap-2'>
                    {tableData.map((td, index) => (
                        <div key={index} className='m-4 text-center max-w-xs'>
                            <table className='shadow border-collapse border border-Buff rounded-lg m-4 w-1/4'>
                                <thead>
                                    <tr>
                                        <th className='p-2'>{td.title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border border-Buff'>ID</td>
                                        <td className='border border-Buff'>Username</td>
                                        <td className='border border-Buff'>Email</td>
                                        <td className='border border-Buff'>Check</td>
                                    </tr>

                                    {td.users.map((user, idx) => (
                                        <tr key={idx}>
                                            <td className='border border-Buff'>{user.id}</td>
                                            <td className='border border-Buff'>{user.username || "-"}</td>
                                            <td className='border border-Buff'>{user.email}</td>
                                            <td className='flex justify-center items-center p-2'>
                                                <input type='checkbox'/>
                                            </td>
                                        </tr>
                                ) )}

                                </tbody>
                            </table>
                        </div>
                    ))

                    }

                    <div className='flex flex-col space-y-4 m-4'>
                        <button className='shadow border bg-[#AAD15F] rounded-full px-4 py-2 hover:opacity-90'>
                            Promote to Admin
                        </button>

                        <button className='shadow border bg-[#FF670E] rounded-full px-4 py-2 hover:opacity-90'>
                            Demote from Admin
                        </button>

                        <button className='shadow border bg-[#D22701] rounded-full px-4 py-2 hover:opacity-90'>
                            Delete
                        </button>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}