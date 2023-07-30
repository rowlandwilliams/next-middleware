import Image from "next/image";
import { Inter } from "next/font/google";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/auth/dashboard");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <form
          className="p-8 bg-white text-center shadow-md rounded-md flex flex-col items-center"
          onSubmit={handleLogin}
        >
          <div className="rounded-full bg-gradient-to-t from-indigo-600 to-fuchsia-300 h-4 w-4 " />
          <input
            className="my-2 block w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-flow-purple"
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="my-2 block w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-flow-purple"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 py-2 rounded-md text-white text-sm"
          >
            Log In
          </button>
        </form>
      </main>
    </>
  );
}
