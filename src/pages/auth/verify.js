import Image from "next/image";
import { Poppins } from "next/font/google";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Verify() {
  const url = "https://easy-lime-seal-toga.cyclic.app/";
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["regis"]);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const formData = {
    email: email,
  };

  useEffect(() => {
    setEmail(cookies.emailotp);
    setOtp(cookies.otpcode);
    console.log("Cookies: ", cookies);
  }, [cookies]);

  const verifyForm = (e) => {
    e.preventDefault();
    router.push("/auth/login");

    axios
      .post(url + `/auth/activated`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Verify success: ", res.data.data);
        removeCookie("emailotp");
        removeCookie("otpcode");
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log("Verify fail");
        console.log(err);
      });
  };

  return (
    <main className={`md:flex min-h-screen md:flex-row ${poppins.className}`}>
      <Head>
        <title>Verification</title>
      </Head>
      <div className="md:flex hidden md:h-screen md:w-1/2 w-screen bg-ankasa-blue items-center justify-center align-middle">
        <Image
          src={"/illustration.svg"}
          width={360}
          height={420}
          priority
          alt="logo"
        />
      </div>
      <div
        className="md:flex-col flex-row md:h-screen h-screen md:w-1/2 bg-white justify-center items-center p-8 md:p-16"
        style={{ color: "black" }}
      >
        <div className="flex mx-6">
          <Image src={"/plane.svg"} width={50} height={34} alt="logo" />
          <p className="text-3xl font-extrabold mx-6">Ankasa</p>
        </div>
        <form
          className="w-80 my-16 md:flex-col md:mx-auto"
          onSubmit={verifyForm}
        >
          <p className="text-4xl font-extrabold">Verify OTP</p>
          <div className="my-8">
            <label>Email </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>OTP </label>
            <input
              autoComplete="off"
              id="otp"
              name="otp"
              type="text"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="OTP"
              value={otp}
              disabled
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className="bg-ankasa-blue w-full h-16 rounded-md drop-shadow-md">
            <p className="text-white text-bold">Verify</p>
          </button>
        </form>
      </div>
    </main>
  );
}
