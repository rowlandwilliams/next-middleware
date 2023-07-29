import { Inter } from "next/font/google";
import { signOut } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
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
  );
}
