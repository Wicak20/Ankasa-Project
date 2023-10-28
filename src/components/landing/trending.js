import Image from "next/image";
import planes from "../../../public/illustration.svg";
import { useRouter } from "next/router";
const destination = [
  {
    id: "1",
    city: "Tokyo",
    country: "Japan",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878117/image_4_hpll4y.jpg",
  },
  {
    id: "2",
    city: "Barcelona",
    country: "Spain",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878222/lvXeO04CxwQ_jau1ig.jpg",
  },
  {
    id: "3",
    city: "Tokyo",
    country: "Japan",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878117/image_4_hpll4y.jpg",
  },
  {
    id: "4",
    city: "Barcelona",
    country: "Spain",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878222/lvXeO04CxwQ_jau1ig.jpg",
  },
  {
    id: "5",
    city: "Tokyo",
    country: "Japan",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878117/image_4_hpll4y.jpg",
  },
  {
    id: "6",
    city: "Barcelona",
    country: "Spain",
    photo:
      "https://res.cloudinary.com/dx6mvwpti/image/upload/v1697878222/lvXeO04CxwQ_jau1ig.jpg",
  },
];
export const Trending = (props) => {
  return (
    <div className="md:px-16 px-4 my-6">
      <p className="md:block text-md hidden text-ankasa-blue">TRENDING</p>
      <p className="text-2xl text-black md:font-bold">Trending Destinations</p>
      <div className="text-black my-4 carousel carousel-center">
        {destination.map((item, index) => (
          <div
            key={item.id}
            className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white carousel-item"
            style={{
              backgroundImage: `url(${item.photo})`,
              backgroundPosition: `center`,
              backgroundSize: `cover`,
            }}
          >
            <p>{item.city} ,</p>
            <p>{item.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Popular = () => {
  return (
    <div className="md:px-16 px-4 my-4">
      <div
        className="text-white my-4 w-full h-96 bg-ankasa-blue rounded-2xl p-6"
        style={{
          backgroundImage: `url(${planes.src})`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <div className="w-full ">
          <div className="flex-col h-auto ">
            <p className="md:block text-md hidden md:text-center">TOP 10</p>
            <p className="text-2xl  md:font-bold md:text-center">
              Top 10 destinations
            </p>
          </div>
          <div className="md:flex h-60 mt-2 p-4 carousel carousel-center ">
            {destination.map((item, index) => (
              <div
                key={item.id}
                className="rounded-full w-44 h-44 bg-ankasa-blue border-4 border-white mx-5 flex flex-col justify-end carousel-item"
                style={{
                  backgroundImage: `url(${item.photo})`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                }}
              >
                <div className="-mb-8 flex justify-center w-full ">
                  <p className="bg-ankasa-blue rounded-2xl px-2">
                    {item.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Explore = () => {
  const router = useRouter();

  return (
    <div className="block md:px-16 px-4 my-4">
      <div className="md:w-11/12 bg-transparent md:flex justify-between md:absolute">
        <div>
          <p className="text-4xl font-extrabold text-black ">
            Find your <span className="text-ankasa-blue">Flight</span>
          </p>
          <p className="text-gray-600 my-4">And explore the world with us</p>
        </div>
        <input
          type="text"
          id="search-navbar"
          className="md:hidden block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 self-center"
          placeholder="Where do you want to go ... ?"
          onClick={() => {
            router.push("/ticket");
          }}
        />
        <Image
          src={"/image 4.png"}
          width={400}
          height={250}
          alt="japan"
          className="rounded-2xl mt-16 hidden xl:block"
        />
      </div>
      <Image
        src={"/japan.jpg"}
        width={800}
        height={400}
        alt="japan"
        className="rounded-2xl -ml-24 mt-40 shadow-2xl hidden xl:block"
      />
    </div>
  );
};
