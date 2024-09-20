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
        <div className='bg-Cream'>
            <Navbar />
            <div className='flex flex-col justify-between mx-4'>
                
                <div className='text-3xl font-bold block mx-auto my-6'>
                    <h1>Welcome Admin</h1>
                </div>

                <div className='flex justify-center gap-2'>

                    <Link href="/Pages/ReviewSubmissions">
                        <button className='shadow border bg-[#4E070C] text-white rounded-full px-4 py-2 hover:transition duration-300'>
                        Review Submissions
                        </button>
                    </Link>

                    <Link href="/">
                        <button className='shadow border bg-[#4E070C] text-white rounded-full px-4 py-2 hover:transition duration-300'>
                        Home
                        </button>
                    </Link>

                </div>
                
                
                <div className='flex items-start gap-2'>
                    {tableData.map((td, index) => (
                        <div key={index} className='m-4'>
                            <table className='shadow border-collapse border rounded-lg m-4 w-1/4'>
                                <thead>
                                    <tr>
                                        <th>{td.title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border'>ID</td>
                                        <td className='border'>UserName</td>
                                        <td className='border'>Email</td>
                                        <td className='border'> </td>
                                    </tr>
                                    <tr>
                                        <td className='border'>{td.users.id}</td>
                                        <td className='border'>{td.users.username}</td>
                                        <td className='border'>{td.users.email}</td>
                                        <td className='border'>
                                            <input type='checkbox'/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))

                    }

                    <div className='flex flex-col space-y-4 m-4'>
                        <button className='shadow border bg-[#AAD15F] rounded-full px-4 py-2 hover:transition duration-300'>
                            Promote to Admin
                        </button>

                        <button className='shadow border bg-[#FF670E] rounded-full px-4 py-2 hover:transition duration-300'>
                            Demote from Admin
                        </button>

                        <button className='shadow border bg-[#D22701] rounded-full px-4 py-2 hover:transition duration-300'>
                            Delete
                        </button>
                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}