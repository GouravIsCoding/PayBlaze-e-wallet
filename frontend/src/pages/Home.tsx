/// <reference types="vite-plugin-svgr/client" />
import Container from "@/components/container/Container";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image0 from "../assets/image0.jpg";
import Image1 from "../assets/image1.jpg";
import Image2 from "../assets/image2.jpg";

const imageArr = [
  { image: Image1, review: "Most intuitive UI by miles.", name: "Vishal Gen" },
  { image: Image0, review: "What matters most is trust!", name: "Sabiri Khan" },
  {
    image: Image2,
    review: "Payments at the speed of light",
    name: "John Start",
  },
];

export default function Home() {
  return (
    <Container>
      <div
        className={`w-full flex flex-col justify-center self-center md:pb-0 pb-4 bg-center py-48 border-b-8 border-black`}
      >
        <div className="flex flex-col md 2xl:flex-row justify-center align-middle">
          <div className="2xl:w-1/2 flex flex-col text-white  justify-evenly items-center">
            <h1 className="text-4xl">BlazePay</h1>
            <h2 className="text-2xl">Blazingly fast Payments</h2>
          </div>

          <div className="pt-5 xl:w-1/2 w-full  text-white flex flex-col justify-center self-center">
            <Link
              className="border-y-2 px-12 py-4 inline-block border-gray-200 bg-gradient-to-r from-purple-500 to-blue-400 text-white rounded-2xl mx-4"
              to={"/signin"}
            >
              <h1 className="text-4xl font-sans font-bold">Signin Now</h1>
            </Link>
            <div>
              <svg
                className="w-1/4 h-auto inline-block my-2"
                viewBox="0 0 24 24"
                fill="#d580ff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></rect>{" "}
                  <path
                    d="M3 10H20.5"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M7 15H9"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <p className=" text-lg text-white px-8 m-4 inline-block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, sunt cupiditate! Quidem, officiis eveniet sed itaque
              voluptate cum eaque, dolores corporis distinctio est, minima
              velit. Sunt sed corporis consequuntur.
            </p>
            <p className="text-xl font-sans font-bold pb-24">
              Blazingly fast payments
            </p>
          </div>
        </div>
      </div>

      <div
        className={`w-full bg-center flex flex-col justify-center self-center md:pb-0 pb-4 bg-cover py-48 border-b-8 border-black`}
      >
        <div className="flex flex-col md 2xl:flex-row justify-center align-middle">
          <div className="2xl:w-1/2 flex flex-col text-white  justify-evenly items-center">
            <h1 className="text-4xl">Payments</h1>
            <h2 className="text-2xl">Now at your fingertips</h2>
          </div>

          <div className="pt-5 xl:w-1/2 w-full  text-white flex flex-col justify-center self-center">
            <Link
              className="border-y-2 px-12 py-4 inline-block border-gray-200 bg-gradient-to-r from-purple-500 to-blue-400 text-white rounded-2xl mx-4"
              to={"/dashboard"}
            >
              <h1 className="text-4xl font-sans font-bold">Access Dashboard</h1>
            </Link>
            <div className="my-4">
              <p className="text-3xl text-white inline-block bg-gradient-to-r from-purple-500 to-blue-400 p-6 rounded-lg">
                Deposit <br />
                Send / Receive <br /> Withdraw
              </p>
            </div>
            <p className=" text-lg text-white px-8 m-4 inline-block">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, sunt cupiditate! Quidem, officiis eveniet sed itaque
              voluptate cum eaque, dolores corporis distinctio est, minima
              velit. Sunt sed corporis consequuntur.
            </p>
            <p className="text-xl font-sans font-bold pb-24">
              Blazingly fast payments
            </p>
          </div>
        </div>
      </div>
      <div
        className={`w-full bg-center flex flex-col justify-center self-center md:pb-0 pb-4 bg-cover py-48`}
      >
        <div className="flex flex-col md 2xl:flex-row justify-center align-middle">
          <div className="2xl:w-1/2 flex flex-col text-white  justify-evenly items-center">
            <h2 className="text-2xl">Your Feedback Matters</h2>
            <h1 className="text-4xl">So do you!</h1>
          </div>

          <div className="pt-5 xl:w-1/2 w-full  text-white flex flex-col justify-center self-center">
            <Carousel className="w-full mx-auto max-w-xl md:max-w-lg pb-16">
              <CarouselContent>
                {Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <h1 className="text-2xl bg-gradient-to-r from-purple-500 to-blue-400 text-white  font-sans py-4 font-semibold">
                          {imageArr[index].name}
                        </h1>
                        <CardContent className="flex flex-col aspect-square items-center justify-center">
                          <img
                            className="w-64 h-auto rounded-full"
                            src={imageArr[index].image}
                            alt=""
                          />
                          <h1 className="text-2xl text-gray-900 font-sans border-4 border-black mt-2 px-3">
                            "{imageArr[index].review}"
                          </h1>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:inline-flex" />
              <CarouselNext className="hidden sm:inline-flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </Container>
  );
}
