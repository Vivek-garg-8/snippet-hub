// App.tsx (or Home.tsx)
"use client";

import { mainColor } from "@/Colors";
import { useAuth } from "@clerk/nextjs";
import DataObjectIcon from "@mui/icons-material/DataObject";
import Link from "next/link";
export default function Home() {
  return (
    <div
      className="poppins"
      style={{ "--main-color": mainColor } as React.CSSProperties}
    >
      <Navbar />
      <CTASection />
    </div>
  );
}

function Navbar() {
  return (
    <div className="flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col">
      <Logo />
      <Buttons />
    </div>
  );
}

function Logo() {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-[var(--main-color)] p-[6px] rounded-md">
        <DataObjectIcon sx={{ fontSize: 27, color: "white" }} />
      </div>

      <div className="flex gap-1 text-[19px]">
        <span className="font-bold text-[var(--main-color)]">Snippet</span>
        <span className="text-slate-600">Master</span>
      </div>
    </div>
  );
}

function Buttons() {
  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <button 
            className={`max-sm:w-full bg-[var(--main-color)] p=[8px] px-6 text-sm text-white rounded-md`}
          >
            Access to the App
          </button>
        </Link>
      ):(
      <div className="flex gap-2 max-sm:flex-col max-sm:w-full max-sm:mt-8">
        <button className="max-sm:w-full bg-[var(--main-color)] p-[8px] px-6 text-sm text-white rounded-md">
          <Link href = "/sign-in">
            Sign In
          </Link>
        </button>
        <Link href="/sign-up">
        <button
          className={`
          max-sm:w-full
          text-sm 
          border border-[var(--main-color)] 
          text-[var(--main-color)] 
          hover:bg-[var(--main-color)] hover:text-white 
          p-[8px] px-6 rounded-md
        `}
        >
          Sign Up
        </button>
        </Link>
      </div>
      )}
    </div>
  );
}

function CTASection() {
  return (
    <div className="flex flex-col mx-16 items-center mt-[120px] gap-6 ">
      <h2 className="font-bold text-2xl text-center ">
        Organize Your Code Snippets
        <span className={`text-[var(--main-color)]`}> Efficiently!</span>
      </h2>
      <p className="text-center text-sm w-[450px] max-sm:w-full text-slate-500  ">
        With our advanced tagging and search features, you can quickly find the
        snippet you need, right when you need it. Spend less tiem searching for
        code and more time writitng it.
      </p>
      <button
        className={`block px-9 py-3 text-sm font-medium text-white transition focus:outline-none`}
        type="button"
      >
        {`Let's get started!`}
      </button>
    </div>
  );
}
