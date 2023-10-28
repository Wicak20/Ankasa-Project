import "@/styles/globals.css";
import NextNProgress from 'nextjs-progressbar';
import { CookiesProvider } from "react-cookie";
export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      {/* <NextNProgress height={6} color="#2395FF" /> */}
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
