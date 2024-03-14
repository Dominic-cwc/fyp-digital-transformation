import "@/styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>DECC/NEC System V1.0</title>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  );
}
