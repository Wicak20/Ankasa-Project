import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";
import { MdLunchDining } from "react-icons/md";
import { MdWifi } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Slider } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import formatDate from "../../../lib/formatDate";
import planes from "../../../public/illustration.svg";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = "https://easy-lime-seal-toga.cyclic.app/"

export async function getServerSideProps() {
  try {
    const res = await axios.get(url + `airlines/flight-all`);
    const data = await res.data.data.tickets;
    const formattedData = formatDate(data);
    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: true } };
  }
}

export default function Ticket({ formattedData, error }) {
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const [sliderValue, setsliderValue] = useState([100, 2000]);
  const validateFacilities = (data) => {
    return (
      <div className="flex flex-row items-center sm:gap-1">
        {data.map((item, index) => {
          if (item === 'meal') {
            return <MdLunchDining key={index} size={24} />
          } else if (item === 'baggage') {
            return <MdLuggage key={index} size={24} />
          } else if (item === 'wifi') {
            return <MdWifi key={index} size={24} />
          } else {
            return null
          }
        })}
      </div>
    )
  };

  const [filter, setFilter] = useState({
    facilities: 0,
    filterFac: [],
    t1: 0,
    t2: 24,
    airlineId: "",
    search: "",
    transit: "",
    p1: "0",
    p2: "2000",
    sort: "ASC",
  });

  const [facilities, setFacilities] = useState("");
  const [filterFac, setFilterFac] = useState([]);
  const handleFacilitiesChange = (event) => {
    const { value, checked } = event.target;
    const facilityValue = parseInt(value, 2);
    const filterFacVal = facilityValue == 4 ? 2 : facilityValue == 2 ? 3 : facilityValue

    if (checked) {
      setFacilities((prev) => prev | facilityValue); 
    } else {
      setFacilities((prev) => prev & ~facilityValue); 
    }
    setFilter({ ...filter, facilities: facilities });
    if (checked) {
      setFilterFac([...filterFac, filterFacVal])
      setFilter({ ...filter, filterFac: [...filterFac, filterFacVal] });
    } else {
      setFilterFac(filterFac.filter(el => el !== filterFacVal))
      setFilter({ ...filter, filterFac: filterFac.filter(el => el !== filterFacVal) });
    }

  };
  const handleSlider = (event, newValue) => {
    setsliderValue(newValue);
    setFilter({ ...filter, p1: sliderValue[0], p2: sliderValue[1] });
  };
  const clearFilter = () => {
    setFilter({
      facilities: 0,
      filterFac: [],
      t1: 0,
      t2: 24,
      airlineId: "",
      search: "",
      transit: "",
      p1: "0",
      p2: "2000",
      sort: "ASC",
    });
  };

  const filterData = (filter) => {
    axios
      .get(
        url +
        "airlines/flight?" +
        "&facilities=" +
        filter.filterFac.toString(',') +
        "&minPrice=" +
        filter.p1 +
        "&maxPrice=" +
        filter.p2 +
        "&airlineId=" +
        filter.airlineId
       
      )
      .then((res) => {
        console.log("get filtered data success");
        res.data.data && setData(formatDate(res.data.data));
      })
      .catch((error) => {
        console.log("error: ", error);
        setIserror(true);
        setErrormsg("Something went wrong");
      });
  };
  useEffect(() => {
    setData(formattedData);
    setIserror(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <Head>
        <title>Ankasa Tickets</title>
      </Head>
      <main className={` ${poppins.className} bg-ankasa-grey text-black`}>
        {/* top */}
        <div
          className="h-44 w-full bg-ankasa-blue rounded-b-2xl flex flex-row items-center justify-between"
          style={{
            backgroundImage: `url(${planes.src})`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: '50%',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex items-center">
            <div className="w-72  p-2 flex-col ml-16">
              <p className="text-white font-bold text-xl">Filters: </p>
              <div className="flex justify-between mt-2">
                <p className="text-white">Transit : </p>
                <p className="text-white">{filter.transit}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Departure Time </p>
                <p className="text-white">
                  {filter.t1} - {filter.t2}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Destination : </p>
                <p className="text-white">{filter.search}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Price Range : </p>
                <p className="text-white">
                  {filter.p1} - {filter.p2}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-row md:flex h-full p-6 px-2">
          <div className="md:w-1/5 md:h-full mx-4 rounded-xl p-2 ">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-BLACK">Filter</p>
              <button
                className="font-bold text-ankasa-blue"
                onClick={() => {
                  clearFilter();
                  filterData(filter);
                }}
              >
                Reset
              </button>
            </div>

            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <Accordion disableGutters className="rounded-t-xl">
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Transit</p>
                </AccordionSummary>
                <AccordionDetails>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-direct" className="p-1 text-black">
                      Direct
                    </label>
                    <input
                      id="chk-direct"
                      type="checkbox"
                      value={"Direct"}
                      checked={filter.transit === "Direct"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit1" className="p-1 text-black">
                      Transit 1
                    </label>
                    <input
                      id="chk-transit1"
                      type="checkbox"
                      value={"1 Transit"}
                      checked={filter.transit === "1 Transit"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit2" className="p-1 text-black">
                      Transit 2+
                    </label>
                    <input
                      id="chk-transit2"
                      type="checkbox"
                      value={"2 Transit"}
                      checked={filter.transit === "2 Transit"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Facilities</p>
                </AccordionSummary>
                <AccordionDetails>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-Luggage" className="p-1 text-black">
                      Luggage
                    </label>
                    <input
                      id="chk-Luggage"
                      type="checkbox"
                      value="001"
                      checked={facilities & 0b001}
                      onChange={handleFacilitiesChange}
                    ></input>
                  </div>


                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-meal" className="p-1 text-black">
                      In-Flight Meal
                    </label>
                    <input
                      id="chk-meal"
                      type="checkbox"
                      value="100"
                      checked={facilities & 0b100}
                      onChange={handleFacilitiesChange}
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-Wifi" className="p-1 text-black">
                      Wifi
                    </label>
                    <input
                      id="chk-Wifi"
                      type="checkbox"
                      value="010"
                      checked={facilities & 0b010} // bitwise AND operator to check if the bit is set
                      onChange={handleFacilitiesChange}
                    ></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Departure Time */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Departure Time</p>
                </AccordionSummary>
                <AccordionDetails>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-0" className="p-1 text-black">
                      00:00 - 06:00
                    </label>
                    <input
                      id="chk-0"
                      type="checkbox"
                      value={"6"}
                      checked={filter.t2 === "6"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "6", t1: "0" })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-6" className="p-1 text-black">
                      06:00 - 12:00
                    </label>
                    <input
                      id="chk-6"
                      type="checkbox"
                      value={"12"}
                      checked={filter.t2 === "12"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "12", t1: "6" })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-12" className="p-1 text-black">
                      12:00 - 18:00
                    </label>
                    <input
                      id="chk-12"
                      type="checkbox"
                      value={"18"}
                      checked={filter.t2 === "18"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "18", t1: "12" })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-18" className="p-1 text-black">
                      18:00 - 24:00
                    </label>
                    <input
                      id="chk-18"
                      type="checkbox"
                      value={"24"}
                      checked={filter.t2 === "24"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "24", t1: "18" })
                      }
                    ></input>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Airlines</p>
                </AccordionSummary>
                <AccordionDetails>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-garuda" className="p-1 text-black">
                      Singapore Airlines
                    </label>
                    <input
                      id="chk-garuda"
                      type="checkbox"
                      value={"1"}
                      checked={
                        filter.airlineId ===
                        "1"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlineId: "1",
                        })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-lion" className="p-1 text-black">
                      Garuda Indonesia
                    </label>
                    <input
                      id="chk-lion"
                      type="checkbox"
                      value={"2"}
                      checked={
                        filter.airlineId ===
                        "2"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlineId: "2",
                        })
                      }
                    ></input>
                  </div>

                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-air" className="p-1 text-black">
                      Lion Air
                    </label>
                    <input
                      id="chk-air"
                      type="checkbox"
                      value={"3"}
                      checked={
                        filter.airlineId ===
                        "3"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlineId: "3",
                        })
                      }
                    ></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Ticket Price */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Ticket Price</p>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-row  w-full justify-between">
                    <p>Lowest</p>
                    <p>Highest</p>
                  </div>
                  <Slider
                    valueLabelDisplay="auto"
                    value={sliderValue}
                    onChange={handleSlider}
                    step={5}
                    min={100}
                    max={2000}
                  />
                  <div className="flex flex-row  w-full justify-between">
                    <p className="font-bold text-ankasa-blue">
                      $ {sliderValue[0]},00
                    </p>
                    <p className="font-bold text-ankasa-blue">
                      $ {sliderValue[1]},00
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Filter Buttons */}
              <div className="flex justify-end px-2">
                <button
                  className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 w-32 shadow-lg"
                  onClick={() => {
                    filterData(filter);
                  }}
                >
                  Filter Tickets
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
            <div className="w-full  flex justify-between px-2">
              <p className="text-lg font-bold text-BLACK">Select Ticket</p>
              <div className="flex items-center">
                <button
                  className="font-bold text-BLACK mx-2"
                  onClick={() => {
                    setFilter({
                      ...filter,
                      sort: filter.sort === "ASC" ? "DESC" : "ASC",
                    });
                    filterData(filter);
                  }}
                >
                  Sort by Date Added
                </button>
                <FaExchangeAlt
                  color="black"
                  style={{ transform: "rotate(90deg)" }}
                />
                <p className="mx-2 font-bold">{filter.sort}</p>
              </div>
            </div>
            {error && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                Connection error!
              </Alert>
            )}
            {isError && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                {errorMsg}
              </Alert>
            )}
            {data?.map((item, index) => (
              <div key={index}>
                {/* ticket */}
                <div className="w-full h-full rounded-xl bg-white mt-2 mr-1 px-3 py-4">
                  <div className="flex flex-row align-middle items-center">
                    <Image
                      src={item.photo}
                      width={100}
                      height={57}
                      alt="garuda"
                    />
                    <p className="font-bold mb-2 ml-6">{item.name}</p>
                  </div>
                  <div className="flex w-full align-middle items-center justify-between px-2 mt-2 text-gray-500">
                    <div className="flex text-2xl font-bold w-44 justify-between my-3">
                      <div className="flex-col">
                        <p>{item.departure_code}</p>
                        <p className="text-sm font-medium ">
                          {item.departure_time}
                        </p>
                      </div>
                      <Image
                        src="/plane.svg"
                        width={36}
                        height={36}
                        alt="logo"
                      />
                      <div className="flex-col">
                        <p>{item.arrival_code}</p>
                        <p className="text-sm font-medium ">
                          {item.arrival_time}
                        </p>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <p>{item.diffs}</p>
                      <p>{item.transit}</p>
                    </div>
                    <div className="w-40  justify-evenly hidden md:block">
                      {validateFacilities(item.facilities)}
                    </div>
                    <div className="hidden md:block">
                      <p className="font-bold text-ankasa-blue mr-2">
                        $ {item.price}
                      </p>
                      <span> /pax</span>
                    </div>
                    <button
                      className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 self-end md:w-32 w-18 shadow-lg"
                      onClick={() => {
                        router.push(`/ticket/${item.code}`);
                      }}
                    >
                      Select
                    </button>
                  </div>
                  <hr className="h-px my-3 bg-gray-300 border-0 " />
                  <div className="text-lg font-bold flex-row flex justify-between align-middle">
                    <div className="flex align-middle text-center items-center w-40 justify-between px-2">
                      <p className="text-md text-ankasa-blue">View Details</p>
                      <FaChevronDown className="text-ankasa-blue" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
