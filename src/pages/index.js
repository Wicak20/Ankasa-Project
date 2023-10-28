import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import {Explore, Popular, Trending} from "@/components/landing/trending";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Landing() {
  return (
    <Layout>
      <Head>
        <title>Ankasa</title>
      </Head>
      <main
        className={`flex-col flex min-h-screen pt-6 ${poppins.className} bg-ankasa-grey`}
      >
        <Explore/>
        <Trending/>
        <Popular/>
      </main>
    </Layout>
  );
}
