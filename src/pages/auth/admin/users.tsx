import { Inter } from "next/font/google";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      users only can be seen by admin super
    </main>
  );
}
