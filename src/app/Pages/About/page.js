"use client"

import Link from "next/link";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import LearnMoreCard from "../../Components/LearnMoreCard";
import IconMapMarker from "@/Components/IconMapMarker";
import IconBxDonateHeart from "@/Components/IconBxDonateHeart";
import IconStars from "@/Components/IconStars";

const cardData = [
    {
        image: <IconMapMarker/>,
        title: "Discover Local Gems",
        description: "Explore a diverse range of food vendors right from your device. Whether you’re craving a gourmet food truck meal, a home-cooked specialty, or a unique dish from a small, family-owned eatery, we’ve got you covered.",
        link: "../../index.js"
    },
    {
        image: <IconBxDonateHeart/>,
        title: "Support Small Businesses",
        description: "Our platform helps local vendors reach a broader audience, giving them the exposure they deserve and helping them thrive. Your support directly contributes to the growth and sustainability of these cherished community businesses.",
        link: "https://www.youtube.com"
    },
    {
        image: <IconStars/>,
        title: "Access Unique Offerings",
        description: "Find and enjoy distinctive culinary experiences that you won’t find in mainstream restaurants. Our app features real-time updates, allowing you to locate vendors, view their menus, and get notifications about their special promotions.",
        link: "https://www.youtube.com"
    }
  ];

export default function About() {
    return (
        <div>
            <Navbar/>
            <div className="flex flex-col items-center bg-[#AAD15F] p-12">
                <h1 className="text-3xl text-center font-bold pb-8">
                    Get Your Yonder on One Bite at a Time!
                </h1>
                <p className="text-center pb-20 min-w-80 max-w-[500px]">
                    Welcome to YumYonder! We’re thrilled to connect you with the hidden culinary gems in rural areas. 
                    Our platform bridges the gap between small, local food vendors and a wider audience eager to discover
                    and support unique offerings.
                </p>
                <div>
                    <button className="bg-[#FF670E] w-36 h-12 rounded-lg">
                        <Link href="/Pages/Restaurants"> Get Started </Link>
                    </button>
                </div>
            </div>
            <div className="flex flex-col bg-[#FDE4CE] text-black p-12">
                <>
                    <h1 className="font-bold text-2xl mb-8"> 
                        What We Do
                    </h1>
                    <div className="flex flex-col md:flex-row md:gap-8 lg:gap-44 xl:gap-52 items-center md:items-start justify-center mx-auto lg:max-w-[1200px]">
                        {cardData.map((card, index) => (
                            <LearnMoreCard
                            key={index}
                            image={card.image}
                            title={card.title}
                            description={card.description}
                            link={card.link}
                            />
                        ))}
                    </div>
                </>
                <hr className="border-[#FF670E] border-solid border-2"></hr>
                <h1 className="text-2xl text-center font-semibold p-16 lg:pb-24"> 
                    Provided By 
                </h1>
                <div className="flex flex-col lg:flex-row items-center justify-center pb-14">
                    <img src="https://www.modbee.com/latest-news/cwnnig/picture253156058/alternates/LANDSCAPE_1140/bayvalleytech2_KK.JPG"
                    className="md:h-96 m-6"/>
                    <div>
                        <h2 className="text-3xl text-center pb-9 font-bold"> Bay Valley Tech </h2>
                        <p className="max-w-[620px]">
                            Bay Valley Tech is a fast-growing tech incubator, tech community and digital workforce training program. 
                            We believe that enabling hardworking individuals to attain lucrative technology-based careers can be 
                            transformative for their families and their communities. In addition to providing high quality digital
                            talent to help companies grow, Bay Valley Tech offers two free, highly effective digital skills training
                            programs. A digital skills academy and a coding academy. 
                        </p>
                    </div>
                </div>
                </div>
                <Footer/>
        </div>
    );
}