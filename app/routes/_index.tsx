import { MetaFunction } from "@remix-run/node";

import SignInForm from "~/components/signInForm";

import logoPic from "../../public/images/logo.png";
import homePic from "../../public/images/main_bg.jpg";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export default function Index() {
  return (
    <body className="bg-biceblue">
      <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border-4 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />

          <div className="flex justify-center flex-col items-center">
            <div>
              <img
                className="relative w-64 object-cover pt-12"
                src={logoPic}
                alt=""
              />
            </div>
            <br />
            <br />
            <br />
            <div>
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
