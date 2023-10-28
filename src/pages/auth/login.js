import Image from "next/image";
import { Poppins } from "next/font/google";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Login() {
  const url = "https://easy-lime-seal-toga.cyclic.app/"
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    email: email,
    password: password,
  };
  const loginForm = (e) => {
    setIsLoading(true);
    setIserror(false)
    e.preventDefault();
    axios
      .post(url + `auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Login success");
        console.log(res.data.data);
        setCookie("accessToken", res.data.data.access_token, {
          path: "/",
        });
        router.replace("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Login fail");
        console.log(err);
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
    <main className={`md:flex min-h-screen md:flex-row ${poppins.className}`}>
      <Head>
        <title>Login</title>
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
        className="md:flex-col flex-row md:h-screen h-screen md:w-1/2 bg-white justify-center md:items-center items-center p-8 md:p-16"
        style={{ color: "black" }}
      >
        <div className="flex mx-6">
          <Image src={"/plane.svg"} width={50} height={34} alt="logo" />
          <p className="text-3xl font-extrabold mx-6">Ankasa</p>
        </div>
        <form
          className="w-80 my-16 md:flex-col md:mx-auto"
          onSubmit={loginForm}
        >
          <p className="text-4xl font-extrabold">Login</p>
          <div className="my-8">
            <label>Email </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
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
            {isError && (
              <Alert severity="error" className={`${poppins.className} mb-4 `}>
                {errorMsg}
              </Alert>
            )}

          </div>
          <button className="bg-ankasa-blue w-full h-16 rounded-md drop-shadow-md">
            <p className="text-white text-bold">
              {isLoading ? (
                <span className="flex align-middle justify-center">
                  <CircularProgress />
                </span>
              ) : 'Login'}
            </p>
          </button>
          <div className="text-center mt-8">
            <p className="text-gray-500">Did you forget your password?</p>
            <Link href={"/auth/forgot"}>
              <p className="text-ankasa-blue">Tap here to reset</p>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
