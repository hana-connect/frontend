"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BottomMenu = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      id: "home",
      label: "홈",
      icon: "/svg/ic_main_menu_home.svg",
      size: 20,
      active: true,
    },
    {
      id: "benefit",
      label: "혜택",
      icon: "/svg/ic_main_menu_benefit.svg",
      size: 20,
      active: false,
    },
    {
      id: "pay",
      label: "결제",
      icon: "/svg/ic_main_menu_pay.svg",
      size: 18,
      active: false,
    },
    {
      id: "menu",
      label: "메뉴",
      icon: "/svg/ic_main_menu_menu.svg",
      size: 18,
      active: false,
    },
  ];

  return (
    <nav
      className={`
      fixed left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out
      flex items-center bg-white z-50
      ${
        isScrolled
          ? "w-[60%] bottom-6 h-14 rounded-full shadow-2xl px-6 justify-between"
          : "w-full h-25 rounded-tl-2xl rounded-tr-2xl shadow-md px-5 pb-5 justify-around bottom-0"
      }
    `}
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col items-center transition-all duration-300 ${
            item.active ? "text-[#2E2E36]" : "text-[#CCD0D9]"
          }`}
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={item.size}
            height={item.size}
            className="transition-transform duration-300"
            priority
          />

          {!isScrolled && (
            <span className="text-[14px] mt-1 font-bold animate-fadeIn">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default BottomMenu;
