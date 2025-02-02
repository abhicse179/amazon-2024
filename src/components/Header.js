// import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const signOutAndRedirect = () => {
    console.log("Inside signOutAndRedirect...");
    signOut();
    console.log("Redirecting to homepage ...");
    router.push("/");
  };

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex item-center flex-grow sm:flex-grow-0">
          <img
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={100}
            height={40}
            className="cursor-pointer object-contain mx-3"
          />
        </div>
        {/* Searchbar */}
        <div className="hidden sm:flex h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 items-center">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none px-4"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right section */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 white-space-no-wrap">
          <div onClick={!session ? signIn : null} className="link">
            <p>
              {session
                ? `Hello, ${session.user.name.split(" ")[0]}`
                : "Sign In"}
            </p>
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          {session && (
            <div onClick={signOutAndRedirect} className="link">
              <p>{`Not ${session.user.name.split(" ")[0]}?`}</p>
              <p className="font-extrabold md:text-sm">Sign out</p>
            </div>
          )}
          <div className="link" onClick={() => router.push("/orders")}>
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center"
          >
            <span className="absolute top-0 right-0 md:right-7 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              Cart
            </p>
          </div>
        </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-4" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Deals</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grcery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
