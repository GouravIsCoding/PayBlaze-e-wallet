"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "@/services/api/auth";

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

export const formSchema = z.object({
  firstname: z.string().min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastname: z.string().min(2, {
    message: "last name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
});

export default function Signup() {
  // ...
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    registerUser(data)
      .then((res) => {
        const data = res.data;
        const message = res.data?.message;
        const error = res.error;

        if (error) {
          return navigate("/signup", { state: { error } });
        } else if (data) {
          return navigate("/signin", { state: { message } });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-gray-800 flex h-screen justify-center ">
      <div className="hidden md:flex flex-col justify-between text-white text-center w-[50%] bg-black shadow">
        <p className="text-left p-5 font-sans">Built by Gourav Thakur</p>
        <h1 className="text-4xl py-10 font-bold mx-auto self-center">
          Signup Now
        </h1>
        <p className="font-sans">
          Built with typescript shadcn react-hook-form zod tailwind.
        </p>
        <h1 className="text-sm font font-serif p-5 self-start">PayBlaze</h1>
      </div>
      <div className="bg-white shadow w-full md:w-[45%] py-8 px-12 lg:px-24 flex flex-col h-full justify-center self-center">
        <Form {...form}>
          <h1 className="font-bold text-3xl py-2 text-center">Signup</h1>
          <p className="text-center text-lg py-2">Create your account now</p>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-2xl"
                      placeholder="Your First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your first name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-2xl"
                      placeholder="Your Last Name"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your last name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-2xl"
                      placeholder="Your E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter valid email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-2xl"
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"full"} type="submit">
              Submit
            </Button>
            <h1 className="text-center">
              Already registered?{" "}
              <Link className="underline" to={"/signin"}>
                Signin
              </Link>
            </h1>
          </form>
        </Form>
      </div>
    </div>
  );
}
