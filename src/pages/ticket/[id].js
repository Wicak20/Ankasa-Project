import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { FaExchangeAlt } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import planes from "../../../public/illustration.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { Alert, FormControlLabel, FormGroup, Switch } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import formatDate from "../../../lib/formatDate";
import CircularProgress from "@mui/material/CircularProgress";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = "https://easy-lime-seal-toga.cyclic.app/";

export async function getServerSideProps(context) {
  const isoCountries = require("i18n-iso-countries");
  isoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
  try {
    const id = context.query.id;
    const res = await axios.get(url + `airlines/flight/${id}`);
    const data = await res.data.data;
    const formattedData = data;
    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: true } };
  }
}

export default function Ticket({ formattedData, error }) {
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //data ticket
  const data = formattedData
  const router = useRouter();
  const [ticket, setTicket] = useState({
    id: '',
    name: "Airline name",
    airline_photo: "",
    arrival_city: "City",
    arrival_country: "Country",
    departure_city: "City",
    departure_country: "Country",
    departure_date: "Departure Date",
    arrival_code: "",
    departure_code: "",
    price: "",
    flight_class: "Class",
  });

  const formatTime = (time) => {
    const inputDate = new Date(time);
    const timeZone = 'Asia/Jakarta';
    const options = {
      timeZone: timeZone,
      weekday: 'long', // Full day of the week
      day: 'numeric', // Day of the month
      month: 'long', // Full month name
      year: 'numeric', // Year
    };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(inputDate);
    return formattedDate
  }

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  const formatTimeDif = (time1, time2) => {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    const formattedTime1 = `${padZero(date1.getHours())}:${padZero(date1.getMinutes())}`;
    const formattedTime2 = `${padZero(date2.getHours())}:${padZero(date2.getMinutes())}`;
    return `${formattedTime1} - ${formattedTime2}`;
  }


  useEffect(() => {
    setIsLoading(false);
    if (!data) {
      return <p>Error!</p>;
    }
    console.log(data);
    setTicket({
      id: data.code,
      name: data.name,
      airline_photo: data.photo,
      arrival_city: data.to.location,
      arrival_country: data.to.country,
      departure_city: data.from.location,
      departure_country: data.from.country,
      departure_date: formatTime(data.takeoff),
      flight_time: formatTimeDif(data.takeoff, data.landing),
      arrival_code: data.to.code,
      departure_code: data.from.code,
      price: data.price,
      flight_class: data.flight_class,
    });
  }, [data]);

  //data user
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState();
  const [insured, setInsured] = useState(false);

  const [user, setUser] = useState({
    fullname: "Full Name",
    email: "Email",
    city: "City",
    country: "Country",
    phone: "Phone",
    photo:
      "https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png",
    postalcode: "Postal Code",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    } else {
      router.push("/auth/login");
    }
  }, [cookies, router]);
  useEffect(() => {
    if (token) {
      setUser({
        id: token.id,
        fullname: token.fullname,
        email: token.email,
        city: token.city,
        country: token.country,
        phone: token.phone,
        photo: token.photo,
        postalcode: token.postalcode,
      });
    }
  }, [token]);

  //form
  const formData = {
    title1: title,
    fullname1: user.fullname,
    nationality1: user.country,
  };

  const ticketForm = (e) => {
    setIsLoading(true);
    setIserror(false);
    e.preventDefault();
    axios
      .post(url + `booking/tickets/${ticket.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + cookies.accessToken,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Create booking success");
        console.log(res.data.data);
        setTimeout(() => {
          router.push("/booking");
        }, 2000);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Create booking fail");
        console.log(err);
        console.log(err.response.data.error);
        setErrormsg(err.response.data.error);
        setIserror(true);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Tickets</title>
      </Head>

      <main className={` ${poppins.className} bg-ankasa-grey text-black`}>
        <div
          className="h-44 w-full bg-ankasa-blue rounded-b-2xl px-6 flex flex-row items-center justify-between"
          style={{
            backgroundImage: `url(${planes.src})`,
            backgroundRepeat: `no-repeat`,
          }}
        ></div>
        <div className="md:flex-row md:flex h-full p-6 px-2 -mt-36">
          <div className="md:w-3/5 md:h-full mx-4 rounded-xl p-2 ">
            <p className="text-lg font-bold text-white">
              Contact Person Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
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
                  disabled
                  required
                />
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
                  disabled
                />
                <label>Phone Number</label>
                <input
                  autoComplete="off"
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Phone Number"
                  value={user.phone}
                  onChange={handleChange}
                  disabled
                />
                <div className="w-full h-auto flex justify-end my-2">
                  <Link href={"/profile"}>
                    <p className="font-extrabold text-ankasa-blue">
                      Update Profile
                    </p>
                  </Link>
                </div>
                <div className="flex items-center bg-red-200 p-2 rounded-xl">
                  <MdWarning />
                  <p className="ml-2">Make sure all data is correct</p>
                </div>
              </div>
            </div>
            {/* Passenger detail */}
            <p className="text-lg font-bold text-BLACK my-2">
              Passenger Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
                <div className="flex items-center bg-sky-200 p-2 rounded-xl my-2 justify-between">
                  <p className="ml-2">Passenger: 1 Adult</p>
                  <p className="ml-2"></p>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch disabled />}
                      label={
                        <p className={`${poppins.className}`}>
                          Same as contact person
                        </p>
                      }
                    />
                  </FormGroup>
                </div>
                <label>Fullname </label>
                <input
                  autoComplete="off"
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Fullname"
                  required
                  value={user.fullname}
                  onChange={handleChange}
                />
                <label>Title </label>
                <select
                  id="title"
                  name="title"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={0}
                >
                  <option value="0">--Select Title--</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Ms.</option>
                </select>
                <label>Nationality</label>
                <input
                  autoComplete="off"
                  id="nationality"
                  name="country"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Nationality"
                  value={user.country}
                  onChange={handleChange}
                />
              </div>
            </div>

            <p className="text-lg font-bold text-BLACK my-2">
              Insurance Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center my-4">
                    <input
                      id="insured"
                      type="checkbox"
                      name="insured"
                      checked={insured}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) => {
                        setInsured(e.target.checked);
                      }}
                    />
                    <label
                      htmlFor="insured"
                      className="ml-2 text-sm font-bold text-gray-900"
                    >
                      Travel Insurance
                    </label>
                  </div>
                  <div className="flex">
                    <p className="text-ankasa-blue font-bold">$ 2,00 </p>
                    <p className="text-sm text-gray-400">/pax</p>
                  </div>
                </div>
                <p className="text-sm">
                  Get travel compensation up to $ 10.000,00
                </p>
              </div>
            </div>

            {isError && (
              <Alert severity="error" className={`${poppins.className} my-4 `}>
                {errorMsg ? errorMsg : <p>Something Went Wrong</p>}
              </Alert>
            )}
            {isLoading && (
              <div className="flex align-middle justify-center my-4">
                <CircularProgress />
              </div>
            )}
            <div className="flex w-full h-auto justify-center">
              <button
                className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 w-1/2 shadow-lg "
                onClick={ticketForm}
              >
                Book Ticket
              </button>
            </div>
          </div>

          <div className="md:w-2/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
            {error && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                Connection error!
              </Alert>
            )}

            <div className="w-full flex justify-between px-2 items-center font-bold text-black md:text-white">
              <p className="text-lg">Flight Details</p>
              <p className="text-sm">View Details</p>
            </div>
            
            <div className="w-full h-auto rounded-xl bg-white mt-2 mr-1 px-3 py-4 flex flex-col">
              <div className="flex flex-row align-middle items-center">
                <Image
                  src={
                    ticket.airline_photo ? ticket.airline_photo : "/plane.svg"
                  }
                  width={100}
                  height={57}
                  alt="garuda"
                />
                <p className="font-bold mb-2 ml-4">{ticket.name}</p>
              </div>
              <div className="flex-col w-4/5 text-black ">
                <div className="flex justify-between mt-2 font-bold">
                  <p className="">
                    {ticket.departure_city} ({ticket.departure_code})
                  </p>
                  <FaExchangeAlt color="black" />
                  <p className="">
                    {ticket.arrival_city} ({ticket.arrival_code})
                  </p>
                </div>
                <div className="flex mt-2">
                  <p className="text-xs pr-3">{ticket.departure_date}</p>
                  <p className="text-xs pr-3">•</p>
                  <p className="text-xs">{ticket.flight_time}</p>
                </div>
                <div className="flex items-center text-ankasa-blue mt-2">
                  <MdCheckCircleOutline className="mr-2" size={20} />
                  <p>Refundable</p>
                </div>
                <div className="flex items-center text-ankasa-blue">
                  <MdCheckCircleOutline className="mr-2" size={20} />
                  <p>Can reschedule</p>
                </div>
                <div className="flex w-full justify-between mt-2 font-bold">
                  <p className="">Ticket Price</p>
                  <p className="text-ankasa-blue"> $ {ticket.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
