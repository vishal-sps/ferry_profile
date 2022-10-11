import Link from "next/link";
import styled from "styled-components";
import { Popover } from "@headlessui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import SearchBar from "./components/search-bar";
import useUser from "../../../custom-hooks/use-user";

import Logo from "../logo";
import User from "./components/svgs/user.svg";
import Message from "./components/svgs/message.svg";
import { crushToken } from "../../../utils/token-manager";
import Notifications from "./components/Notifications";
import { IMAGE_URL } from "../../../constants/enviroment-vars";
import { myLoader } from "../../../services/custom_loader";
import useCart from "../../../custom-hooks/use-cart";
import { useDispatch, useSelector } from "react-redux";
function NavigationBar() {
  const { user, loading, loggedOut, mutate } = useUser();
  const router = useRouter();
  const [isLoggedIn] = useState(true);

  const { cart, cartMutateCount, cartCount } = useCart();
  const isSearchPath = () => router.pathname.includes("search");

  const cartValue = useSelector((state) => state.cartCount.cartCount);
  return (
    <NavBar
      className="fixed w-full bg-white z-20 h-12 md:h-16"
      isSearchPath={isSearchPath()}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between h-full">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <Logo className="md:h-7 h-5" />
            </a>
          </Link>

          {isSearchPath() && <SearchBar />}
        </div>

        {!user && (
          <div className="hidden md:flex items-center">
            
              <button>
              <Link href={"https://chef.getchefjoy.com/login-as-chef"}>
                <a target={"_blank"} className="mr-8 text-sm font-medium">
                  Login As Chef
                </a>
                </Link>
              </button>
          
              <button>
              <Link href={"https://chef.getchefjoy.com/signup-as-chef"}>
                <a target={"_blank"} className="mr-8 text-sm font-medium">
                  Signup As Chef
                </a>
                </Link>
              </button>
          

            <Link href="/login">
              <a className="border-2 px-4 py-2 rounded border-black text-sm font-medium">
                Login / Signup
              </a>
            </Link>
          </div>
        )}

        {user && (
          <div className="hidden md:flex items-center">
            {/* <Notifications />
            <Message className="mr-5" onClick={() => router.replace("/chef/messages")} /> */}

            <Popover className="relative">
            <div className="flex">
            <div style={{margin:"auto 15px", position:"relative", cursor:cartValue > 0 ? "pointer":"default"}} onClick={()=>{
                 cartValue > 0 && router.push("/chef/order") 
                } }>
               {cartValue > 0  && <span className="cartValue"> {cartValue} </span>} 
                <svg xmlns="http://www.w3.org/2000/svg" style={{width:"30px"}} viewBox="0 0 576 512"><path style={{fill: cartValue > 0 ? "#e23744" : "#eedbdb"}} d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
                </div>

              <Popover.Button>
                  <div className="relative bg-gray-200 h-11 w-11 rounded-full">
                    {user?.data?.profile_pic && (
                      <Image
                        src={` ${IMAGE_URL}${user.data.profile_pic}`}
                        alt="chef"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                        loader={myLoader}
                      />
                    )}
                  </div>
              </Popover.Button>
              </div>

              <Popover.Panel className="absolute z-10 border right-1 bg-white rounded-lg grid">
                <div className="flex flex-col w-44 py-2">
                  <button
                    onClick={() => {
                      crushToken("token");
                      mutate(null);
                      router.replace("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
                <div className="flex flex-col w-44 py-2">
                  <button onClick={() => router.replace("/chef/bookings")}>
                    Bookings
                  </button>
                </div>
                <div className="flex flex-col w-44 py-2">
                  <button onClick={() => router.replace("/chef/address")}>
                    Address
                  </button>
                </div>
                <div className="flex flex-col w-44 py-2">
                  <button
                    // onClick={() => router.replace("/chef/profile-settings")}
                    onClick={() => router.replace("/chef/settings")}

                  >
                    Settings
                  </button>
                </div>
                {/* <div className="flex flex-col w-44 py-2">
                  <button
                    onClick={() => router.replace("/chef/reset-pswd")}
                  >
                    Reset Password
                  </button>
                </div> */}
              </Popover.Panel>
            </Popover>
          </div>
        )}

        {/* Mobile Navigation Starts Here */}
        <div className="md:hidden">
          <div className="flex items-center">
            {/* search icon */}
            {isSearchPath() && (
              <button className="w-5 h-5 mr-5" onClick={() => router.push("/")}>
                <svg viewBox="0 0 21.115 21.115">
                  <g id="Group_11471" transform="translate(1 -4.32)">
                    <circle
                      id="Ellipse_40"
                      cx="7.48"
                      cy="7.48"
                      r="7.48"
                      transform="translate(0 5.32)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <line
                      id="Line_21"
                      x1="5.61"
                      y1="5.61"
                      transform="translate(13.091 18.41)"
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </g>
                </svg>
              </button>
            )}

            {/* user pop over */}
            <Popover className="relative">
            <div className="flex">
         {
          user ?  <div style={{margin:"auto 15px", position:"relative", cursor:cartValue > 0 ? "pointer":"default"}} onClick={()=>{
            cartValue > 0 && router.push("/chef/order") 
           } }>
          {cartValue > 0  && <span className="cartValue-mobile"> {cartValue} </span>} 
           <svg xmlns="http://www.w3.org/2000/svg" style={{width:"20px"}} viewBox="0 0 576 512"><path style={{fill: cartValue > 0 ? "#e23744" : "#eedbdb"}} d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
           </div>
           : 
           <div style={{margin:"auto 15px", position:"relative", cursor: "pointer"}} onClick={()=>{router.push("/login") 
           } }>
           <svg xmlns="http://www.w3.org/2000/svg" style={{width:"20px"}} viewBox="0 0 576 512"><path style={{fill: "#eedbdb"}} d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48H76.1l60.3 316.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H179.9l-9.1-48h317c14.3 0 26.9-9.5 30.8-23.3l54-192C578.3 52.3 563 32 541.8 32H122l-2.4-12.5C117.4 8.2 107.5 0 96 0H24zM176 512c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm336-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48z"/></svg>
           </div>

         }  

                <Popover.Button>
                <div className="bg-red-100 h-9 w-9 rounded-lg flex items-center justify-center">
                  <User className="text-red-500 h-5" />
                </div>
              </Popover.Button>
              </div>

              {user ? (
                <Popover.Panel className="absolute z-10 border right-1 bg-white rounded-lg">
                  <div className="flex flex-col w-32 py-2">
                    {/* <a className="px-4 py-2">Notification</a>

                    <a className="px-4 py-2">Messages</a> */}

                    <button
                      className="px-4 text-left"
                      onClick={() => {
                        crushToken("token");
                        mutate(null);
                        router.replace("/");
                      }}
                    >
                      Log out
                    </button>




                  </div>

                <div className="flex flex-col w-32 py-2">
                  <button  
                  className="px-4  text-left" 
                  onClick={() => router.replace("/chef/bookings")}>
                    Bookings
                  </button>
                </div>
                <div className="flex flex-col w-32 py-2">
                  <button 
                   className="px-4  text-left"
                    onClick={() => router.replace("/chef/address")}>
                    Address
                  </button>
                </div>
                <div className="flex flex-col w-32 py-2">
                  <button
                   className="px-4  text-left"
                    // onClick={() => router.replace("/chef/profile-settings")}
                    onClick={() => router.replace("/chef/settings")}

                  >
                    Settings
                  </button>
                </div>


                  {/* <div className="flex flex-col w-44 py-0">
                    <a className="px-4 py-2">Notification</a>

                    <a className="px-4 py-2">Messages</a>
                  </div> */}
                </Popover.Panel>
              ) : (
                <Popover.Panel className="absolute z-10 border right-1 bg-white rounded-lg">
                  <div className="flex flex-col w-44 py-2">

               
                <Link href={"https://chef.getchefjoy.com/login-as-chef"}>
                    <a className="px-4 py-2">Login As Chef</a>
                    </Link>
                    <Link href={"https://chef.getchefjoy.com/signup-as-chef"}> 
                    <a className="px-4 py-2">Signup As Chef</a>
                    </Link>
                    <Link href="/login">
                      <a className="px-4 py-2">Login /Signup</a>
                    </Link>
                  </div>
                </Popover.Panel>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </NavBar>
  );
}

export default NavigationBar;

const NavBar = styled.nav`
  ${(props) => !props.isSearchPath && "border-bottom: 1px solid #0000000F;"}
`;
