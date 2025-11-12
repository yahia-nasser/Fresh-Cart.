import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 min-h-[30vh] p-5 mt-10">
      <div className="w-full md:w-[80%] mx-auto">
        <h3 className="font-bold text-2xl mb-2">Get The FreshCart App</h3>
        <p className="text-gray-500 mb-3">
          We will send you a link , open it in youtr phone to download the app
        </p>
        <div className="flex gap-3 justify-between ">
          <Input
            type="email"
            placeholder="Your Email"
            className="rounded-2xl w-2/3 border-2 border-gray-400"
          />
          <button className="rounded-2xl bg-green-500 text-white px-2 py-1 cursor-pointer w-[150px]">
            Share App Link
          </button>
        </div>
        <div className="flex justify-between items-center border-2 mt-3 border-gray-300 rounded-xl p-3 flex-col md:flex-row">
          <div className="flex gap-4 items-center flex-col md:flex-row">
            <p>Payment Partners</p>
            <Image
              src="/assets/footer/amazon.png"
              alt="amazon"
              width={30}
              height={30}
              style={{ height: "auto" }}
            />
            <Image
              src="/assets/footer/american.png"
              alt="american"
              width={30}
              height={30}
              style={{ height: "auto" }}
            />
            <Image
              src="/assets/footer/master.png"
              alt="master"
              width={30}
              height={30}
              style={{ height: "auto" }}
            />
            <Image
              src="/assets/footer/paypal.png"
              alt="paypal"
              width={30}
              height={30}
              style={{ height: "auto" }}
            />
          </div>

          <div className="flex gap-4 items-center flex-col md:flex-row">
            <p>Get deliveries with FreshCart</p>
            <Image
              src="/assets/footer/googleplay.png"
              alt="googleplay"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
            <Image
              src="/assets/footer/appstore.png"
              alt="appstore"
              width={100}
              height={100}
              style={{ height: "auto" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
