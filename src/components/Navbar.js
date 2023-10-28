import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [photo, setPhoto] = useState(
    "https://i.pinimg.com/550x/4a/f5/e8/4af5e8145196ec8006f2583d30e1eb43.jpg"
  );

  const logout = () => {
    cookies &&
      Object.keys(cookies).forEach((cookieName) => removeCookie(cookieName));
    router.reload();
  };

  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    }
  }, [cookies]);
  useEffect(() => {
    if (token?.photo) {
      setPhoto(token.photo);
    }
  }, [token]);

  return (
    <nav className="flex w-full border-b p-5 items-center align-middle border-gray-200 bg-white md:justify-between justify-between">
      <Link href={"/"}>
        <button
          className={`flex bg-white text-black text-4xl ${poppins.className} `}
        >
          <Image src="/plane.svg" width={36} height={36} alt="logo" />
          <p>Ankasa</p>
        </button>
      </Link>
      <div className="md:flex md:items-center">
        <div className="relative hidden md:block mx-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <button
            type="text"
            id="search-navbar"
            className="block w-44 h-8 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            placeholder="Search..."
            onClick={() => {
              router.push("/ticket");
            }}
          />
        </div>
        <ul className="lg:flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white hidden mx-5">
          <li>
            <Link href={"/ticket"}>
              <p className="block py-2 px-4 text-black font-semibold hover:border-b-2 hover:border-ankasa-blue">
                Find Ticket
              </p>
            </Link>
          </li>
          {token && (
            <li>
              <Link href={"/booking"}>
                <p className="py-2 px-4 text-black font-semibold hover:border-b-2 hover:border-ankasa-blue">
                  My Bookings
                </p>
              </Link>
            </li>
          )}
        </ul>

        {token ? (
          <div className="flex text-black text-sm items-center pr-10">
            <BsEnvelope
              color="black"
              size={24}
              className="mx-10 md:block hidden"
            />
            <BsBell color="black" size={24} className="mx-10 md:block hidden" />
            <Link href={"/profile"}>
              <Image
                src={photo}
                width={56}
                height={56}
                alt="userphoto"
                className="border-2 border-ankasa-blue rounded-full max-h-14"
              />
            </Link>

            <button className="mx-2 md:hidden" onClick={logout}>
              <BiLogOutCircle
                size={32}
                className="md:hidden text-ankasa-blue"
              />
            </button>
          </div>
        ) : (
          <>
            <Link href={"/auth/register"}>
              <BiLogInCircle size={32} className="md:hidden text-ankasa-blue" />
            </Link>
            <Link href={"/auth/register"}>
              <button className="bg-blue-500 m-sm w-36 h-14 rounded-xl hidden lg:block mx-10 text-white shadow-lg font-semibold">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav >
  );
};
export default Navbar;
