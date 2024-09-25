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
            {id: 2, username: "user3", email: "email2@email.com"},
            {id: 3, username: "user4", email: "email3@email.com"}, 
            {id: 4, username: "user5", email: "email4@email.com"},
            {id: 5, username: "user6", email: "email5@email.com"},
            {id: 6, username: "user7", email: "email6@email.com"}, 
            {id: 7, username: "user8", email: "email7@email.com"},
            {id: 8, username: "user9", email: "email8@email.com"},
            {id: 9, username: "user10", email: "email9@email.com"}, 
            {id: 10, username: "user11", email: "email10@email.com"},
            {id: 11, username: "user12", email: "email11@email.com"}
        ]},
        {
            title: "Vendors",
            users:[
            {id: 0, username: "vendor1", email: "email@email.com"}, 
            {id: 1, username: "vendor2", email: "email1@email.com"},
            {id: 2, username: "vendor3", email: "email2@email.com"},
            {id: 3, username: "vendor4", email: "email1@email.com"},
            {id: 4, username: "vendor5", email: "email2@email.com"}
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
        <div className='bg-Cream min-h-screen flex flex-col justify-between overflow-x-hidden'>
            <Navbar />
            <div className='flex flex-col justify-between mx-4 max-sm:mx-0 w-full'>
                
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
                
                <div className='flex justify-center max-xl:grid grid-cols-[3fr,1fr] max-md:flex max-md:flex-col-reverse'>
                    <div className='flex justify-center items-center gap-2 overflow-scroll max-xl:flex-col'>
                        {tableData.map((td, index) => (
                            <div key={index} className='m-4 text-center'>
                                <table className='items-start shadow border-collapse border border-Buff rounded-lg w-1/4 max-xl:w-full'>
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

                    </div>

                    <div className='flex flex-col items-start m-4 p-4 space-y-2 max-xl:mx-0 max-md:flex-row max-sm:justify-center max-sm:space-y-0'>
                        <button className='shadow border bg-[#AAD15F] rounded-full w-auto px-4 py-2 max-xl:text-xs hover:opacity-90'>
                            Promote to Admin
                        </button>

                        <button className='shadow border bg-[#FF670E] rounded-full w-auto px-4 py-2 max-xl:text-xs hover:opacity-90'>
                            Demote Admin
                        </button>

                        <button className='shadow border bg-[#D22701] rounded-full w-auto px-4 py-2 max-xl:text-xs hover:opacity-90'>
                            Delete
                        </button>
                    </div>        

                </div>

            </div>
            <Footer/>
        </div>
    )
}