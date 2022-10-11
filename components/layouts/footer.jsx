import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import Logo from "./logo";
import Twitter from "../svg/twitter";
import Facebook from "../svg/facebook";
import Instagram from "../svg/instagram";
import { fetchCities } from "../../services/chef-api";
import Link from "next/link";

function Footer() {
  const coordinates = useSelector((state) => state.geoLocation);
  const [cities, setCities] = useState([]);

  //hooks
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (coordinates && Object.keys(coordinates).length) {
      fetchCities({ ...coordinates, limit: 5 })
        .then((res) => {
          if (Array.isArray(res)) return;

          setCities(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [coordinates]);

  const handleClick = (name, id) => {
    dispatch({ type: "SET_SEARCH_PAYLOAD", payload: { city: { name, id } } });
    router.push("/chef/search");
  };

  return (
    <footer className="w-11/12 mx-auto pb-5 pt-44">
      <section className="grid md:grid-cols-6 grid-cols-2 gap-y-8 pb-12">
        <div className="col-span-2">
          <div className="mb-3" style={{ width: 150 }}>
            <Logo />
          </div>

          <div className="mb-4">Your personal chef to cook anything.</div>

          <div className="flex">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>

        <div className="col-span-1">
          <h5 className="font-semibold mb-4">Company</h5>
       <Link href="/about_us"><a><div className="text-gray-500 mb-2">Who We Are</div></a></Link>  
          {/* <div className="text-gray-500 mb-2">Blog</div> */}
          {/* <div className="text-gray-500 mb-2">Careers</div> */}
          {/* <div className="text-gray-500 mb-2">Report Fraud</div> */}
        <Link href="/contact_us"><a><div className="text-gray-500">Contact Us</div></a></Link>  
        </div>
        <div className="col-span-1">
          <h5 className="font-semibold mb-4">Nearby</h5>
          {cities.length ? (
            <>
              {cities.map((city, index) => (
                <button
                  className="text-gray-500 mb-2 inline-block"
                  key={index}
                  onClick={() => handleClick(city.name, city._id)}
                >
                  {city.name} <span>{city.state_code}</span>
                </button>
              ))}
            </>
          ) : (
            <div className="text-gray-500 mb-2">No Nearby Cities</div>
          )}
        </div>

        <div className="col-span-1">
          
          <h5 className="font-semibold mb-4">For Chefs</h5>
          <Link href={"https://chef.getchefjoy.com/signup-as-chef"}>
            <a target={"_blank"}>
            <div className="text-gray-500 mb-2">Register</div>
            </a>
          </Link> 

          <Link href={"https://chef.getchefjoy.com/login-as-chef"}>
            <a target={"_blank"} >
            <div className="text-gray-500 mb-2"> Login</div>
            </a>
          </Link>          
          <Link href={"/faq"}>
            <a><div className="text-gray-500 mb-2">Faqs</div></a>
          </Link> 
          {/* <div className="text-gray-500">Support</div> */}
        </div>

        <div className="col-span-1">
          <h5 className="font-semibold mb-4">For You</h5>
     <Link href="/privacy"><a><div className="text-gray-500 mb-2">Privacy</div></a></Link>  
     <Link href="/terms"><a><div className="text-gray-500 mb-2">Terms</div></a></Link>  
          
          {/* <div className="text-gray-500 mb-2">Security</div> */}
          {/* <div className="text-gray-500">Sitemap</div> */}
        </div>
      </section>

      <section className="border-t flex justify-center pt-5 text-gray-500">
        <small className="text-center" style={{ fontSize: 10 }}>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2021 &copy; ChefJoy Pvt Ltd All
          rights reserved.
        </small>
      </section>
    </footer>
  );
}

export default Footer;
