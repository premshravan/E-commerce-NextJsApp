"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";

import React from "react";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import { Button } from "./ui/button";
import useBasketStore from "@/store/store";

const Header = () => {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.log("Error:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap justify-between px-4 py-3 items-center">
      <div className="flex flex-wrap justify-between items-center w-full">
        <Link
          className="text-blue-600 font-bold text-2xl cursor-pointer hover:opacity-70 mx-auto sm:mx-0"
          href="/"
        >
          ShopyFy
        </Link>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="seacrh for products"
            className="bg-gray-200 text-gray-800 rounded focus:ring-2 focus:outline-none border px-4 py-2 max-w-4xl w-full"
          />
        </Form>
        <div className="flex items-center space-x-4 sm:mt-0 sm:flex-none ">
          <Link
            href="/basket"
            className="bg-blue-600 flex flex-1 relative py-2 px-4 rounded  sm:mx-4 justify-center items-center  sm:flex-none  text-white space-x-2 hover:bg-lime-600 font-bold  hover:text-black "
          >
            <TrolleyIcon className="w-7 h-7" />
            {/* span item count once the global state is implemented */}
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center p-3 text-xs">
                {itemCount}
              </span>
            )}
            <span>My Basket</span>
          </Link>
          {/* Users area */}
          <ClerkLoaded>
            {/* if user becomes true or exists */}
            <SignedIn>
              <Link
                href="/orders"
                className=" bg-blue-600 flex relative py-2 sm:mx-4 px-4 rounded justify-center items-center text-white space-x-2  hover:bg-lime-400  hover:text-black font-bold"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My orders</span>
              </Link>
            </SignedIn>
            {/* if the user exists */}
            {user ? (
              <div className="flex space-x-3 items-center space-y-4">
                <UserButton />
                <div className="hidden sm:block text-md">
                  <p className="text-gray-700">Welcome Back..!!!</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-600 px-8 py-2 rounded text-xl hover:bg-lime-400 ">
                <SignInButton mode="modal" />
              </div>
            )}
            {/* create passkey */}
            {user?.passkeys.length === 0 && (
              <Button
                onClick={createClerkPasskey}
                className="text-xl bg-gray-600 text-white border font-bold animate-pulse hover:bg-blue-600 hover:text-black border-red-500 "
              >
                Create Passkey
              </Button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
