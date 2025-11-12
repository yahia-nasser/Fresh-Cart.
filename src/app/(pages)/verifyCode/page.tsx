"use client";

import { VerifyCodeAction } from "@/app/profileActions/ResetCode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function verify() {
    try {
      setLoading(true);
      const data = await VerifyCodeAction(code);
      setLoading(false);
      if (!data) {
        toast.error("Error", { duration: 2000, position: "top-center" });
      }

      toast.success("Success", {
        duration: 2000,
        position: "top-center",
      });
      router.push("/resetPassword");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Wrong Code");
      }
    }
  }

  return (
    <section className="w-full p-5 md:w-[80%] h-screen md:p-0 text-center mx-auto flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-10">Reset Code</h2>
      <div className="w-full md:w-1/2 border-dotted border-4 p-5 h-1/2 flex justify-center items-center flex-col">
        <label htmlFor="code" className="font-bold">
          Enter The Code
        </label>
        <Input
          className="my-5 w-full md:w-1/2"
          id="code"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <Button
          className="w-full md:w-1/2 mt-5 cursor-pointer"
          onClick={verify}
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

export default VerifyCode;
