import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import { Alert } from "@mui/material";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = process.env.NEXT_PUBLIC_API_URL;
export default function Profile() {
  const router = useRouter();
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [photo, setPhoto] = useState();
  const [preview, setPreview] = useState("");
  const [user, setUser] = useState({
    fullname: "Full Name",
    email: "Email",
    city: "City",
    country: "Country",
    phone: "Phone",
    photo:
      "https://i.pinimg.com/550x/4a/f5/e8/4af5e8145196ec8006f2583d30e1eb43.jpg",
    postalcode: "Postal Code",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const logout = () => {
    // remove all cookies
    cookies &&
      Object.keys(cookies).forEach((cookieName) =>
        removeCookie(cookieName, { path: "/" })
      );
    router.push("/");
  };

  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    }
  }, [cookies]);
  useEffect(() => {
    if (token) {
      setUser({
        fullname: token.fullname,
        email: token.email,
        city: token.city,
        country: token.country,
        phone: token.phone,
        photo: token.photo || 'https://i.pinimg.com/550x/4a/f5/e8/4af5e8145196ec8006f2583d30e1eb43.jpg',
        postalcode: token.postalcode,
      });
    }
  }, [token]);

  const updateForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", user.fullname);
    formData.append("email", user.email);
    formData.append("city", user.city);
    formData.append("country", user.country);
    formData.append("phone", user.phone);
    formData.append("postalcode", user.postalcode);
    formData.append("photo", photo ? photo : user.photo);
    for (const value of formData.values()) {
      console.log(value);
    }
    console.log("user : ", user);
    axios
      .put(url + `users/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ` + cookies.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("update profile success ");
        setIsSuccess(true);
        setTimeout(() => {
          logout();
          router.push("/auth/login");
        }, 2000);
      })
      .catch((err) => {
        console.log("update profile fail");
        console.log(err);
        // console.log(err.response.data.message);
        // setErrormsg(err.response.data.message);
        setErrormsg("Something went wrong");
        setIserror(true);
      });
  };
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      <main
        className={`md:flex-row md:flex min-h-screen p-6 px-2 ${poppins.className} bg-ankasa-grey text-black`}
      >
        <div className="md:w-1/5 md:h-screen mx-4 rounded-xl p-2 bg-white">
          <div className="w-full h-full rounded-xl bg-white flex flex-col items-center pt-4 p-1">
            {/* photo */}
            {preview ? (
              <Image
                src={preview}
                width={120}
                height={120}
                alt="userphotopreview"
                className="bg-white rounded-full border-2 border-ankasa-blue max-h-32"
              />
            ) : (
              <Image
                src={user?.photo}
                width={120}
                height={120}
                alt="userphoto"
                className="bg-white rounded-full border-2 border-ankasa-blue max-h-32"
              />
            )}

            {/* profile info */}
            <div className="w-44 h-16 flex items-center text-center justify-center">
              <label
                htmlFor="imgbtn"
                className="border-2 border-ankasa-blue rounded-xl bg-white text-ankasa-blue text-md font-bold p-3 my-4"
              >
                Select Photo
              </label>
              <input
                id="imgbtn"
                type="file"
                accept="image/*"
                style={{ display: `none` }}
                onChange={handlePhoto}
              />
            </div>
            <p className="font-semibold">{user.fullname}</p>
            <p className="text-sm text-gray-500">
              {user.city}, {user.country}
            </p>
            <div className="w-full h-24 mt-2 pt-2">
              <p className="text-sm font-bold ml-2">Cards</p>
              <div className="w-full h-16 mt-2 bg-ankasa-blue rounded-xl p-3">
                <p className="text-white text-bold text-sm">
                  4441 1235 5512 5551
                </p>
                <p className="text-white text-sm">X - Card</p>
              </div>
            </div>

            <div className="w-full h-8 mt-6 flex-row flex p-2 items-center justify-between text-center hover:text-ankasa-blue">
              <BsPersonCircle color="grey" size={20} />
              <p className="font-bold">Profile</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <div className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:text-ankasa-blue">
              <BsFillStarFill color="grey" size={20} />
              <p className="font-bold">My Review</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <div className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:text-ankasa-blue">
              <BsFillGearFill color="grey" size={20} />
              <p className="font-bold">Settings</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <button
              className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:border-2 hover:text-red-700 rounded-lg"
              onClick={logout}
            >
              <BsFillDoorOpenFill color="grey" size={20} />
              <p className="font-bold">Logout</p>
              <BsChevronRight color="grey" size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 bg-white">
          <div className="w-full h-16 rounded-xl bg-white p-2">
            <p className="text-md text-ankasa-blue">P R O F I L E</p>
            <p className="text-lg font-bold text-BLACK">Profile</p>
          </div>
          <div className="flex-row flex">
            <div className="w-1/2 h-full rounded-xl bg-white mt-2 mr-1">
              <p className="p-2 font-bold mb-4">Contact</p>
              <form className="px-2">
                <label>Email </label>
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Email address"
                  value={user.email}
                  onChange={handleChange}
                />
                <label>Phone Number</label>
                <input
                  autoComplete="off"
                  id="phone"
                  name="phone"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Phone Number"
                  value={user.phone}
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="w-1/2 h-full rounded-xl bg-white mt-2 ml-1">
              <p className="p-2 font-bold mb-4">Biodata</p>
              <form className="px-2">
                <label>Fullname </label>
                <input
                  autoComplete="off"
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Fullname"
                  value={user.fullname}
                  onChange={handleChange}
                />
                <label>City</label>
                <input
                  autoComplete="off"
                  id="city"
                  name="city"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="City"
                  value={user.city}
                  onChange={handleChange}
                />
                <label>Country </label>
                <input
                  autoComplete="off"
                  id="country"
                  name="country"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Country"
                  value={user.country}
                  onChange={handleChange}
                />
                <label>Postal Code </label>
                <input
                  autoComplete="off"
                  id="postalcode"
                  name="postalcode"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Postal Code"
                  value={user.postalcode}
                  onChange={handleChange}
                />
              </form>
            </div>
          </div>
          {isError && (
            <Alert severity="error" className={`${poppins.className} mb-4 `}>
              {errorMsg}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" className={`${poppins.className} mb-4 `}>
              Update Profile Success
            </Alert>
          )}
          <div className="w-full h-20 bg-white justify-end flex flex-row p-2 mt-2">
            <button
              className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 self-end w-32 shadow-lg"
              onClick={updateForm}
            >
              Save
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
