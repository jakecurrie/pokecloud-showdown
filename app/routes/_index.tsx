import { MetaFunction } from "@remix-run/node";

import logoPic from "../../public/images/logo.png";
import homePic from "../../public/images/poke3.webp";

export const meta: MetaFunction = () => [{ title: "PokeCloud Showdown" }];

export default function Index() {
  return (
    <body className="bg-onyx">
      <div className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-full h-5/6 rounded-lg overflow-hidden relative border border-4 border-charcoal">
          <img
            className="absolute inset-0 blur-sm w-full h-full object-cover"
            src={homePic}
            alt=""
          />

          <div className="flex justify-center flex flex-col items-center">
            <div>
              <img
                className="relative w-64 object-cover pt-12"
                src={logoPic}
                alt=""
              />
            </div>
            <div>
              <form className="relative mt-8 flex flex-col items-end ">
                <input
                  type="text"
                  className="w-64 h-10 border border-sage rounded-lg px-4 py-2 mb-4"
                  placeholder="Username"
                />
                <input
                  type="password"
                  className="w-64 h-10 border border-sage rounded-lg px-4 py-2 mb-4"
                  placeholder="Password"
                />
                <button className="w-64 h-10 bg-charcoal border border-sage text-honeydew rounded-lg px-4 py-2 mb-4">
                  Sign In
                </button>
                <br />
                <button className="w-64 h-10 bg-charcoal border border-sage text-honeydew rounded-lg px-4 py-2">
                  Not a member? Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
  // <main className="relative min-h-screen bg-gray-700 sm:flex sm:items-center sm:justify-center">
  //   <div className="relative sm:pb-16 sm:pt-8">
  //     <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
  //       <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
  //         <div className="absolute inset-0">
  //           <img
  //             className="h-full w-full object-cover"
  //             src={homePic}
  //             alt="Home background pic"
  //           />
  //           <div className="absolute inset-0 bg-[color:rgba(255,56,56,0.5)] mix-blend-multiply" />
  //         </div>
  //         <div className="relative px-4 pb-48 pt-12 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 lg:pb-64 lg:pt-16">
  //           <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
  //             <span className="block uppercase font-pokemon text-blue-500 drop-shadow-md">
  //               PokeCloud Showdown
  //             </span>
  //           </h1>
  //           <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
  //             Feeling lucky, punk?
  //           </p>
  //           <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
  //             {user ? (
  //               <Link
  //                 to="/collections"
  //                 className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-red-700 shadow-sm hover:bg-red-50 sm:px-8"
  //               >
  //                 Enter the showdown
  //               </Link>
  //             ) : (
  //               <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
  //                 <Link
  //                   to="/join"
  //                   className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-800 shadow-sm hover:text-yellow-500 sm:px-8"
  //                 >
  //                   Sign up
  //                 </Link>
  //                 <Link
  //                   to="/login"
  //                   className="flex items-center justify-center rounded-md bg-blue-800 px-4 py-3 font-medium text-white hover:bg-yellow-500"
  //                 >
  //                   Log In
  //                 </Link>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </main>
  // );
}
