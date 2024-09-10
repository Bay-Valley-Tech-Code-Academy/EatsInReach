"use client"
import Link from 'next/link';
import Navbar from '@/Components/Navbar'
const arrayItems =[
    {
        itemName: 'Apples',
        itemDesc:'Delicious apples',
    },
    {
        itemName: 'Banana',
        itemDesc:'Delicious bananas',
    }
]
export default function VendorPage() {
    return(
        <div>
            <Navbar />
            <div>Vendor Page</div>
            <Link href="/">Home</Link>
            <div className="flex flex-col items-center justify-center gap-4">
                <p/><h1 >Vendor Page</h1>
                {arrayItems.map((item, index) => (
                    <div key={index} className='h-[20vh] w-[20vw] bg-slate-600 flex flex-col items-center justify-center gap-4 p-4'>
                        <p className="text-white font-bold">{item.itemName}</p>
                        <p className="text-white">{item.itemDesc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}