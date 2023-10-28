import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMapPin,
} from "react-icons/fi";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const Footer = () => {
  return (
    <div className="flex w-full border-b px-2 pt-20 border-gray-200 bg-white md:justify-evenly justify-end">
      <div className="flex flex-col w-full lg:hidden">
        <div className="text-black w-full p-2 text-sm flex lg:hidden">
          <div
            className={`flex bg-white text-black text-2xl ${poppins.className} w-1/4`}
          >
            <Image src="/plane.svg" width={36} height={36} alt="logo" />
            <p>Ankasa</p>
          </div>
        </div>
        <div className="text-black w-full h-full p-2 text-sm flex-row lg:hidden">
          <p className="text-xl font-medium text-black">Features</p>
          <p className="mt-8">Find Ticket</p>
          <p className="mt-4">My Bookings</p>
          <p className="mt-4">Chat</p>
          <p className="mt-4">Notifications</p>
        </div>
        <div className="text-black w-full h-full p-2 text-sm flex-row lg:hidden">
          <p className="text-xl font-medium text-black">Download Ankasa App</p>
          <Image
            src={"/dl_apple.png"}
            width={200}
            height={60}
            alt="store1"
            className="mt-4"
          />
          <Image
            src={"/dl_gplay.png"}
            width={200}
            height={60}
            alt="store2"
            className="mt-4"
          />
        </div>
        <div className="text-black w-full h-full p-2 text-sm flex-row lg:hidden">
          <p className="text-xl font-medium text-black">Follow Us</p>
          <div className="flex my-4">
            <FiFacebook size={24} className="mr-4" />
            <FiTwitter size={24} className="mx-4" />
            <FiInstagram size={24} className="mx-4" />
            <FiYoutube size={24} className="mx-4" />
          </div>
        </div>
      </div>
      <div className="w-full hidden lg:flex">
        <div className="text-gray-600 w-1/4 p-4 text-sm hidden lg:block">
          <div
            className={`flex bg-white text-black text-4xl ${poppins.className} w-1/4`}
          >
            <Image src="/plane.svg" width={36} height={36} alt="logo" />
            <p>Ankasa</p>
          </div>
          <p className="mt-8">
            Find your Flight and explore the world with us. We will take care of
            the rest
          </p>
          <p className="mt-28">© Ankasa. All Rights Reserved.</p>
        </div>
        <div className="text-gray-600 w-1/4 p-4 text-sm hidden lg:block">
          <p className="text-xl font-medium text-black">Features</p>
          <p className="mt-8">Find Ticket</p>
          <p className="mt-4">My Bookings</p>
          <p className="mt-4">Chat</p>
          <p className="mt-4">Notifications</p>
        </div>
        <div className="text-gray-600 w-1/4 p-4 text-sm hidden lg:block">
          <p className="text-xl font-medium text-black">Download Ankasa App</p>
          <Image
            src={"/dl_apple.png"}
            width={200}
            height={60}
            alt="store1"
            className="mt-4"
          />
          <Image
            src={"/dl_gplay.png"}
            width={200}
            height={60}
            alt="store2"
            className="mt-4"
          />
        </div>
        <div className="text-gray-600 w-1/4 p-4 text-sm hidden lg:block">
          <p className="text-xl font-medium text-black">Follow Us</p>
          <div className="flex mt-4">
            <FiFacebook size={24} className="mr-4" />
            <FiTwitter size={24} className="mx-4" />
            <FiInstagram size={24} className="mx-4" />
            <FiYoutube size={24} className="mx-4" />
          </div>
          <div className="flex mt-40">
            <FiMapPin size={24} className="mx-4" />
            <p>Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
