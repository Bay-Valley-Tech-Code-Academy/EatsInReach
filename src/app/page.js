"client side";
import Link from "next/link";
import Image from "next/image";

export default function Verification() {
  return (
    <>
      <Link href="/">
        <div className="flex mx-4 items-center ">
          <Image src="/phLogo.png" height="30" width="40" alt="Yum Yummers" />

          <h2>Yum Yummers</h2>
        </div>
      </Link>
      <div className="flex h-screen justify-center items-center">
        <div className="bg-gray-500 h-30"> <h2>hello</h2></div>
      </div>
    </>
  );
}
