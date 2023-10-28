import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import Head from "next/head";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Register() {
  const [cookies, setCookie, removeCookie] = useCookies(["regis"]);
  const url = "https://easy-lime-seal-toga.cyclic.app/"
  const router = useRouter();
  const [name, setName] = useState("");
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    name: name,
    email: email,
    password: password,
  };
  const registerForm = (e) => {
    setIsLoading(true);
    setIserror(false);
    e.preventDefault();
    axios
      .post(url + `auth/register`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Register success: ", res.data.data);
        setCookie("emailotp", res.data.data.data.email, {
          path: "/",
        });
        setCookie("otpcode", "", {
          path: "/",
        });
        router.push("/auth/verify");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Register fail");
        console.log(err.response.data.message);
        setErrormsg(err.response.data.message);
        setIserror(true);
      });
  };

  useEffect(() => {
    setIserror(false);
    setIsLoading(false);
  }, []);

  return (
    <main
      className={` md:flex md:min-h-screen md:h-auto md:flex-row ${poppins.className}`}
    >
      <Head>
        <title>Registration</title>
      </Head>
      <div className="md:flex hidden md:min-h-full md:w-1/2 w-screen bg-ankasa-blue items-center justify-center align-middle">
        <Image
          src={"/illustration.svg"}
          width={360}
          height={420}
          priority
          alt="logo"
        />
      </div>
      <div
        className="md:flex-col flex-row md:h-full h-full md:w-1/2 bg-white justify-center p-8 md:p-16"
        style={{ color: "black" }}
      >
        <div className="flex mx-6">
          <Image src={"/plane.svg"} width={50} height={34} alt="logo" />
          <p className="text-3xl font-extrabold mx-6">Ankasa</p>
        </div>
        <div className="w-80 md:flex-col md:mx-auto">
          <form className="w-80 my-16" onSubmit={registerForm}>
            <p className="text-4xl font-extrabold">Register</p>
            <div className="my-8">
              <label>Fullname </label>
              <input
                autoComplete="off"
                id="name"
                name="name"
                type="text"
                className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                placeholder="Fullname"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Email </label>
              <input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password </label>
              <input
                autoComplete="off"
                id="password"
                name="password"
                type="password"
                className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isError && (
              <Alert severity="error" className={`${poppins.className} mb-4 `}>
                {errorMsg}
              </Alert>
            )}
            {isLoading && (
              <div className="flex align-middle justify-center my-4">
                <CircularProgress />
              </div>
            )}
            <button className="bg-ankasa-blue w-full h-16 rounded-md drop-shadow-md">
              <p className="text-white text-bold">Sign Up</p>
            </button>
            <div>
              <div className="flex items-center my-4">
                <input
                  id="tnc-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label
                  htmlFor="tnc-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Accept terms and conditions
                </label>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          </form>
          <div className="text-center my-3">
            <p>Already have an account?</p>
            <Link href="/auth/login">
              <button className="bg-white border-ankasa-blue border-2 w-full h-16 rounded-md drop-shadow-md mt-6">
                <p className="text-ankasa-blue text-bold">Sign In</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
