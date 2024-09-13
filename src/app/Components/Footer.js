"use client";

import { useState } from "react";

export default function Footer() {
  const sections = [
    {
      title: "Bay Valley Tech", href: 'https://www.bayvalleytech.com/'
    },
    {
      title: "Free Code Academy", href: 'https://www.bayvalleytech.com/about'
    },
    {
      items: [
        { text: "Instagram", imgSrc: '../../images/logo-instagram.svg', href: "https://www.instagram.com/bayvalleytech/" },
        { text: "Facebook", imgSrc: '../../images/logo-facebook.svg', href: "https://www.facebook.com/BayValleyTech" },
        { text: "LinkedIn", imgSrc: '../../images/logo-linkedin.svg', href: "https://www.linkedin.com/company/bay-valley-tech/posts/?feedView=all" },
      ],
    },
  ];

  return (
    <div className="bg-[#D9D9D9]">
      <div className="flex pt-4 pb-6">
        {sections.map((section, index) => (
          <div key={index} className="flex justify-center items-center">
            {section.title && (
            <p className="font-light px-3 text-[#4B5E54] hover:underline">{section.title}</p>
            )}
          </div>
        ))}
        <div className="ml-auto flex items-center">
        {sections[2].items.map((item, idx) => (
          <a key={idx} href={item.href} className="inline-flex justify-end px-3 py-3 hover:underline">
            <img src={item.imgSrc} width={24} height={24} className="w-6 mr-2 opacity-60" />
          </a>
        ))}
        </div>
      </div>
    </div>
  );
}