"use client";

import { ChangePasswordAction } from "@/app/profileActions/ChangePassword";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({}) => {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleChangePw(e: React.FormEvent) {
    try {
      e.preventDefault();
      setLoading(true);
      const data = await ChangePasswordAction({ current, newPw, rePw });
      if (!data) {
        throw new Error(data.message);
      }
      setLoading(false);
      if (newPw !== rePw) {
        toast.error("New Password Doesn't Match ! ", {
          duration: 1500,
          position: "top-center",
        });
        setLoading(false);
      } else {
        setLoading(false);
        toast.success("Password changed successfully!,, So Please Re Login", {
          duration: 2000,
          position: "top-center",
        });
        setCurrent("");
        setNewPw("");
        setRePw("");
        await signOut({ callbackUrl: "/login" });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Wrong Current Password", {
          duration: 1500,
          position: "top-center",
        });
        setLoading(false);
      }
    }
  }

  return (
    <section className="w-full p-5 md:w-[80%] bg-gray-100 h-[80vh] md:p-0 text-center mx-auto mt-10 flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-16 border-b-2 border-b-green-500 p-4">
        Change Password
      </h2>

      <form
        onSubmit={handleChangePw}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <div className="flex flex-col items-start gap-3 mb-3">
          <label htmlFor="current" className="font-bold">
            Current Password
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="current"
            value={current}
            placeholder="Your Current Password"
            onChange={(e) => {
              setCurrent(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col items-start gap-3 mb-3">
          <label htmlFor="new" className="font-bold">
            New Password
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="new"
            value={newPw}
            placeholder="Your New Password"
            onChange={(e) => {
              setNewPw(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <label htmlFor="rePw" className="font-bold">
            Confirm Password
          </label>
          <input
            className="px-5 py-2 border-3 border-gray-300 rounded-2xl transition focus:border-green-600 "
            type="text"
            id="rePw"
            value={rePw}
            placeholder="Confirm New Password"
            onChange={(e) => {
              setRePw(e.target.value);
            }}
          />
        </div>
        <Button type="submit" className="w-[150px] mt-5 cursor-pointer">
          {loading ? (
            <i className="fas fa-spinner fa-spin text-white font-bold"></i>
          ) : (
            "Change Password"
          )}
        </Button>
      </form>
    </section>
  );
};
export default ChangePassword;
