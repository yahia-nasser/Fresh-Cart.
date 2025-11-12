"use client";
import { ResetPasswordAction } from "@/app/profileActions/ResetPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "sonner";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function resetPass() {
    setLoading(true);
    const data = await ResetPasswordAction(email, password);
    setLoading(false);
    const payload = await data;
    if (payload?.token) {
      const signInRes = await signIn("credentials", {
        redirect: false,
        email,
        password: password,
      });
      console.log(signInRes);
      if (signInRes?.ok) {
        toast.success("Password Successfully Changed", {
          duration: 2000,
          position: "top-center",
        });
        router.push("/login");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  }
  return (
    <section className="w-full p-5 md:w-[80%] h-screen md:p-0 text-center mx-auto flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-10">Reset Password</h2>
      <div className="w-full md:w-1/2 border-dotted border-4 p-5 h-1/2 flex justify-center items-center flex-col">
        <label htmlFor="email" className="font-bold">
          Enter your Email
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

        <label htmlFor="password" className="font-bold">
          Enter your New Password
        </label>
        <Input
          className="my-5 w-full md:w-1/2"
          id="password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          className="w-full md:w-1/2 mt-5 cursor-pointer"
          onClick={resetPass}
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
export default ResetPassword;
