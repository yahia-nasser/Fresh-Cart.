"use client";
import { ChangeDetailsAction } from "@/app/profileActions/ChangeDetails";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const ChangeUserDetails = ({}) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangeDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = await ChangeDetailsAction({ name, email, phone });
    setLoading(false);
    if (!data.success) {
      toast.error(data.message, {
        duration: 1500,
        position: "top-center",
      });
    } else {
      toast.success("Data changed successfully!,, So Please Re Login", {
        duration: 2000,
        position: "top-center",
      });
      await signOut({ callbackUrl: "/login" });
      return;
    }
  }

  return (
    <section className="w-full p-5 md:w-[80%] bg-gray-100 h-[80vh] md:p-0 text-center mx-auto mt-10 flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-16 border-b-2 border-b-green-500 p-4">
        Change Details
      </h2>

      <form
        onSubmit={handleChangeDetails}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className="flex flex-col items-start gap-3 mb-3">
          <label htmlFor="name" className="font-bold">
            name
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="name"
            value={name}
            placeholder="Enter Your New name"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col items-start gap-3 mb-3">
          <label htmlFor="Email" className="font-bold">
            Email
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="Email"
            value={email}
            placeholder="Enter Your New Email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="phone" className="font-bold">
            phone
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="phone"
            value={phone}
            placeholder="Enter Your New phone"
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </div>
        <Button type="submit" className="w-[150px] mt-5 cursor-pointer">
          {loading ? (
            <i className="fas fa-spinner fa-spin text-white font-bold"></i>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </section>
  );
};
export default ChangeUserDetails;
