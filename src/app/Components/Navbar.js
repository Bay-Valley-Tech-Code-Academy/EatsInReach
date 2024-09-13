import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-[#dfaf90] flex w-full items-center h-screen max-h-14 justify-between">
      {/*/Pages/Home?LandingPage*/}
      <div className="flex mx-4 justify-between items-center ">
        <Link href="/">
          <Image src="/phLogo.png" height="30" width="40" alt="Yum Yummers" />
        </Link>
        <h2 className="hidden sm:block pl-2">Yum Yummers</h2>
      </div>

      <div className="flex">
        <Link href="/Pages/Cart">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <Image
              src="/shoppingcart.png"
              height="15"
              width="25"
              alt="Your Shopping Cart"
              className=""
            />
          </div>
        </Link>

        <Link href="/Pages/Restaurants">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>Restaurants</h2>
          </div>
        </Link>

        <Link href="/Pages/Favorites">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>Favorites</h2>
          </div>
        </Link>

        <Link href="/Pages/UserProfile" className="hidden">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>User Profile</h2>
            {/*hidden until signed in*/}
          </div>
        </Link>

        {/*/pages/Vendor-UserLogin*/}
        <Link href="/Pages/Login">
          <div className="hover:bg-[#bb9277] p-2 sm:p-4">
            <h2>Login</h2>
          </div>
        </Link>
      </div>
    </header>
  );
}
