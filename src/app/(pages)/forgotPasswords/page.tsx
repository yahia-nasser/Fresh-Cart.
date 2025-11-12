"use client";
import { ForgotPasswordAction } from "@/app/profileActions/ForgotPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function sendCode() {
    if (!email || !email.includes("@")) {
      toast.error("Please Enter Your Valid Email", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    try {
      setLoading(true);
      const data = await ForgotPasswordAction(email);
      setLoading(false);
      if (data?.statusMsg === "success") {
        toast.success(data?.message, {
          duration: 2000,
          position: "top-center",
        });
        router.push("/verifyCode");
      }
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error("Something went wrong", {
          duration: 2000,
          position: "top-center",
        });
      }
    }
  }
  return (
    <section className="w-full p-5 md:w-[80%] h-screen md:p-0 text-center mx-auto flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-10">Forgot Password</h2>
      <div className="w-full md:w-1/2 border-dotted border-4 p-5 h-1/2 flex justify-center items-center flex-col">
        <label htmlFor="email" className="font-bold">
          Confirm Your Email
        </label>
        <Input
          className="my-5 w-full md:w-1/2"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          className="w-full md:w-1/2 mt-5 cursor-pointer"
          onClick={sendCode}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin text-white font-bold"></i>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </section>
  );
};
export default ForgotPassword;
