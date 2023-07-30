import { Inter } from "next/font/google";
import { signOut } from "next-auth/react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Head>
        <title>Dashbard</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
      >
        protected shit
        <button
          className="bg-indigo-600 rounded-md px-4 py-2 text-white"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </main>
    </>
  );
}
