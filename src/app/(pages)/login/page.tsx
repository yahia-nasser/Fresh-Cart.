"use client";
import { LoginScheme, LoginSchemeType } from "@/app/scheme/login.scheme";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Login = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginSchemeType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginScheme),
  });

  async function handleLogin(values: LoginSchemeType) {
    setLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.ok) {
      setLoading(false);
      toast.success("Login Success", {
        position: "top-center",
        duration: 1000,
      });
      window.location.href = res.url || "/";
    } else {
      setLoading(false);
      toast.error(res?.error, {
        position: "top-center",
        duration: 1000,
      });
    }
  }

  return (
    <section className="w-full p-5 md:w-[80%] h-screen md:p-0 text-center mx-auto flex justify-center items-center flex-col">
      <h2 className="font-bold text-3xl mb-10">Login</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-full md:w-1/2 mx-auto mt-10 border-3 border-dotted p-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold mt-5">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold mt-5">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-5 mb-5 cursor-pointer">
            {loading ? (
              <i className="fas fa-spinner fa-spin text-white font-bold"></i>
            ) : (
              "Login"
            )}
          </Button>
          <Link href={"/forgotPasswords"}>Forgot Passowrd</Link>
        </form>
      </Form>
    </section>
  );
};

export default Login;
